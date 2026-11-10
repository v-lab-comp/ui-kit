import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5126)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M23.2536 16.1739C23.736 14.8739 24 13.4678 24 12C24 10.5322 23.736 9.1261 23.2536 7.82611H0.746391C0.264047 9.1261 0 10.5322 0 12C0 13.4678 0.264047 14.8739 0.746391 16.1739L12 17.2174L23.2536 16.1739Z" fill="#0052B4"/>\n<path d="M11.9999 24C17.1595 24 21.558 20.7435 23.2536 16.1739H0.746338C2.44185 20.7435 6.84037 24 11.9999 24Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5126">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagRussia(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Russia" />
}
