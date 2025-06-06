import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { UserList } from '../../components/admin/UserList';
import { PermissionGroupList } from '../../components/admin/PermissionGroupList';
import { PermissionHistory } from '../../components/admin/PermissionHistory';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="p-4">
        <p className="text-red-600">Accès non autorisé</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Administration</h1>
        
        <div className="mt-8 space-y-8">
          <UserList />
          <PermissionGroupList />
          <PermissionHistory />
        </div>
      </div>
    </div>
  );
}