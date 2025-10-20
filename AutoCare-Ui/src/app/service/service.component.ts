import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgClass} from "@angular/common";

interface Service {
  id: number;
  name: string;
  type: string;
  price: number;
  securityLabel: 'public' | 'confidential' | 'restricted';
  active: boolean;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  imports: [
    FormsModule,
    DecimalPipe,
    NgClass
  ],
  standalone: true
})
export class ServiceComponent {
  services: Service[] = [
    {id: 1, name: 'Thay nhớt động cơ', type: 'Bảo dưỡng', price: 250000, securityLabel: 'public', active: true},
    {id: 2, name: 'Kiểm tra phanh', type: 'Kiểm tra', price: 400000, securityLabel: 'confidential', active: true},
    {id: 3, name: 'Rửa xe cao cấp', type: 'Dọn dẹp', price: 150000, securityLabel: 'public', active: false},
  ];

  filteredServices: Service[] = [...this.services];
  searchTerm = '';

  showForm = false;
  editMode = false;
  form: Partial<Service> = {};

  filterServices(): void {
    const q = this.searchTerm.toLowerCase();
    this.filteredServices = this.services.filter(
      s => s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q)
    );
  }

  openCreateForm(): void {
    this.form = {securityLabel: 'public', active: true};
    this.editMode = false;
    this.showForm = true;
  }

  editService(s: Service): void {
    this.form = {...s};
    this.editMode = true;
    this.showForm = true;
  }

  deleteService(s: Service): void {
    if (confirm(`Xóa dịch vụ "${s.name}"?`)) {
      this.services = this.services.filter(x => x.id !== s.id);
      this.filterServices();
    }
  }

  saveService(): void {
    if (!this.form.name || !this.form.type || !this.form.price) return;

    if (this.editMode && this.form.id) {
      const idx = this.services.findIndex(x => x.id === this.form.id);
      this.services[idx] = this.form as Service;
    } else {
      const newId = Math.max(...this.services.map(x => x.id)) + 1;
      this.services.push({...(this.form as Service), id: newId});
    }

    this.filterServices();
    this.closeForm();
  }

  closeForm(): void {
    this.showForm = false;
  }
}
