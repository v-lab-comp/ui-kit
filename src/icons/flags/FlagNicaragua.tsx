import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6834)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C7.24248 0 3.13173 2.76867 1.19073 6.78263H22.8092C20.8683 2.76867 16.7575 0 12 0Z" fill="#338AF3"/>\n<path d="M12 24C16.7575 24 20.8683 21.2314 22.8093 17.2174H1.19073C3.13173 21.2314 7.24248 24 12 24Z" fill="#338AF3"/>\n<path d="M12 8.34778C9.98298 8.34778 8.34784 9.98292 8.34784 11.9999C8.34784 14.017 9.98298 15.6521 12 15.6521C14.017 15.6521 15.6522 14.017 15.6522 11.9999C15.6522 9.98292 14.017 8.34778 12 8.34778ZM12 14.0869C10.8474 14.0869 9.91304 13.1526 9.91304 11.9999C9.91304 10.8473 10.8474 9.91298 12 9.91298C13.1526 9.91298 14.087 10.8473 14.087 11.9999C14.087 13.1526 13.1526 14.0869 12 14.0869Z" fill="#FFDA44"/>\n<path d="M13.8074 12.5217L12 12L10.1926 12.5217L9.59015 13.5652H14.4098L13.8074 12.5217Z" fill="#0052B4"/>\n<path d="M12 9.39136L10.7951 11.4783L12 12L13.2049 11.4783L12 9.39136Z" fill="#338AF3"/>\n<path d="M10.1926 12.5217H13.8074L13.2049 11.4783H10.7951L10.1926 12.5217Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6834">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagNicaragua(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Nicaragua" />
}
