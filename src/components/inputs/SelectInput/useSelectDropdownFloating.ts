import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { formatSize } from '@/utils/formatSize'
import type { SelectVariant } from './SelectInput.types'

type PlacementProp = 'bottom' | 'top' | 'left' | 'right'

const placementMap: Record<string, Placement> = {
  bottom: 'bottom-start',
  top: 'top-start',
  left: 'left-start',
  right: 'right-start',
}

const flipMap: Record<string, Placement[]> = {
  bottom: ['top-start'],
  top: ['bottom-start'],
  left: ['right-start'],
  right: ['left-start'],
}

export function useSelectDropdownFloating(options: {
  open: boolean
  placement: PlacementProp
  /** `full` — min ширина по якорю; компактные варианты — только по контенту */
  variant: SelectVariant | undefined
  dropdownWidth?: number
}) {
  const { open, placement, variant = 'full', dropdownWidth } = options

  const floatingPlacement: Placement = placementMap[placement] ?? 'bottom-start'
  const flipFallbacks: Placement[] = flipMap[placement] ?? ['top-start']
  const isVertical = placement === 'bottom' || placement === 'top'

  const floating = useFloating({
    open,
    placement: floatingPlacement,
    middleware: [
      offset(6),
      flip({ fallbackPlacements: flipFallbacks }),
      shift({ padding: 8 }),
      sizeMiddleware({
        apply({ rects, elements }) {
          if (!isVertical) return
          if (dropdownWidth !== undefined) {
            const w = formatSize(dropdownWidth)
            if (w) {
              elements.floating.style.width = w
              elements.floating.style.minWidth = ''
              elements.floating.style.maxWidth = ''
            }
            return
          }
          if (variant === 'full') {
            elements.floating.style.minWidth = `${rects.reference.width}px`
          } else {
            elements.floating.style.minWidth = ''
          }
          elements.floating.style.width = 'max-content'
          elements.floating.style.maxWidth = 'min(100vw - 16px, 32rem)'
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const basePlacement = (floating.placement.split('-')[0] as string) || placement

  return { ...floating, basePlacement }
}
