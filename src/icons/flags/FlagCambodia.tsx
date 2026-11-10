import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5882)">\n<path d="M0 12C0 14.0789 0.528891 16.0343 1.45908 17.7392L12 18.7827L22.5409 17.7392C23.4711 16.0343 24 14.0789 24 12C24 9.92113 23.4711 7.96578 22.5409 6.26089L12 5.21741L1.45908 6.26089C0.528891 7.96578 0 9.92113 0 12H0Z" fill="#D80027"/>\n<path d="M1.45911 6.26086H22.5409C20.5057 2.53073 16.5485 0 12 0C7.45151 0 3.49437 2.53073 1.45911 6.26086Z" fill="#0052B4"/>\n<path d="M12 24C16.5485 24 20.5057 21.4693 22.5409 17.7391H1.45911C3.49437 21.4693 7.45151 24 12 24Z" fill="#0052B4"/>\n<path d="M16.1739 14.3478V12.7826H15.1305V10.6956L14.087 9.65215L13.0435 10.6956V8.60867L12 7.56519L10.9565 8.60867V10.6956L9.91306 9.65215L8.86958 10.6956V12.7826H7.82614V14.3478H6.78265V15.913H17.2174V14.3478H16.1739Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5882">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagCambodia = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagCambodia(props, ref) {
    return <SvgIcon title="Cambodia" {...props} ref={ref} svg={svg} />
  }
)

FlagCambodia.displayName = 'FlagCambodia'
