import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6849)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C18.6274 0 24 5.37262 24 12C24 18.6274 18.6274 24 12 24" fill="#D80027"/>\n<path d="M8.3478 4.6957V3.13049H6.7826V4.6957H5.21735V6.2609H6.7826V7.82615H8.3478V6.2609H9.913V4.6957H8.3478Z" fill="#ACABB1"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6849">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagMalta = forwardRef<HTMLSpanElement, FlagProps>(function FlagMalta(props, ref) {
  return <SvgIcon title="Malta" {...props} ref={ref} svg={svg} />
})

FlagMalta.displayName = 'FlagMalta'
