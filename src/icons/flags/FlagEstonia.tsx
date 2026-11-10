import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_4792)">\n<path d="M0 12C0 13.4678 0.264047 14.8739 0.746391 16.1739L12 16.6956L23.2536 16.1739C23.736 14.8739 24 13.4678 24 12C24 10.5321 23.736 9.12607 23.2536 7.82609L12 7.30432L0.746391 7.82604C0.264047 9.12607 0 10.5321 0 12H0Z" fill="black"/>\n<path d="M12 0C6.84043 0 2.44191 3.2565 0.746399 7.82611H23.2537C21.5581 3.2565 17.1596 0 12 0Z" fill="#0052B4"/>\n<path d="M23.2536 16.1739H0.746399C2.44191 20.7435 6.84043 24 12 24C17.1596 24 21.5581 20.7435 23.2536 16.1739Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_4792">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagEstonia(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Estonia" />
}
