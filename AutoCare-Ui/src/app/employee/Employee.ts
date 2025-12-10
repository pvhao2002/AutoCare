// employee.model.ts
export interface Employee {
  id: number;
  branch: EmployeeBranch;
  age: number;
  address: string;
  phone: string;
  gender: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  user: EmployeeUser;
}

// ✅ Map đúng RawEmployeeBranch
export interface EmployeeBranch {
  id: number;
  branchName: string;
  branchCode: string;
}

// ✅ Map đúng RawEmployeeUser
export interface EmployeeUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string; // hoặc enum RoleName nếu bạn có
  password?: string; // optional nếu không luôn có
}
