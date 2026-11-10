import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6192)">\n<path d="M7.82605 10.9565L8.86953 23.5866C9.86764 23.8557 10.9168 24 11.9999 24C18.6273 24 23.9999 18.6274 23.9999 12L7.82605 10.9565Z" fill="#D80027"/>\n<path d="M7.82605 12L8.86949 0.413391C9.86764 0.144375 10.9168 0 11.9999 0C18.6273 0 23.9999 5.37262 23.9999 12H7.82605Z" fill="#FFDA44"/>\n<path d="M0 11.9999C0 17.5443 3.76036 22.2095 8.86955 23.5865V0.41333C3.76036 1.79033 0 6.45561 0 11.9999Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6192">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagBenin = forwardRef<HTMLSpanElement, FlagProps>(function FlagBenin(props, ref) {
  return <SvgIcon title="Benin" {...props} ref={ref} svg={svg} />
})

FlagBenin.displayName = 'FlagBenin'
