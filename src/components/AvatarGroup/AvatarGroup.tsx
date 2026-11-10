import clsx from 'clsx'
import { Children, cloneElement, isValidElement } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Avatar } from '@/components/Avatar'
import { contractAttrs, contractPart } from '@/theme/contract'
import { avatarGroupContract } from '@/theme/contracts/avatar-group'
import type { AvatarGroupCompactSize, AvatarGroupProps } from './AvatarGroup.types'

const COMPACT_PX = { small: 24, medium: 32, big: 40 } as const

function resolveCompactPx(compactSize?: AvatarGroupCompactSize, size = 40): 24 | 32 | 40 {
  if (compactSize) return COMPACT_PX[compactSize]
  return size <= 24 ? 24 : size <= 32 ? 32 : 40
}

function getDefaultOverlap(size: number): number {
  if (size >= 72) return 20
  if (size >= 56) return 16
  if (size >= 40) return 12
  if (size >= 32) return 10
  if (size >= 24) return 8
  return 6
}

const COMPACT_VARS: Record<
  24 | 32 | 40,
  {
    overlap: number
    pl: number
    py: number
    pr: number
    gap: number
    fontSize: number
    lineHeight: number
    letterSpacing: string
  }
> = {
  24: { overlap: 6, pl: 2, py: 2, pr: 8, gap: 6, fontSize: 12, lineHeight: 16, letterSpacing: '0' },
  32: {
    overlap: 8,
    pl: 2,
    py: 2,
    pr: 14,
    gap: 8,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: '-0.084px',
  },
  40: {
    overlap: 10,
    pl: 2,
    py: 2,
    pr: 16,
    gap: 10,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: '-0.176px',
  },
}

function withGroupSize(child: ReactNode, size: number): ReactNode {
  if (!isValidElement<{ size?: number }>(child)) return child
  if (child.props.size != null) return child
  return cloneElement(child, { size })
}

export function AvatarGroup({
  children,
  mode = 'default',
  compactStyle = 'default',
  compactSize,
  size = 40,
  max = 4,
  overlap,
  overflowColor = 'neutral',
  className,
  style,
  ...props
}: AvatarGroupProps) {
  const allChildren = Children.toArray(children)
  const visibleChildren = allChildren.slice(0, Math.max(1, max))
  const overflowCount = Math.max(0, allChildren.length - visibleChildren.length)
  const overflowLabel = overflowCount > 9 ? '9+' : `+${overflowCount}`

  if (mode === 'compact') {
    const px = resolveCompactPx(compactSize, size)
    const v = COMPACT_VARS[px]
    const cssVars = {
      '--compact-overlap': `${v.overlap}px`,
      '--compact-pl': `${v.pl}px`,
      '--compact-py': `${v.py}px`,
      '--compact-pr': `${v.pr}px`,
      '--compact-gap': `${v.gap}px`,
      '--compact-font-size': `${v.fontSize}px`,
      '--compact-line-height': `${v.lineHeight}px`,
      '--compact-letter-spacing': v.letterSpacing,
    } as CSSProperties

    return (
      <div
        className={clsx(avatarGroupContract.className, className)}
        style={{ ...style, ...cssVars }}
        {...contractAttrs(avatarGroupContract, { mode, 'compact-style': compactStyle })}
        {...props}
      >
        <div className={contractPart(avatarGroupContract, 'avatars-block')}>
          {visibleChildren.map((child, i) => (
            <div
              key={isValidElement(child) ? child.key : i}
              className={contractPart(avatarGroupContract, 'compact-item')}
              style={{ zIndex: i + 1 }}
            >
              {withGroupSize(child, px)}
            </div>
          ))}
        </div>
        {overflowCount > 0 && (
          <span className={contractPart(avatarGroupContract, 'overflow-text')}>
            {overflowLabel}
          </span>
        )}
      </div>
    )
  }

  const resolvedOverlap = overlap ?? getDefaultOverlap(size)

  return (
    <div
      className={clsx(avatarGroupContract.className, className)}
      style={{ ...style, '--avatar-group-overlap': `${resolvedOverlap}px` } as CSSProperties}
      {...contractAttrs(avatarGroupContract, { mode })}
      {...props}
    >
      {visibleChildren.map((child, i) => (
        <div
          key={isValidElement(child) ? child.key : i}
          className={contractPart(avatarGroupContract, 'item')}
          style={{ zIndex: i + 1 }}
        >
          {withGroupSize(child, size)}
        </div>
      ))}
      {overflowCount > 0 && (
        <div
          className={contractPart(avatarGroupContract, 'item')}
          style={{ zIndex: visibleChildren.length + 1 }}
        >
          <Avatar size={size} text={overflowLabel} color={overflowColor} />
        </div>
      )}
    </div>
  )
}

AvatarGroup.displayName = 'AvatarGroup'
