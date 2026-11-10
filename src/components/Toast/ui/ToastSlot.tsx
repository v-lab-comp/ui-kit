import { Toast } from './Toast'
import type { ToastAddOptions } from '../ToastContext'
import type { ToastPosition } from '../Toast.types'
import type { ToastQueueItem } from '../hooks/useToastQueue'

export interface ToastSlotProps {
  toast: ToastQueueItem<ToastAddOptions>
  position: ToastPosition
  slotStyle: React.CSSProperties
  onRegisterSlot: (id: number, el: HTMLDivElement | null) => void
  onRegisterSwipe: (id: number, el: HTMLDivElement | null) => void
  onTouchStart: (id: number, e: React.TouchEvent) => void
  onTouchMove: (id: number, e: React.TouchEvent) => void
  onTouchEnd: (id: number) => void
  onDismiss: (id: number) => void
}

export function ToastSlot({
  toast,
  position,
  slotStyle,
  onRegisterSlot,
  onRegisterSwipe,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onDismiss,
}: ToastSlotProps) {
  const { id, mounted, exiting, title, description, variant, size, actions, icon } = toast

  return (
    <div ref={(el) => onRegisterSlot(id, el)} style={slotStyle}>
      <div
        ref={(el) => onRegisterSwipe(id, el)}
        onTouchStart={(e) => onTouchStart(id, e)}
        onTouchMove={(e) => onTouchMove(id, e)}
        onTouchEnd={() => onTouchEnd(id)}
      >
        <Toast
          color={toast.color}
          variant={variant}
          size={size}
          title={title}
          description={description}
          actions={actions}
          icon={icon}
          onClose={() => onDismiss(id)}
          data-mounted={mounted ? undefined : 'false'}
          data-exiting={exiting ? 'true' : undefined}
          data-position={position}
        />
      </div>
    </div>
  )
}

ToastSlot.displayName = 'ToastSlot'
