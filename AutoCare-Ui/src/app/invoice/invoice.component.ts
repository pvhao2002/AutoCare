import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

interface Invoice {
  id: number;
  customer: string;
  service: string;
  date: string;
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  invoices: Invoice[] = [
    { id: 1, customer: 'Nguyễn Văn A', service: 'Thay dầu máy', date: '2025-10-20', total: 250000, status: 'paid' },
    { id: 2, customer: 'Trần Thị B', service: 'Rửa xe + kiểm tra phanh', date: '2025-10-18', total: 180000, status: 'pending' },
    { id: 3, customer: 'Lê Hoàng C', service: 'Bảo dưỡng định kỳ', date: '2025-10-15', total: 480000, status: 'cancelled' }
  ];
  filteredInvoices = [...this.invoices];
  searchTerm = '';

  showForm = false;
  editMode = false;
  form: Partial<Invoice> = {};
  editing?: Invoice;

  showQR = false;
  qrValue = '';
  qrImageData = '';

  filterInvoices() {
    const term = this.searchTerm.toLowerCase();
    this.filteredInvoices = this.invoices.filter(i =>
      i.customer.toLowerCase().includes(term) ||
      i.service.toLowerCase().includes(term) ||
      i.status.toLowerCase().includes(term)
    );
  }

  openCreateForm() {
    this.form = {};
    this.editMode = false;
    this.showForm = true;
  }

  editInvoice(i: Invoice) {
    this.form = { ...i };
    this.editing = i;
    this.editMode = true;
    this.showForm = true;
  }

  saveInvoice() {
    if (this.editMode && this.editing) {
      Object.assign(this.editing, this.form);
    } else {
      const newInvoice: Invoice = {
        ...(this.form as Invoice),
        id: this.invoices.length + 1,
        date: new Date().toISOString().split('T')[0],
      };
      this.invoices.push(newInvoice);
    }
    this.filteredInvoices = [...this.invoices];
    this.showForm = false;
  }

  deleteInvoice(i: Invoice) {
    if (confirm(`Xóa hóa đơn #${i.id}?`)) {
      this.invoices = this.invoices.filter(x => x.id !== i.id);
      this.filteredInvoices = [...this.invoices];
    }
  }

  async generateQR(i: Invoice) {
    this.qrValue = JSON.stringify(i);
    this.qrImageData = await QRCode.toDataURL(this.qrValue, {
      width: 240,
      margin: 2,
      color: { dark: '#16b2a5', light: '#0d1117' }
    });
    this.showQR = true;
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = this.qrImageData;
    link.download = `invoice_${Date.now()}.png`;
    link.click();
  }

  closeQR() { this.showQR = false; }
  closeForm() { this.showForm = false; }
}
