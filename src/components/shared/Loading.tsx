import { Card, CardContent } from '@/components/ui/card';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <LoadingSpinner />
        <p className="text-center text-sm text-gray-500 mt-2">Loading...</p>
      </CardContent>
    </Card>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
}
