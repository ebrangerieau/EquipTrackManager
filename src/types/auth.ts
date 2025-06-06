export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermissions {
  equipment: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  contracts: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
  };
}