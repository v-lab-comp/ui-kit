import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6184)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FFDA44"/>\n<path d="M12.0001 23.9999C15.6371 23.9999 18.896 22.3816 21.0967 19.826H2.90344C5.10408 22.3816 8.36297 23.9999 12.0001 23.9999Z" fill="#338AF3"/>\n<path d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37262 0 12C0 13.0831 0.144375 14.1323 0.413391 15.1305H23.5867C23.8556 14.1323 24 13.0831 24 12Z" fill="#338AF3"/>\n<path d="M0.953857 16.6957C1.18519 17.2392 1.45561 17.762 1.76128 18.2609H22.2387C22.5444 17.7619 22.8148 17.2392 23.0462 16.6957H0.953857Z" fill="#338AF3"/>\n<path d="M5.49929 7.56855L3.15479 6.53384L5.49929 5.49912L6.53396 3.15466L7.56863 5.49912L9.91308 6.53384L7.56863 7.56855L6.53396 9.91301L5.49929 7.56855Z" fill="#F0F0F0"/>\n<path d="M6.53387 4.4469L7.17282 5.89482L8.62079 6.53387L7.17282 7.17287L6.53387 8.62079L5.89482 7.17287L4.4469 6.53387L5.89482 5.89482L6.53387 4.4469Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6184">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagAruba(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Aruba" />
}
