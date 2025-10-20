export interface Service {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  status: 'active' | 'inactive';
}
