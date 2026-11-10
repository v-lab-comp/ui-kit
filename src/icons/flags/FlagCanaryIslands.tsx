import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6299)">\n<path d="M12 0C10.5322 0 9.12605 0.264047 7.82612 0.746391L7.30435 12L7.82607 23.2536C9.12605 23.736 10.5322 24 12 24C13.4679 24 14.874 23.736 16.1739 23.2536L16.6957 12L16.1739 0.746391C14.874 0.264047 13.4679 0 12 0V0Z" fill="#338AF3"/>\n<path d="M24 11.9999C24 6.84037 20.7435 2.44185 16.1739 0.746338V23.2536C20.7435 21.558 24 17.1595 24 11.9999Z" fill="#FFDA44"/>\n<path d="M7.82611 23.2536V0.746338C3.2565 2.44185 0 6.84037 0 11.9999C0 17.1595 3.2565 21.558 7.82611 23.2536Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6299">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagCanaryIslands(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Canary Islands" />
}
