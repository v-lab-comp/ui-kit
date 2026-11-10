import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5671)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#D80027"/>\n<path d="M12 6.26086L13.295 10.2466H17.4859L14.0954 12.7099L15.3904 16.6957L12 14.2323L8.60951 16.6957L9.90457 12.7099L6.5141 10.2466H10.7049L12 6.26086Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5671">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagVietnam(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Vietnam" />
}
