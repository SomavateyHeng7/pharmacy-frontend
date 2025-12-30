import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">{message}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function ErrorPage({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <ErrorMessage title={title} message={message} onRetry={onRetry} />
      </div>
    </div>
  );
}
