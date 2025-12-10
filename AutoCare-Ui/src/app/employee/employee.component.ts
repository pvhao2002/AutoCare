import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast/toast.service";
import {ConfirmService} from "../modal/confirm.service";
import {forkJoin, Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {Employee, EmployeeUser} from "./Employee";
import {CommonFilterService} from "../common/common-filter.service";
import {Branch} from "../common/user.service";
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['../../styles/common-table.scss', './employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  data: Employee[] = [];
  filterData: Employee[] = [];
  searchTerm = '';
  branches: Branch[] = [];

  // modal form
  showForm = false;
  editMode = false;
  form: Partial<Employee> & Partial<EmployeeUser> & { branchId?: number; } = {};
  editing?: Employee;

  constructor(
    protected readonly http: HttpClient,
    protected readonly toast: ToastService,
    protected readonly confirm: ConfirmService,
    protected readonly filterService: CommonFilterService,
  ) {
  }

  openCreateForm() {
    this.form = {};
    this.editMode = false;
    this.showForm = true;
  }

  edit(c: Employee) {
    this.form = {
      ...c,
      branchId: c.branch.id,
      username: c.user.username,
      fullName: c.user.fullName,
      email: c.user.email,
      role: c.user.role,
    };
    this.editing = c;
    this.editMode = true;
    this.showForm = true;
  }

  loadEmployee(): Observable<Employee[]> {
    return this.http.get<any>('api/employee')
      .pipe(tap((res: any) => {
        this.data = res.data;
        this.filterData = [...this.data];
      }));
  }

  loadBranch(): Observable<Branch[]> {
    return this.http.get<any>('api/branches')
      .pipe(tap((res: any) => {
        this.branches = res.data;
      }));
  }

  saveEmployee() {
    const formValue = this.form as Employee;
    const isEdit = this.editMode && this.editing;
    const param = isEdit
      ? {...formValue, id: this.editing?.id}
      : formValue;

    this.http.post('api/employee', param)
      .pipe(
        tap(() => {
          const message = isEdit
            ? `Cập nhật nhân viên ${formValue.user.fullName} thành công!`
            : 'Thêm nhân viên thành công!';
          if (isEdit) {
            this.toast.show(message, 'success');
          } else {
            this.toast.show(message, 'success');
          }
        }),
        switchMap(() => this.loadEmployee())
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


  deleteEmployee(c: Employee) {
    this.confirm.open({
      title: 'Xác nhận xoá nhân viên',
      message: `Bạn có chắc chắn muốn xoá nhân viên "${c.user.fullName}" không?`,
      confirmText: 'Xoá',
      cancelText: 'Huỷ'
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.http.delete(`api/employee/${c.id}`)
        .pipe(switchMap(() => this.loadEmployee()))
        .subscribe({
          next: () => {
            this.toast.success('Xoá nhân viên thành công');
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
    this.filterData = this.filterService.filter(this.data, term, ['user.fullName', 'user.username', 'position', 'branch.branchName']);
  }

  ngOnInit(): void {
    forkJoin([
      this.loadEmployee(),
      this.loadBranch()
    ]).subscribe();
  }
}
