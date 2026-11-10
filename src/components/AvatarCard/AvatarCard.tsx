import clsx from 'clsx'
import { Avatar } from '@/components/Avatar'
import { contractAttrs, contractPart } from '@/theme/contract'
import { avatarCardContract } from '@/theme/contracts/avatar-card'
import type { AvatarCardProps } from './AvatarCard.types'

export function AvatarCard({
  src,
  alt,
  text,
  icon,
  color,
  title,
  subtitle,
  rightSlot,
  avatarSize = 64,
  className,
  ...props
}: AvatarCardProps) {
  return (
    <div
      className={clsx(avatarCardContract.className, className)}
      {...contractAttrs(avatarCardContract, {
        'avatar-size': String(avatarSize) as `${typeof avatarSize}`,
      })}
      {...props}
    >
      <Avatar
        size={avatarSize}
        src={src}
        alt={alt ?? (typeof title === 'string' ? title : '')}
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
}

AvatarCard.displayName = 'AvatarCard'
