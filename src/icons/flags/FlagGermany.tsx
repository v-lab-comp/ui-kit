import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6562)">\n<path d="M0.746338 16.1739C2.44185 20.7435 6.84037 24 11.9999 24C17.1595 24 21.558 20.7435 23.2536 16.1739L11.9999 15.1305L0.746338 16.1739Z" fill="#FFDA44"/>\n<path d="M11.9999 0C6.84037 0 2.44185 3.2565 0.746338 7.82611L11.9999 8.86955L23.2536 7.82606C21.558 3.2565 17.1595 0 11.9999 0Z" fill="black"/>\n<path d="M0.746391 7.82605C0.264047 9.12603 0 10.5321 0 11.9999C0 13.4678 0.264047 14.8738 0.746391 16.1738H23.2537C23.736 14.8738 24 13.4678 24 11.9999C24 10.5321 23.736 9.12603 23.2536 7.82605H0.746391Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6562">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagGermany(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Germany" />
}
