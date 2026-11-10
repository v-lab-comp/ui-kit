import { forwardRef } from 'react'
import clsx from 'clsx'
import { Avatar } from '@/components/Avatar'
import { contractAttrs, contractPart } from '@/theme/contract'
import { avatarCardContract } from '@/theme/contracts/avatar-card'
import type { AvatarCardProps } from './AvatarCard.types'

export const AvatarCard = forwardRef<HTMLDivElement, AvatarCardProps>(function AvatarCard(
  { src, alt, text, icon, color, title, subtitle, rightSlot, avatarSize = 64, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(avatarCardContract.className, className)}
      {...contractAttrs(avatarCardContract, {
        'avatar-size': String(avatarSize) as `${typeof avatarSize}`,
      })}
      {...props}
    >
      <Avatar
        size={avatarSize}
        src={src}
        // По умолчанию аватар декоративный: имя уже есть в видимом title рядом
        alt={alt ?? ''}
        text={text}
        icon={icon}
        color={color}
      />
      <div className={contractPart(avatarCardContract, 'content')}>
        {title && <span className={contractPart(avatarCardContract, 'title')}>{title}</span>}
        {subtitle && (
          <span className={contractPart(avatarCardContract, 'subtitle')}>{subtitle}</span>
        )}
      </div>
      {rightSlot && <div className={contractPart(avatarCardContract, 'right')}>{rightSlot}</div>}
    </div>
  )
})

AvatarCard.displayName = 'AvatarCard'
