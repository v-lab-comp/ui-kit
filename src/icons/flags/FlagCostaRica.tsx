import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5888)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M23.2536 7.82605H0.746391C0.264047 9.12603 0 10.5321 0 11.9999C0 13.4678 0.264047 14.8738 0.746391 16.1738H23.2537C23.736 14.8738 24 13.4678 24 11.9999C24 10.5321 23.736 9.12603 23.2536 7.82605Z" fill="#D80027"/>\n<path d="M12 0C8.36291 0 5.10402 1.61831 2.90338 4.17389H21.0966C18.896 1.61831 15.6371 0 12 0Z" fill="#0052B4"/>\n<path d="M21.0966 19.826H2.90338C5.10402 22.3816 8.36291 23.9999 12 23.9999C15.6371 23.9999 18.896 22.3816 21.0966 19.826Z" fill="#0052B4"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5888">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagCostaRica = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagCostaRica(props, ref) {
    return <SvgIcon title="Costa Rica" {...props} ref={ref} svg={svg} />
  }
)

FlagCostaRica.displayName = 'FlagCostaRica'
