"use client"

import { Toast, ToastProps } from "./toast"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-4 sm:right-4 sm:flex-col sm:max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
