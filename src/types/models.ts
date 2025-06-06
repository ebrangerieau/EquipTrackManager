export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  model: string;
  status: 'active' | 'maintenance' | 'retired';
  purchaseDate: Date;
  warrantyEnd: Date;
  nextMaintenance?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  name: string;
  provider: string;
  type: 'maintenance' | 'service' | 'location';
  startDate: Date;
  endDate: Date;
  cost: number;
  status: 'active' | 'pending' | 'terminated';
  equipmentIds: string[];
  renewalNotice: number; // days before expiry
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  equipmentId: string;
  plannedDate: Date;
  completedDate?: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  estimatedCost?: number;
  actualCost?: number;
  technician?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  date: Date;
  read: boolean;
  link?: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  permissions: UserPermissions;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionChange {
  id: string;
  userId: string;
  adminId: string;
  oldPermissions: UserPermissions;
  newPermissions: UserPermissions;
  timestamp: Date;
  reason?: string;
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
  users: {
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