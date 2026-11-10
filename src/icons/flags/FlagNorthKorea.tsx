import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6688)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C8.36291 0 5.10402 1.61831 2.90338 4.17389H21.0966C18.896 1.61831 15.6371 0 12 0Z" fill="#0052B4"/>\n<path d="M21.0966 19.826H2.90338C5.10402 22.3816 8.36291 23.9999 12 23.9999C15.6371 23.9999 18.896 22.3816 21.0966 19.826Z" fill="#0052B4"/>\n<path d="M22.2387 5.73914H1.76128C0.644297 7.56187 0 9.7056 0 12C0 14.2944 0.644297 16.4382 1.76128 18.2609H22.2387C23.3557 16.4382 24 14.2944 24 12C24 9.7056 23.3557 7.56187 22.2387 5.73914Z" fill="#D80027"/>\n<path d="M7.38263 16.6173C9.93274 16.6173 12 14.55 12 11.9999C12 9.44984 9.93274 7.38257 7.38263 7.38257C4.83253 7.38257 2.76526 9.44984 2.76526 11.9999C2.76526 14.55 4.83253 16.6173 7.38263 16.6173Z" fill="#F0F0F0"/>\n<path d="M7.38261 7.38257L8.41859 10.5711H11.7766L9.05895 12.5418L10.103 15.7398L7.38261 13.7597L4.66629 15.7361L5.70626 12.5418L2.99103 10.5711H6.34657L7.38261 7.38257Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6688">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagNorthKorea(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="North Korea" />
}
