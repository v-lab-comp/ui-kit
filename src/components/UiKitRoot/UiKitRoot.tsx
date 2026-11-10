import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { uiKitRootContract } from '@/theme/contracts/ui-kit-root'
import type { UiKitRootProps } from './UiKitRoot.types'

/**
 * Корневая обёртка с локальным «modern CSS reset» (box-sizing, margin, типографика, медиа, формы, stacking context).
 * Оберните приложение или изолированный блок — глобальные `#root` / `body` в чистом виде не трогаем, всё под `.vl-ui-kit-root`.
 */
export function UiKitRoot({ children, className, ...rest }: UiKitRootProps) {
  return (
    <div
      className={clsx(uiKitRootContract.className, className)}
      {...contractAttrs(uiKitRootContract, {})}
      {...rest}
    >
      {children}
    </div>
  )
}

UiKitRoot.displayName = 'UiKitRoot'
