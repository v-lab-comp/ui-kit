import type { SVGProps } from 'react'

export interface SvgIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  svg: string
  size?: number
  title?: string
}

export function SvgIcon({ svg, size = 24, title, className, ...props }: SvgIconProps) {
  const sized = svg.replace(
    /<svg/,
    `<svg width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" `
  )
  return (
    <span
      className={className}
      style={{ display: 'inline-block', width: size, height: size, overflow: 'hidden' }}
      title={title}
      dangerouslySetInnerHTML={{ __html: sized }}
      {...(props as object)}
    />
  )
}
