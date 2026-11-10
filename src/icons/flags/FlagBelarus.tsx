import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6081)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FCFCFC"/>\n<path d="M4.9565 11.1305L3.65216 8.76408L4.9565 6.43481L6.26085 8.76408L4.9565 11.1305Z" fill="#A2001D"/>\n<path d="M2.3478 11.1305L1.04346 8.76408L2.3478 6.43481L3.65214 8.76408L2.3478 11.1305Z" fill="#A2001D"/>\n<path d="M4.9565 17.5653L3.65216 15.1989L4.9565 12.8696L6.26085 15.1989L4.9565 17.5653Z" fill="#A2001D"/>\n<path d="M2.3478 17.5653L1.04346 15.1989L2.3478 12.8696L3.65214 15.1989L2.3478 17.5653Z" fill="#A2001D"/>\n<path d="M6.26083 2.32936L5.89155 1.66992C5.22921 2.06236 4.60797 2.51672 4.03558 3.02503L4.95649 4.6957L6.26083 2.32936Z" fill="#A2001D"/>\n<path d="M4.95647 19.3044L4.02582 20.9664C4.59769 21.4754 5.21851 21.9305 5.88057 22.3237L6.26086 21.6338L4.95647 19.3044Z" fill="#A2001D"/>\n<path d="M7.30432 15.1305V23.0459C8.74662 23.6599 10.3335 24 12 24C17.1596 24 21.5581 20.7435 23.2536 16.1739L7.30432 15.1305Z" fill="#6DA544"/>\n<path d="M23.2536 16.1739C23.736 14.8739 24 13.4678 24 12C24 5.37263 18.6274 0 12 0C10.3336 0 8.74662 0.339984 7.30432 0.953813V16.1739H23.2536V16.1739Z" fill="#A2001D"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6081">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagBelarus(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Belarus" />
}
