import { forwardRef } from 'react'
import clsx from 'clsx'
import { RiArrowRightSLine } from '@remixicon/react'
import { Avatar } from '@/components/Avatar'
import { AvatarCard } from '@/components/AvatarCard'
import { useSidebar } from '../SidebarContext'
import { contractAttrs } from '@/theme/contract'
import { sidebarCardContract } from '@/theme/contracts/sidebar-card'
import type { SidebarUserProfileCardProps } from './UserProfileCard.types'

export type { SidebarUserProfileCardProps } from './UserProfileCard.types'

/** Карточка профиля пользователя в сайдбаре. Collapsed — только Avatar, открытый — AvatarCard. */
export const SidebarUserProfileCard = forwardRef<HTMLButtonElement, SidebarUserProfileCardProps>(
  (
    {
      src,
      alt,
      text,
      icon,
      color,
      title,
      description,
      rightSlot,
      collapsed: propCollapsed,
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    const { collapsed } = useSidebar(propCollapsed)

    if (collapsed) {
      // Видна только аватарка — её alt (или имя) и есть имя кнопки
      const avatarAlt = alt ?? (typeof title === 'string' ? title : '')
      return (
        <button
          ref={ref}
          type="button"
          className={clsx(sidebarCardContract.className, className)}
          {...contractAttrs(sidebarCardContract, { collapsed: true, unbordered: !bordered })}
          {...props}
        >
          <Avatar size={40} src={src} alt={avatarAlt} text={text} icon={icon} color={color} />
        </button>
      )
    }

    // Имя показано текстом рядом — alt аватарки пустой, чтобы не повторять его (явный alt сохраняется)
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(sidebarCardContract.className, className)}
        {...contractAttrs(sidebarCardContract, { unbordered: !bordered })}
        {...props}
      >
        <AvatarCard
          src={src}
          alt={alt ?? ''}
          text={text}
          icon={icon}
          color={color}
          title={title}
          subtitle={description}
          avatarSize={40}
          rightSlot={rightSlot ?? <RiArrowRightSLine />}
        />
      </button>
    )
  }
)

SidebarUserProfileCard.displayName = 'SidebarUserProfileCard'
