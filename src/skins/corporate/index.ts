import { defineSkin } from '@/theme/skin'
// CSS скина собирается отдельно в dist/skins/corporate.css; приложение подключает его само: import '@v-lab/ui-kit/skins/corporate.css'.
import './index.css'

/** Скин corporate — текущий внешний вид кита: токены, палитры и стили всех компонентов. */
export const corporateSkin = defineSkin({
  name: 'corporate',
  schemes: ['light', 'dark'],
})
