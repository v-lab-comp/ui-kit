import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5823)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#338AF3"/>\n<path d="M7.56522 16.1739H16.4348L12 5.73914L7.56522 16.1739Z" fill="#F3F3F3"/>\n<path d="M9.10645 15.1305L12 8.54883L14.8935 15.1305H9.10645Z" fill="#333333"/>\n<path d="M7.56522 16.1739H16.4348L12 12L7.56522 16.1739Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5823">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagStLucia(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="St. Lucia" />
}
