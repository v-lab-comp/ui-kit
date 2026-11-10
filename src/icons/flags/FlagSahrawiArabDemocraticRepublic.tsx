import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5071)">\n<path d="M1.19072 6.78262C0.427875 8.36025 0 10.1301 0 12C0 13.8699 0.427875 15.6397 1.19072 17.2174L12 18.2609L22.8093 17.2174C23.5721 15.6397 24 13.8699 24 12C24 10.1301 23.5721 8.36025 22.8093 6.78262L12 5.73914L1.19072 6.78262Z" fill="#F0F0F0"/>\n<path d="M1.19116 17.2173C3.13207 21.2313 7.24254 24 12 24C16.7575 24 20.868 21.2313 22.8089 17.2173H1.19116Z" fill="#496E2D"/>\n<path d="M1.19116 6.78263H22.8089C20.868 2.76867 16.7576 0 12 0C7.24249 0 3.13207 2.76867 1.19116 6.78263Z" fill="black"/>\n<path d="M3.51471 3.51471C-1.17157 8.20099 -1.17157 15.799 3.51471 20.4853C5.45126 18.5488 7.31374 16.6863 12 12L3.51471 3.51471Z" fill="#D80027"/>\n<path d="M15.1304 12C15.1304 10.2517 16.3592 8.79109 18 8.43278C17.7478 8.3777 17.4861 8.34784 17.2174 8.34784C15.2003 8.34784 13.5652 9.98293 13.5652 12C13.5652 14.0171 15.2003 15.6522 17.2174 15.6522C17.4861 15.6522 17.7477 15.6223 18 15.5672C16.3592 15.2089 15.1304 13.7484 15.1304 12Z" fill="#D80027"/>\n<path d="M18.1534 9.65222L18.6715 11.2466H20.3478L18.9916 12.2318L19.5097 13.8262L18.1534 12.8408L16.7973 13.8262L17.3154 12.2318L15.9591 11.2466H17.6354L18.1534 9.65222Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5071">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagSahrawiArabDemocraticRepublic = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagSahrawiArabDemocraticRepublic(props, ref) {
    return <SvgIcon title="Sahrawi Arab Democratic Republic" {...props} ref={ref} svg={svg} />
  }
)

FlagSahrawiArabDemocraticRepublic.displayName = 'FlagSahrawiArabDemocraticRepublic'
