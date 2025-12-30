"use client"

import * as React from "react"
import { ToastProps } from "./toast"

type ToastInput = Omit<ToastProps, "id" | "onClose">

interface ToastContextType {
  toasts: ToastProps[]
  toast: (props: ToastInput) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ duration = 5000, ...props }: ToastInput) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: ToastProps = { id, duration, ...props }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }

  return context
}
