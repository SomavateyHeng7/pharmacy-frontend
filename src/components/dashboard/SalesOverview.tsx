import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesData {
  totalRevenue: number;
  dailyTarget: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  growthRate: number;
}

interface SalesOverviewProps {
  data: SalesData;
}

export function SalesOverview({ data }: SalesOverviewProps) {
  const progressPercentage = Math.min((data.totalRevenue / data.dailyTarget) * 100, 100);
  const targetExceeded = data.totalRevenue > data.dailyTarget;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Today's Target</span>
            <span className="font-medium">${data.dailyTarget.toLocaleString()}</span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            {Math.round(progressPercentage)}% of daily target achieved
            {targetExceeded && (
              <span className="text-green-600 font-medium"> (Target exceeded!)</span>
            )}
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>This Week</span>
              <span className="font-medium">${data.weeklyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>This Month</span>
              <span className="font-medium">${data.monthlyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Growth Rate</span>
              <span className={`font-medium ${data.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.growthRate >= 0 ? '+' : ''}{data.growthRate}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
