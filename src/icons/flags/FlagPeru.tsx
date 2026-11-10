import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6439)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M24.0001 12C24.0001 6.84049 20.7436 2.44193 16.174 0.74646V23.2537C20.7436 21.5581 24.0001 17.1596 24.0001 12Z" fill="#D80027"/>\n<path d="M0 12C0 17.1596 3.2565 21.5581 7.82611 23.2537V0.74646C3.2565 2.44193 0 6.84049 0 12Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6439">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagPeru = forwardRef<HTMLSpanElement, FlagProps>(function FlagPeru(props, ref) {
  return <SvgIcon title="Peru" {...props} ref={ref} svg={svg} />
})

FlagPeru.displayName = 'FlagPeru'
