import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface LowStockItem {
  name: string;
  current: number;
  minimum: number;
  status: 'critical' | 'low';
}

interface LowStockAlertProps {
  items: LowStockItem[];
  totalCount: number;
  onViewAll: () => void;
}

export function LowStockAlert({ items, totalCount, onViewAll }: LowStockAlertProps) {
  return (
    <Card className="border-red-200 dark:border-red-800 hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="flex items-center text-red-600 text-base sm:text-lg">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          Low Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm truncate mr-2">{item.name}</span>
              <Badge 
                variant={item.status === 'critical' ? 'destructive' : 'secondary'} 
                className="flex-shrink-0"
              >
                {item.current} left
              </Badge>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={onViewAll}
        >
          View All ({totalCount})
        </Button>
      </CardContent>
    </Card>
  );
}
