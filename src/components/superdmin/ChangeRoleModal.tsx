"use client";

import { useState } from "react";
import { User, UserRole } from "@/types/user";
import { Shield, X, Check } from "lucide-react";

interface Props {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function AssignRoleModal({ user, onClose, onSave }: Props) {
  const [role, setRole] = useState<UserRole>(user.role);

  const roles: { value: UserRole; label: string; description: string; color: string }[] = [
    { value: "Admin", label: "Admin", description: "Full system access and user management", color: "purple" },
    { value: "Pharmacist", label: "Pharmacist", description: "Prescriptions, inventory, and customer service", color: "blue" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Change User Role</h2>
                <p className="text-indigo-100 text-sm">Assign role for {user.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                role === r.value
                  ? `border-${r.color}-500 bg-${r.color}-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${
                      role === r.value ? `text-${r.color}-700` : 'text-gray-900'
                    }`}>
                      {r.label}
                    </span>
                    {role === r.value && (
                      <div className={`bg-${r.color}-500 text-white p-0.5 rounded-full`}>
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{r.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...user, role });
              onClose();
            }}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
