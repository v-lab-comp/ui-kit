import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5814)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#338AF3"/>\n<path d="M9.39132 17.2173C12.2728 17.2173 14.6087 14.8814 14.6087 12C14.6087 9.11849 12.2728 6.78259 9.39132 6.78259C6.50985 6.78259 4.17395 9.11849 4.17395 12C4.17395 14.8814 6.50985 17.2173 9.39132 17.2173Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5814">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagPalau(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Palau" />
}
