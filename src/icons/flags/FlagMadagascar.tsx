import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_4814)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M7.82611 12V23.2536C9.12605 23.736 10.5322 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37263 7.82611 12 7.82611 12Z" fill="#6DA544"/>\n<path d="M12 0C10.5322 0 9.12605 0.264047 7.82611 0.746391V12H24C24 5.37262 18.6274 0 12 0Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_4814">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagMadagascar(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Madagascar" />
}
