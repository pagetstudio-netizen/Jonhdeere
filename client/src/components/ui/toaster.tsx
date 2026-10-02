import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} duration={variant === "destructive" ? 6000 : 2500} {...props}>
            <div className="flex min-w-0 flex-col gap-1">
              {title && <ToastTitle className="whitespace-normal">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="whitespace-normal break-words">
                  {description}
                </ToastDescription>
              )}
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
