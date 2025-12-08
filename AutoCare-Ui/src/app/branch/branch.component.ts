import {Component, OnInit} from '@angular/core';
import {Branch, Employee} from "../employee/Employee";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast/toast.service";
import {ConfirmService} from "../modal/confirm.service";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss', '../../styles/common-table.scss']
})
export class BranchComponent implements OnInit {
  data: Branch[] = [];
  filterData: Branch[] = [];
  searchTerm = '';

  // modal form
  showForm = false;
  editMode = false;
  form: Partial<Branch> = {};
  editing?: Branch;

  constructor(
    protected readonly http: HttpClient,
    protected readonly toast: ToastService,
    protected readonly confirm: ConfirmService,
  ) {
  }

  openCreateForm() {
    this.form = {};
    this.editMode = false;
    this.showForm = true;
  }

  edit(c: Branch) {
    this.form = {...c};
    this.editing = c;
    this.editMode = true;
    this.showForm = true;
  }

  loadBranch(): Observable<Branch[]> {
    return this.http.get<any>('api/branches')
      .pipe(tap((res: any) => {
        this.data = res.data;
        this.filterData = [...this.data];
      }));
  }

  saveBranch() {
    const formValue = this.form as Branch;
    const isEdit = this.editMode && this.editing;
    const param = isEdit
      ? {...formValue, id: this.editing?.id, name: formValue.branchName}
      : {...formValue, name: formValue.branchName};

    this.http.post('api/branches', param)
      .pipe(
        tap(() => {
          const message = isEdit
            ? `Cập nhật chi nhánh ${formValue.branchName} thành công!`
            : 'Thêm chi nhánh thành công!';
          if (isEdit) {
            this.toast.show(message, 'success');
          } else {
            this.toast.show(message, 'success');
          }
        }),
        switchMap(() => this.loadBranch())
      )
      .subscribe({
        next: () => {
          this.showForm = false;
        },
        error: () => {
          this.toast.show('Thao tác thất bại! Vui lòng thử lại.', 'error');
        }
      });
  }


  deleteBranch(c: Branch) {
    this.confirm.open({
      title: 'Xác nhận xoá chi nhánh',
      message: `Bạn có chắc chắn muốn xoá chi nhánh "${c.branchName}" không?`,
      confirmText: 'Xoá',
      cancelText: 'Huỷ'
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.http.delete(`api/branches/${c.id}`)
        .pipe(switchMap(() => this.loadBranch()))
        .subscribe({
          next: () => {
            this.toast.success('Xoá chi nhánh thành công');
          },
          error: () => {
            this.toast.error('Xoá không thành công, vui lòng thử lại.');
          }
        });
    });
  }

  closeForm(): void {
    this.showForm = false;
  }

  filter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filterData = this.data.filter(c =>
      c.branchName?.toLowerCase().includes(term) ||
      c.address?.toLowerCase().includes(term)
    );
  }

  ngOnInit(): void {
    this.loadBranch().subscribe();
  }
}
