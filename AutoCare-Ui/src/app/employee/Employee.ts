export interface Employee {
  id: number;
  fullName: string;
  position: string;
  salary: number;
  branch: Branch;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: number;
  branchCode: string;
  branchName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
