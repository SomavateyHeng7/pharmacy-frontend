"use client";

import { useState, useEffect, useMemo } from "react";
import { User } from "@/types/user";
import UserTable from "@/components/superdmin/UserTable";
import CreateUserModal from "@/components/superdmin/CreateUserModal";
import AssignRoleModal from "@/components/superdmin/ChangeRoleModal";
import RoleTable from "@/components/superdmin/RoleList";
import { Users, Shield, CheckCircle2, Search, Filter, Clock, Key, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ActivityLog {
  id: number;
  userId: number;
  userName: string;
  action: string;
  timestamp: string;
  details: string;
}

interface ExtendedUser extends User {
  status: 'active' | 'inactive';
  dateJoined: string;
  lastLogin: string;
}

// Modern toast with auto-dismiss
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-linear-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 flex items-center gap-3">
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
  const [users, setUsers] = useState<ExtendedUser[]>([
    { id: 1, username: "admin", email: "admin@test.com", role: "Admin", status: 'active', dateJoined: '2024-01-15', lastLogin: '2024-11-25 10:30' },
    { id: 2, username: "john", email: "john@test.com", role: "Pharmacist", status: 'active', dateJoined: '2024-03-20', lastLogin: '2024-11-24 14:22' },
    { id: 3, username: "sarah", email: "sarah@test.com", role: "Pharmacist", status: 'inactive', dateJoined: '2024-05-10', lastLogin: '2024-10-15 09:15' },
    { id: 4, username: "mike", email: "mike@test.com", role: "Pharmacist", status: 'active', dateJoined: '2024-06-01', lastLogin: '2024-11-25 08:45' },
  ]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: 1, userId: 1, userName: "admin", action: "User Created", timestamp: "2024-11-25 10:30", details: "Created new user 'john'" },
    { id: 2, userId: 2, userName: "john", action: "Login", timestamp: "2024-11-24 14:22", details: "Successful login from 192.168.1.10" },
    { id: 3, userId: 1, userName: "admin", action: "Role Changed", timestamp: "2024-11-23 16:45", details: "Changed role for user 'sarah' to Staff" },
    { id: 4, userId: 3, userName: "sarah", action: "Password Reset", timestamp: "2024-11-22 11:20", details: "Password reset requested and completed" },
    { id: 5, userId: 1, userName: "admin", action: "User Deactivated", timestamp: "2024-11-21 09:00", details: "Deactivated user account for 'sarah'" },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState<ExtendedUser | null>(null);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchQuery === '' || 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    setToast("User deleted successfully.");
    setShowDeleteConfirm(null);
    
    // Add activity log
    setActivityLogs(prev => [{
      id: Date.now(),
      userId: 1,
      userName: "admin",
      action: "User Deleted",
      timestamp: new Date().toLocaleString(),
      details: `Deleted user with ID ${id}`
    }, ...prev]);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } 
        : u
    ));
    const user = users.find(u => u.id === userId);
    setToast(`User ${user?.status === 'active' ? 'deactivated' : 'activated'} successfully.`);
    
    // Add activity log
    setActivityLogs(prev => [{
      id: Date.now(),
      userId: 1,
      userName: "admin",
      action: user?.status === 'active' ? 'User Deactivated' : 'User Activated',
      timestamp: new Date().toLocaleString(),
      details: `${user?.status === 'active' ? 'Deactivated' : 'Activated'} user '${user?.username}'`
    }, ...prev]);
  };

  const handlePasswordReset = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setToast(`Password reset link sent to ${user?.email}`);
    setShowPasswordReset(null);
    
    // Add activity log
    setActivityLogs(prev => [{
      id: Date.now(),
      userId: 1,
      userName: "admin",
      action: "Password Reset",
      timestamp: new Date().toLocaleString(),
      details: `Initiated password reset for user '${user?.username}'`
    }, ...prev]);
  };

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header with Stats */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage users, roles, and access permissions
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowActivityLogs(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Clock size={20} />
              Activity Logs
            </Button>
            <Button
              onClick={() => setShowCreate(true)}
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center gap-2 font-medium"
              aria-label="Create a new user"
            >
              <Users size={20} />
              Create User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{users.length}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {users.filter(u => u.role === 'Admin').length}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl">
                <Shield className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pharmacists</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {users.filter(u => u.role === 'Pharmacist').length}
                </p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-xl">
                <Users className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="space-y-2">
              <Label htmlFor="roleFilter">Role</Label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="statusFilter">Status</Label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active Filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {roleFilter !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Role: {roleFilter}
                  <button onClick={() => setRoleFilter('all')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {statusFilter !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter('all')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-16 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-400 dark:text-gray-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No users found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Get started by creating your first user'}
              </p>
              {!searchQuery && roleFilter === 'all' && statusFilter === 'all' && (
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Create User
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'} 
                          className={user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">{user.dateJoined}</td>
                      <td className="px-6 py-4 text-sm">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            Change Role
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowPasswordReset(user)}
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={user.status === 'active' ? 'secondary' : 'default'}
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setShowDeleteConfirm(user.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Roles Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden p-6">
          <RoleTable />
        </div>
      </div>

      {/* Create User Modal */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreate={(user) => {
            setUsers([...users, { ...user, status: 'active', dateJoined: new Date().toISOString().split('T')[0], lastLogin: 'Never' } as ExtendedUser]);
            setShowCreate(false);
            setToast("User created successfully.");
            
            // Add activity log
            setActivityLogs(prev => [{
              id: Date.now(),
              userId: 1,
              userName: "admin",
              action: "User Created",
              timestamp: new Date().toLocaleString(),
              details: `Created new user '${user.username}'`
            }, ...prev]);
          }}
        />
      )}

      {/* Assign Role Modal */}
      {selectedUser && (
        <AssignRoleModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(updated) => {
            setUsers(users.map(u => u.id === updated.id ? { ...u, ...updated } : u));
            setSelectedUser(null);
            setToast("Role updated successfully.");
            
            // Add activity log
            setActivityLogs(prev => [{
              id: Date.now(),
              userId: 1,
              userName: "admin",
              action: "Role Changed",
              timestamp: new Date().toLocaleString(),
              details: `Changed role for user '${updated.username}' to ${updated.role}`
            }, ...prev]);
          }}
        />
      )}

      {/* Password Reset Modal */}
      {showPasswordReset && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">Reset Password</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Send password reset link to <strong>{showPasswordReset.email}</strong>?
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  The user will receive an email with instructions to reset their password.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition"
                onClick={() => setShowPasswordReset(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium transition shadow-lg"
                onClick={() => handlePasswordReset(showPasswordReset.id)}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Logs Modal */}
      {showActivityLogs && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-in fade-in p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Activity Logs</h2>
                  <p className="text-sm text-muted-foreground">Recent system activities and user actions</p>
                </div>
              </div>
              <button
                onClick={() => setShowActivityLogs(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh] p-6">
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{log.action}</p>
                          <p className="text-sm text-muted-foreground">by {log.userName}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {log.timestamp}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                      {log.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
              <Button
                onClick={() => setShowActivityLogs(false)}
                className="w-full"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in">
            <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">Delete User</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition"
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