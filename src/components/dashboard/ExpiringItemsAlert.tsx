import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface ExpiringItem {
  name: string;
  batch: string;
  expiry: string;
  days: number;
}

interface ExpiringItemsAlertProps {
  items: ExpiringItem[];
  totalCount: number;
  onViewAll: () => void;
}

export function ExpiringItemsAlert({ items, totalCount, onViewAll }: ExpiringItemsAlertProps) {
  return (
    <Card className="border-orange-200 dark:border-orange-800 hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-600 text-base sm:text-lg">
          <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
          Expiring Soon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="text-sm">
                <div>{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.batch}</div>
              </div>
              <Badge variant="outline" className="text-orange-600">
                {item.days} days
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
