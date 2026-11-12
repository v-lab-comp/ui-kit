import { defineSkin } from '@/theme/skin'
import { corporateSkin } from '../corporate'
// CSS скина собирается отдельно в dist/skins/arena.css; приложение подключает его само, ПОСЛЕ corporate:
// import '@v-lab/ui-kit/skins/corporate.css'; import '@v-lab/ui-kit/skins/arena.css'.
import './index.css'

/**
 * Скин arena («Арена») — тёмное премиальное стекло для молодёжных live-аукционов поверх corporate:
 * плавающие слои из стекла с бликом по кромке, лаймовый призыв к ставке, шкала редкости как цвета
 * данных, мягкое свечение. Раскладку берёт у corporate (`extends`), сам меняет только вид.
 * Фирменная схема — тёмная: приложение выбирает `colorScheme="dark"`.
 * На `<html>` ставится цепочка `data-vl-skin="corporate arena"`.
 */
export const arenaSkin = defineSkin({
  name: 'arena',
  schemes: ['light', 'dark'],
  extends: corporateSkin,
})
