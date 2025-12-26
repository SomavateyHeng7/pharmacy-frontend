import { Shield, Key, Edit3, CheckCircle2 } from "lucide-react";

export default function RoleTable() {
  const roles = [
    { 
      name: "Admin", 
      permissions: "Full system access, user management, all operations",
      color: "purple",
      icon: Shield,
      users: 1
    },
    { 
      name: "Pharmacist", 
      permissions: "Prescriptions, inventory, customer service",
      color: "blue",
      icon: CheckCircle2,
      users: 1
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      green: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-indigo-600" size={24} />
            Role Permissions
          </h2>
          <p className="text-sm text-gray-600 mt-1">Configure access levels for different user roles</p>
        </div>
      </div>

      <div className="grid gap-4">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <div 
              key={role.name} 
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${getColorClasses(role.color).replace('text-', 'bg-').replace('100', '200')}`}>
                    <Icon size={24} className={getColorClasses(role.color).split(' ')[1]} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{role.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                        {role.users} {role.users === 1 ? 'user' : 'users'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Key size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{role.permissions}</p>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                  <Edit3 size={14} />
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
