import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6582)">\n<path d="M16.1739 0.746344C14.8738 0.264047 13.4678 6.23894e-09 12 6.23894e-09C10.5321 -4.68688e-05 9.12606 0.264047 7.82608 0.746344L6.78259 12L7.82608 23.2536C9.12601 23.736 10.5321 24 12 24C13.4678 24 14.8739 23.736 16.1739 23.2536L17.2173 12L16.1739 0.746344Z" fill="#FFDA44"/>\n<path d="M24.0001 11.9999C24.0001 6.84042 20.7436 2.44181 16.174 0.746338V23.2537C20.7436 21.558 24 17.1596 24.0001 11.9999Z" fill="#D80027"/>\n<path d="M0 12C0 17.1596 3.2565 21.5581 7.82602 23.2537L7.82606 0.74646C3.2565 2.44193 0 6.8404 0 12H0Z" fill="#0052B4"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6582">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagRomania(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Romania" />
}
