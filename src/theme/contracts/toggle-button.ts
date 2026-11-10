import { defineContract } from '../contract'
import { buttonContract } from './button'

/** Нажатое состояние — `data-state="on" | "off"` (рендерится всегда). */
export const toggleButtonContract = defineContract({
  name: 'toggle-button',
  attributes: {
    size: buttonContract.attributes.size,
    shape: buttonContract.attributes.shape,
  },
})
