import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5922)">\n<path d="M12 0C18.6274 0 24 5.37262 24 12C24 18.6274 18.6274 24 12 24C12 23.4783 10.4348 12 10.4348 12L12 0Z" fill="#F0F0F0"/>\n<path d="M12 24C5.37262 24 0 18.6274 0 12C0 5.37262 5.37262 0 12 0" fill="#496E2D"/>\n<path d="M14.5783 9.69824L13.5937 11.055L11.9991 10.5379L12.9853 11.8935L12.0008 13.2503L13.5948 12.7314L14.5809 14.087L14.5799 12.4107L16.1739 11.8917L14.5794 11.3746L14.5783 9.69824Z" fill="#D80027"/>\n<path d="M12.9954 15.3913C11.1225 15.3913 9.60413 13.8729 9.60413 12C9.60413 10.127 11.1225 8.60867 12.9954 8.60867C13.5794 8.60867 14.1289 8.75633 14.6087 9.0163C13.856 8.28032 12.8268 7.82605 11.6911 7.82605C9.38588 7.82605 7.51721 9.69477 7.51721 11.9999C7.51721 14.3051 9.38593 16.1738 11.6911 16.1738C12.8269 16.1738 13.8561 15.7196 14.6087 14.9836C14.1289 15.2436 13.5794 15.3913 12.9954 15.3913Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5922">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagAlgeria(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Algeria" />
}
