import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { avatarContract } from '@/theme/contracts/avatar'
import type { AvatarProps, AvatarSize } from './Avatar.types'

const FONT_SIZE: Record<AvatarSize, number> = {
  20: 10,
  24: 11,
  32: 12,
  40: 14,
  48: 16,
  56: 18,
  64: 20,
  72: 22,
  80: 24,
}

function DefaultAvatarIcon() {
  return (
    <svg
      className={contractPart(avatarContract, 'default-icon')}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse
        cx="10"
        cy="19.5"
        rx="8"
        ry="6"
        className={contractPart(avatarContract, 'default-icon-shoulders')}
      />
      <circle cx="10" cy="8" r="4" className={contractPart(avatarContract, 'default-icon-head')} />
    </svg>
  )
}

/**
 * Аватар: фото, инициалы или иконка. Доступное имя — `alt`:
 * у фото его несёт `<img alt>`, у инициалов/иконки — корень (`role="img"` + `aria-label`).
 * Пустой `alt` — аватар декоративный. ref — на корневой span.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt = '', text, icon, size = 56, color, style, className, ...props },
  ref
) {
  const [brokenSrc, setBrokenSrc] = useState<string | null>(null)
  const canShowImage = Boolean(src) && brokenSrc !== src
  const hasText = text != null && String(text).trim().length > 0
  // Имя ставим в одно место: у фото — только на <img>, иначе — на корень
  const named = !canShowImage && alt.trim() !== ''

  return (
    <span
      ref={ref}
      className={clsx(avatarContract.className, className)}
      style={{ width: size, height: size, fontSize: FONT_SIZE[size], ...style }}
      role={named ? 'img' : undefined}
      aria-label={named ? alt : undefined}
      {...contractAttrs(avatarContract, { color })}
      {...props}
    >
      {canShowImage ? (
        <img
          src={src ?? undefined}
          alt={alt}
          decoding="async"
          onError={() => setBrokenSrc(src ?? null)}
        />
      ) : hasText ? (
        <span aria-hidden>{String(text).slice(0, 2)}</span>
      ) : (
        <span className={contractPart(avatarContract, 'icon')} aria-hidden>
          {!src && icon ? icon : <DefaultAvatarIcon />}
        </span>
      )}
    </span>
  )
})

Avatar.displayName = 'Avatar'
