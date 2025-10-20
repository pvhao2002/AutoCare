import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import QRCode from 'qrcode';

interface Customer {
  id: number;
  name: string;
  phone: string;
  branch: string;
  securityLabel: string;
  active: boolean;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  customers: Customer[] = [
    {id: 1, name: 'Nguyễn Văn A', phone: '0905123456', branch: 'HCM', securityLabel: 'public', active: true},
    {id: 2, name: 'Trần Thị B', phone: '0912345678', branch: 'HN', securityLabel: 'confidential', active: true},
    {id: 3, name: 'Lê Hoàng C', phone: '0938765432', branch: 'HCM', securityLabel: 'restricted', active: false}
  ];
  filteredCustomers = [...this.customers];
  searchTerm = '';

  // modal form
  showForm = false;
  editMode = false;
  form: Partial<Customer> = {};
  editing?: Customer;

  // modal QR
  showQR = false;
  qrValue = '';
  qrImageData = '';

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

  saveCustomer() {
    if (this.editMode && this.editing) {
      Object.assign(this.editing, this.form);
    } else {
      const newCustomer: Customer = {
        ...(this.form as Customer),
        id: this.customers.length + 1,
      };
      this.customers.push(newCustomer);
    }
    this.filteredCustomers = [...this.customers];
    this.showForm = false;
  }

  deleteCustomer(c: Customer) {
    if (confirm(`Xóa khách hàng ${c.name}?`)) {
      this.customers = this.customers.filter(x => x.id !== c.id);
      this.filteredCustomers = [...this.customers];
    }
  }

  closeForm() {
    this.showForm = false;
  }

  filterCustomers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.phone.includes(term) ||
      c.branch.toLowerCase().includes(term)
    );
  }

  async generateQR(c: Customer) {
    // Dữ liệu mã hóa
    this.qrValue = JSON.stringify({
      id: c.id,
      name: c.name,
      phone: c.phone,
      branch: c.branch,
      label: c.securityLabel
    });

    // Sinh QR (dạng dataURL)
    this.qrImageData = await QRCode.toDataURL(this.qrValue, {
      width: 240,
      margin: 2,
      color: {
        dark: '#16b2a5',
        light: '#0d1117'
      }
    });

    this.showQR = true;
  }

  closeQR() {
    this.showQR = false;
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = this.qrImageData;
    link.download = `customer_${Date.now()}.png`;
    link.click();
  }
}
