export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
  duration?: number
}

export function useToast() {
  const notifications = ref<ToastNotification[]>([])

  function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  function addToast(toast: Omit<ToastNotification, 'id'>) {
    const id = generateId()
    const notification: ToastNotification = {
      id,
      ...toast,
    }

    notifications.value.push(notification)

    // Auto-remove after duration
    const duration = toast.duration ?? 3000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  function removeToast(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearAll() {
    notifications.value = []
  }

  // Convenience methods
  function success(title: string, message?: string, duration?: number) {
    return addToast({ type: 'success', title, message, duration })
  }

  function error(title: string, message?: string, duration?: number) {
    return addToast({ type: 'error', title, message, duration })
  }

  function info(title: string, message?: string, duration?: number) {
    return addToast({ type: 'info', title, message, duration })
  }

  return {
    notifications: readonly(notifications),
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    info,
  }
}
