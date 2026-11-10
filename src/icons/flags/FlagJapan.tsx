import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6790)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 17.2173C14.8815 17.2173 17.2174 14.8814 17.2174 12C17.2174 9.11849 14.8815 6.78259 12 6.78259C9.11852 6.78259 6.78262 9.11849 6.78262 12C6.78262 14.8814 9.11852 17.2173 12 17.2173Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6790">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagJapan(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Japan" />
}
