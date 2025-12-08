import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../toast/toast.service";
import {switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ConfirmService} from "../modal/confirm.service";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address: string;
  active: boolean;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss', '../../styles/common-table.scss']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers = [...this.customers];
  searchTerm = '';

  // modal form
  showForm = false;
  editMode = false;
  form: Partial<Customer> = {};
  editing?: Customer;

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

  editCustomer(c: Customer) {
    this.form = {...c};
    this.editing = c;
    this.editMode = true;
    this.showForm = true;
  }

  loadCustomers(): Observable<Customer[]> {
    return this.http.get<any>('api/customers')
      .pipe(tap((res: any) => {
        this.customers = res.data;
        this.filteredCustomers = [...this.customers];
      }));
  }

  saveCustomer() {
    const formValue = this.form as Customer;
    const isEdit = this.editMode && this.editing;
    const param = isEdit
      ? {...formValue, id: this.editing?.id}
      : formValue;

    this.http.post('api/customers', param)
      .pipe(
        tap(() => {
          const message = isEdit
            ? `Cập nhật khách hàng ${formValue.name} thành công!`
            : 'Thêm khách hàng thành công!';
          if (isEdit) {
            this.toast.show(message, 'success');
          } else {
            this.toast.show(message, 'success');
          }
        }),
        switchMap(() => this.loadCustomers())
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


  deleteCustomer(c: Customer) {
    this.confirm.open({
      title: 'Xác nhận xoá khách hàng',
      message: `Bạn có chắc chắn muốn xoá khách hàng "${c.name}" không?`,
      confirmText: 'Xoá',
      cancelText: 'Huỷ'
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.http.delete(`api/customers/${c.id}`)
        .pipe(switchMap(() => this.loadCustomers()))
        .subscribe({
          next: () => {
            this.toast.success('Xoá khách hàng thành công');
          },
          error: () => {
            this.toast.error('Xoá không thành công, vui lòng thử lại.');
          }
        });
    });
  }

  closeForm() {
    this.showForm = false;
  }

  filterCustomers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.phone.includes(term) ||
      c.address.toLowerCase().includes(term)
    );
  }

  ngOnInit(): void {
    this.loadCustomers().subscribe();
  }
}
