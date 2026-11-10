import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6407)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M11.9999 0C6.84037 0 2.44185 3.2565 0.746338 7.82611H23.2536C21.558 3.2565 17.1595 0 11.9999 0Z" fill="#D80027"/>\n<path d="M11.9999 24.0001C17.1595 24.0001 21.558 20.7436 23.2536 16.174H0.746338C2.44185 20.7436 6.84037 24.0001 11.9999 24.0001Z" fill="black"/>\n<path d="M16.1739 10.6957H13.0435C13.0435 10.1194 12.5763 9.65222 12 9.65222C11.4237 9.65222 10.9565 10.1194 10.9565 10.6957H7.82605C7.82605 11.272 8.32803 11.7392 8.90431 11.7392H8.86953C8.86953 12.3155 9.33669 12.7827 9.91302 12.7827C9.91302 13.359 10.3802 13.8262 10.9565 13.8262H13.0435C13.6198 13.8262 14.087 13.359 14.087 12.7827C14.6633 12.7827 15.1304 12.3155 15.1304 11.7392H15.0957C15.672 11.7392 16.1739 11.272 16.1739 10.6957Z" fill="#FF9811"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6407">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagEgypt(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Egypt" />
}
