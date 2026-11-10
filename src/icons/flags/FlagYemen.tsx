import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5105)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M11.9999 24C17.1595 24 21.558 20.7435 23.2536 16.1739H0.746338C2.44185 20.7435 6.84037 24 11.9999 24Z" fill="black"/>\n<path d="M11.9999 0C6.84037 0 2.44185 3.2565 0.746338 7.82611H23.2536C21.558 3.2565 17.1595 0 11.9999 0Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5105">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagYemen = forwardRef<HTMLSpanElement, FlagProps>(function FlagYemen(props, ref) {
  return <SvgIcon title="Yemen" {...props} ref={ref} svg={svg} />
})

FlagYemen.displayName = 'FlagYemen'
