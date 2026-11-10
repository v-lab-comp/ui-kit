import { defineSkin } from '@/theme/skin'
import { corporateSkin } from '../corporate'
// CSS скина собирается отдельно в dist/skins/pixel.css; приложение подключает его само, ПОСЛЕ corporate:
// import '@v-lab/ui-kit/skins/corporate.css'; import '@v-lab/ui-kit/skins/pixel.css'.
import './index.css'

/**
 * Скин pixel — 8-битный облик кита поверх corporate: рамки со ступенчатыми углами, жёсткие тени,
 * дизеринг, пиксельные шрифты. Раскладку берёт у corporate (`extends`), сам меняет только вид.
 * На `<html>` ставится цепочка `data-vl-skin="corporate pixel"`.
 */
export const pixelSkin = defineSkin({
  name: 'pixel',
  schemes: ['light', 'dark'],
  extends: corporateSkin,
})
