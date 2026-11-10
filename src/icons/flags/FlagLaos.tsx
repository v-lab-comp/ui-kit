import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6470)">\n<path d="M22.8093 6.78263C20.8683 2.76867 16.7575 0 12 0C7.24247 0 3.13172 2.76867 1.19072 6.78263L12 7.82611L22.8093 6.78263Z" fill="#D80027"/>\n<path d="M1.19072 17.2174C3.13172 21.2314 7.24247 24.0001 12 24.0001C16.7575 24.0001 20.8683 21.2314 22.8093 17.2174L12 16.174L1.19072 17.2174Z" fill="#D80027"/>\n<path d="M22.8093 6.78259H1.19072C0.427875 8.36017 0 10.1301 0 12C0 13.8699 0.427875 15.6398 1.19072 17.2173H22.8092C23.5722 15.6398 24 13.8699 24 12C24 10.1301 23.5722 8.36017 22.8093 6.78259Z" fill="#0052B4"/>\n<path d="M12 16.1738C14.3052 16.1738 16.1739 14.3051 16.1739 11.9999C16.1739 9.69476 14.3052 7.82605 12 7.82605C9.69483 7.82605 7.82611 9.69476 7.82611 11.9999C7.82611 14.3051 9.69483 16.1738 12 16.1738Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6470">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagLaos = forwardRef<HTMLSpanElement, FlagProps>(function FlagLaos(props, ref) {
  return <SvgIcon title="Laos" {...props} ref={ref} svg={svg} />
})

FlagLaos.displayName = 'FlagLaos'
