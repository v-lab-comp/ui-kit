import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6458)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 8.86959H23.5866C23.2857 7.75331 22.8284 6.70139 22.2387 5.73914H12V8.86959Z" fill="#338AF3"/>\n<path d="M4.53009 21.3913H19.4698C20.5649 20.5191 21.5041 19.4596 22.2386 18.2609H1.76123C2.49581 19.4596 3.435 20.5191 4.53009 21.3913Z" fill="#338AF3"/>\n<path d="M4.17384 2.90344C3.23043 3.71583 2.41486 4.6725 1.76123 5.73919H4.17384V2.90344Z" fill="#338AF3"/>\n<path d="M12 12C12 10.7776 12 9.75469 12 8.86951H7.30434V12H4.17389V8.86951H0.413391C0.144375 9.86766 0 10.9168 0 12C0 13.0831 0.144375 14.1323 0.413391 15.1304H23.5867C23.8556 14.1323 24 13.0831 24 12H12Z" fill="#338AF3"/>\n<path d="M12 0C10.3336 0 8.74667 0.339984 7.30432 0.953812V5.73914H12C12 4.64639 12 3.717 12 2.60869H19.4698C17.4199 0.976125 14.8241 0 12 0Z" fill="#338AF3"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6458">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagGreece(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Greece" />
}
