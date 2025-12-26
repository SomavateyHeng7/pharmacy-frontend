"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import UserTable from "@/components/superdmin/UserTable";
import CreateUserModal from "@/components/superdmin/CreateUserModal";
import AssignRoleModal from "@/components/superdmin/ChangeRoleModal";
import RoleTable from "@/components/superdmin/RoleList";
import { Users, Shield, CheckCircle2 } from "lucide-react";

// Modern toast with auto-dismiss
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 flex items-center gap-3">
      <CheckCircle2 size={20} />
      <span className="font-medium">{message}</span>
      <button 
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition" 
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}

export default function SuperAdminPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: "admin", email: "admin@test.com", role: "Admin" },
    { id: 2, username: "john", email: "john@test.com", role: "Pharmacist" },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    setToast("User deleted successfully.");
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header with Stats */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage users, roles, and access permissions
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center gap-2 font-medium"
            aria-label="Create a new user"
          >
            <Users size={20} />
            Create User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Roles</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Shield className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {users.filter(u => u.role === 'Admin').length}
                </p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-xl">
                <CheckCircle2 className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {users.length === 0 ? (
            <div className="p-16 text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first user</p>
              <button
                onClick={() => setShowCreate(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Create User
              </button>
            </div>
          ) : (
            <UserTable
              users={users}
              onAssignRole={setSelectedUser}
              onDelete={(id) => setShowDeleteConfirm(id)}
            />
          )}
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
          <RoleTable />
        </div>
      </div>

      {/* Create User Modal */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreate={(user) => {
            setUsers([...users, user]);
            setShowCreate(false);
            setToast("User created successfully.");
          }}
        />
      )}

      {/* Assign Role Modal */}
      {selectedUser && (
        <AssignRoleModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(updated) => {
            setUsers(users.map(u => u.id === updated.id ? updated : u));
            setSelectedUser(null);
            setToast("Role updated successfully.");
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Delete User</h2>
            <p className="text-center text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-medium transition"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium transition shadow-lg"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}