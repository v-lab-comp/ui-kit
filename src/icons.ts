/**
 * Re-export Remix Icon из UI kit.
 * При установке v-lab-ui-kit иконки доступны так:
 *   import { RiAddLine, RiCheckFill } from '@v-lab/ui-kit/icons'
 */
export * from '@remixicon/react'

/**
 * Универсальный компонент для SVG-иконок (в т.ч. флаги).
 *   import { SvgIcon } from '@v-lab/ui-kit/icons'
 */
export { SvgIcon, type SvgIconProps } from './icons/SvgIcon'
