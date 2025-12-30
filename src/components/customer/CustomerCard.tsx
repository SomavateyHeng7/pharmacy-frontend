import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit,
  DollarSign,
  Activity,
} from "lucide-react";

interface CustomerCardProps {
  customer: {
    id: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      address: string;
    };
    totalSpent: number;
    visitCount: number;
    lastVisit: string;
    status: string;
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export function CustomerCard({ customer, onView, onEdit }: CustomerCardProps) {
  const { id, personalInfo, totalSpent, visitCount, lastVisit, status } = customer;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h3>
              <p className="text-sm text-gray-500">{id}</p>
            </div>
          </div>
          <Badge
            className={
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {status}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {personalInfo.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {personalInfo.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Last visit: {lastVisit}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
          <div>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <DollarSign className="h-3 w-3 mr-1" />
              Total Spent
            </div>
            <p className="text-lg font-semibold text-gray-900">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
          <div>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <Activity className="h-3 w-3 mr-1" />
              Visits
            </div>
            <p className="text-lg font-semibold text-gray-900">{visitCount}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView(id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
