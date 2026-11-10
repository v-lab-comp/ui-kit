import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5971)">\n<path d="M17.2174 1.19072C15.6397 0.427875 13.8698 0 12 0C10.1302 0 8.36025 0.427875 6.78262 1.19072L5.73914 12L6.78262 22.8093C8.36025 23.5721 10.1302 24 12 24C13.8698 24 15.6397 23.5721 17.2174 22.8093L18.2609 12L17.2174 1.19072Z" fill="#D80027"/>\n<path d="M6.78263 1.19116C2.76872 3.13212 0 7.24254 0 12C0 16.7575 2.76872 20.8679 6.78263 22.8089V1.19116Z" fill="black"/>\n<path d="M17.2174 1.19116V22.8089C21.2313 20.8679 24 16.7575 24 12C24 7.24254 21.2313 3.13212 17.2174 1.19116Z" fill="#496E2D"/>\n<path d="M11.9999 7.82605C9.69472 7.82605 7.82605 9.69477 7.82605 11.9999C7.82605 14.3051 9.69477 16.1738 11.9999 16.1738C14.3051 16.1738 16.1738 14.3051 16.1738 11.9999C16.1738 9.69477 14.3052 7.82605 11.9999 7.82605ZM11.9999 14.6086C10.5592 14.6086 9.39125 13.4406 9.39125 11.9999C9.39125 10.5592 10.5592 9.39125 11.9999 9.39125C13.4406 9.39125 14.6086 10.5592 14.6086 11.9999C14.6086 13.4406 13.4407 14.6086 11.9999 14.6086Z" fill="#FFDA44"/>\n<path d="M11.9999 10.4347C11.4236 10.4347 10.9564 10.9018 10.9564 11.4782V13.0434H13.0434V11.4782C13.0434 10.9018 12.5762 10.4347 11.9999 10.4347Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5971">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagAfghanistan = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagAfghanistan(props, ref) {
    return <SvgIcon title="Afghanistan" {...props} ref={ref} svg={svg} />
  }
)

FlagAfghanistan.displayName = 'FlagAfghanistan'
