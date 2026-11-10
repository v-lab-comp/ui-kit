import { IconsGalleryPage } from '@/docs/IconsGalleryPage'
import { FlagsGalleryPage } from '@/docs/FlagsGalleryPage'

/** VitePress: та же галерея, что Storybook Design System → Icons */
export function IconsGalleryEmbed() {
  return <IconsGalleryPage embedded />
}

/** VitePress: та же галерея, что Storybook Design System → Country Flags */
export function FlagsGalleryEmbed() {
  return <FlagsGalleryPage embedded />
}
