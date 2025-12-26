"use client";

import { useState } from "react";
import { X, UserPlus, Mail, Lock, Shield } from "lucide-react";
import { User, UserRole } from "@/types/user";

interface Props {
  onClose: () => void;
  onCreate: (user: User) => void;
}

export default function CreateUserModal({ onClose, onCreate }: Props) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Pharmacist" as UserRole,
  });

  const submit = () => {
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    onCreate({
      id: Date.now(),
      username: form.username,
      email: form.email,
      role: form.role,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <UserPlus className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create New User
                </h2>
                <p className="text-blue-100 text-sm">
                  Add a new user and assign their role
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <UserPlus size={16} className="text-gray-500" />
              Username
            </label>
            <input
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter username"
              value={form.username}
              onChange={e =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Mail size={16} className="text-gray-500" />
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="user@pharmacy.com"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Lock size={16} className="text-gray-500" />
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter secure password"
              value={form.password}
              onChange={e =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <Shield size={16} className="text-gray-500" />
              Role
            </label>
            <select
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white cursor-pointer"
              value={form.role}
              onChange={e =>
                setForm({ ...form, role: e.target.value as UserRole })
              }
            >
              <option value="Admin">Admin - Full system access</option>
              <option value="Pharmacist">Pharmacist - Prescriptions & inventory</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl border-2 border-gray-300
                       hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                       hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <UserPlus size={16} />
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
