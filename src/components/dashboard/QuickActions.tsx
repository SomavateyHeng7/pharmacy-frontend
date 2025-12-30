import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Search, Package } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: typeof Plus;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const defaultActions = [
  { id: 'new-sale', label: 'New Sale', icon: Plus },
  { id: 'find-medicine', label: 'Find Medicine', icon: Search },
  { id: 'receive-stock', label: 'Receive Stock', icon: Package },
];

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button 
                key={action.id}
                className="w-full justify-start" 
                variant="outline"
                onClick={action.onClick}
              >
                <Icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
