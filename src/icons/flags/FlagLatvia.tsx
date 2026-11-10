import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6723)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M11.9999 0C6.45561 0 1.79033 3.76036 0.41333 8.86955H23.5866C22.2095 3.76036 17.5443 0 11.9999 0Z" fill="#A2001D"/>\n<path d="M11.9999 24C17.5443 24 22.2095 20.2397 23.5865 15.1305H0.41333C1.79033 20.2396 6.45561 24 11.9999 24Z" fill="#A2001D"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6723">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagLatvia = forwardRef<HTMLSpanElement, FlagProps>(function FlagLatvia(props, ref) {
  return <SvgIcon title="Latvia" {...props} ref={ref} svg={svg} />
})

FlagLatvia.displayName = 'FlagLatvia'
