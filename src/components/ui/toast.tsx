import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

const variantStyles = {
  default: {
    container: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    icon: null,
    iconColor: "",
  },
  success: {
    container: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800",
    icon: CheckCircle,
    iconColor: "text-green-600 dark:text-green-400",
  },
  error: {
    container: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800",
    icon: AlertCircle,
    iconColor: "text-red-600 dark:text-red-400",
  },
  warning: {
    container: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800",
    icon: AlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  info: {
    container: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800",
    icon: Info,
    iconColor: "text-blue-600 dark:text-blue-400",
  },
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = 'default', duration = 5000, onClose }, ref) => {
    const [progress, setProgress] = React.useState(100)
    const style = variantStyles[variant]
    const Icon = style.icon

    React.useEffect(() => {
      if (duration <= 0) return

      const interval = setInterval(() => {
        setProgress((prev) => {
          const decrement = (100 / duration) * 50
          return Math.max(0, prev - decrement)
        })
      }, 50)

      return () => clearInterval(interval)
    }, [duration])

    const progressColor = {
      default: "bg-gray-400",
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-amber-500",
      info: "bg-blue-500",
    }[variant]

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative flex w-full max-w-md flex-col overflow-hidden rounded-lg border shadow-lg transition-all",
          "animate-in slide-in-from-top-5 fade-in",
          style.container
        )}
      >
        <div className="flex items-start gap-3 p-4">
          {Icon && (
            <div className="shrink-0">
              <Icon className={cn("h-5 w-5", style.iconColor)} />
            </div>
          )}
          
          <div className="flex-1 space-y-1">
            {title && (
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {duration > 0 && (
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className={cn("h-full transition-all duration-50", progressColor)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    )
  }
)

Toast.displayName = "Toast"
