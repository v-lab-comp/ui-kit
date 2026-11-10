import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6116)">\n<path d="M17.2174 1.19072C15.6397 0.427875 13.8698 0 12 0C10.1302 0 8.36025 0.427875 6.78262 1.19072L5.73914 12L6.78262 22.8093C8.36025 23.5721 10.1302 24 12 24C13.8698 24 15.6397 23.5721 17.2174 22.8093L18.2609 12L17.2174 1.19072Z" fill="#D80027"/>\n<path d="M11.9999 7.82605L13.0358 11.0144H16.3887L13.6763 12.9853L14.7123 16.1738L11.9999 14.2032L9.28747 16.1738L10.3236 12.9853L7.61127 11.0144H10.9639L11.9999 7.82605Z" fill="#FFDA44"/>\n<path d="M6.78263 1.19116C2.76872 3.13207 0 7.24249 0 12C0 16.7576 2.76872 20.868 6.78263 22.8089V1.19116Z" fill="#496E2D"/>\n<path d="M17.2173 1.19116V22.8089C21.2313 20.868 24 16.7575 24 12C24 7.24254 21.2313 3.13207 17.2173 1.19116Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6116">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagCameroon(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Cameroon" />
}
