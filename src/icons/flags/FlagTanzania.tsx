import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6913)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FFDA44"/>\n<path d="M3.51471 20.4853C4.0181 20.9887 4.55519 21.4376 5.11858 21.8329L21.8328 5.11863C21.4376 4.55524 20.9887 4.01814 20.4853 3.51475C19.9818 3.01136 19.4448 2.56249 18.8814 2.16724L2.16724 18.8815C2.56239 19.4448 3.01136 19.9819 3.51471 20.4853Z" fill="black"/>\n<path d="M3.51471 3.51465C-0.271007 7.30047 -0.997804 12.986 1.33296 17.5021L17.5021 1.33295C12.986 -0.997814 7.30048 -0.27097 3.51471 3.51465Z" fill="#6DA544"/>\n<path d="M20.4853 20.4853C24.271 16.6996 24.9978 11.014 22.6671 6.49792L6.49792 22.6671C11.0139 24.9978 16.6995 24.271 20.4853 20.4853Z" fill="#338AF3"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6913">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagTanzania(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Tanzania" />
}
