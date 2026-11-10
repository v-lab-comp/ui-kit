import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6606)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M0 12C0 18.6274 5.37262 24 12 24C12 19.4365 12 12 12 12C12 12 4.17389 12 0 12Z" fill="#0052B4"/>\n<path d="M12 0C18.6274 0 24 5.37262 24 12C19.4365 12 12 12 12 12C12 12 12 4.17389 12 0Z" fill="#D80027"/>\n<path d="M7.14325 4.17395L7.92029 6.56542H10.4348L8.40053 8.04339L9.17753 10.4349L7.14325 8.95684L5.10897 10.4349L5.88597 8.04339L3.85168 6.56542H6.3662L7.14325 4.17395Z" fill="#0052B4"/>\n<path d="M16.8567 13.5652L17.6338 15.9567H20.1483L18.114 17.4346L18.891 19.8261L16.8567 18.3481L14.8225 19.8261L15.5995 17.4346L13.5652 15.9567H16.0797L16.8567 13.5652Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6606">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagPanama = forwardRef<HTMLSpanElement, FlagProps>(function FlagPanama(props, ref) {
  return <SvgIcon title="Panama" {...props} ref={ref} svg={svg} />
})

FlagPanama.displayName = 'FlagPanama'
