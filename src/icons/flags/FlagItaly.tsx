import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6934)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M24.0001 11.9999C24.0001 6.84037 20.7436 2.44185 16.174 0.746338V23.2536C20.7436 21.558 24.0001 17.1595 24.0001 11.9999Z" fill="#D80027"/>\n<path d="M0 11.9999C0 17.1595 3.2565 21.558 7.82611 23.2536V0.746338C3.2565 2.44185 0 6.84037 0 11.9999Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6934">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagItaly = forwardRef<HTMLSpanElement, FlagProps>(function FlagItaly(props, ref) {
  return <SvgIcon title="Italy" {...props} ref={ref} svg={svg} />
})

FlagItaly.displayName = 'FlagItaly'
