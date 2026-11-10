import type { SidebarUserProfileCardProps } from '../UserProfileCard/UserProfileCard.types'

export interface SidebarFooterProps extends SidebarUserProfileCardProps {
  /** Разделитель сверху (линия по макету Figma) */
  divider?: boolean
}
