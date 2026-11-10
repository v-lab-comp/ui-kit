import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5079)">\n<path d="M1.19072 6.78262C0.427875 8.36025 0 10.1301 0 12C0 13.8699 0.427875 15.6397 1.19072 17.2174L12 18.2609L22.8093 17.2174C23.5721 15.6397 24 13.8699 24 12C24 10.1301 23.5721 8.36025 22.8093 6.78262L12 5.73914L1.19072 6.78262Z" fill="#F0F0F0"/>\n<path d="M1.19116 17.2173C3.13207 21.2313 7.24249 24 12 24C16.7576 24 20.868 21.2313 22.8089 17.2173H1.19116Z" fill="black"/>\n<path d="M1.19116 6.78263H22.8089C20.868 2.76867 16.7576 0 12 0C7.24249 0 3.13207 2.76867 1.19116 6.78263Z" fill="#D80027"/>\n<path d="M3.51471 3.51471C-1.17157 8.20099 -1.17157 15.799 3.51471 20.4853C5.45126 18.5488 7.31374 16.6863 12 12L3.51471 3.51471Z" fill="#496E2D"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5079">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagSudan = forwardRef<HTMLSpanElement, FlagProps>(function FlagSudan(props, ref) {
  return <SvgIcon title="Sudan" {...props} ref={ref} svg={svg} />
})

FlagSudan.displayName = 'FlagSudan'
