import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6650)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M7.30434 7.82611H23.2536C21.5581 3.2565 17.1595 0 12 0C8.68622 0 5.68654 1.34339 3.51511 3.51511L7.30434 7.82611Z" fill="black"/>\n<path d="M7.30434 16.174H23.2536C21.5581 20.7436 17.1595 24.0001 12 24.0001C8.68622 24.0001 5.68654 22.6567 3.51511 20.4849L7.30434 16.174Z" fill="#6DA544"/>\n<path d="M3.51468 3.51465C-1.1716 8.20093 -1.1716 15.7989 3.51468 20.4853C5.45123 18.5487 7.31371 16.6862 12 12L3.51468 3.51465Z" fill="#D80027"/>\n<path d="M4.76274 9.39136L5.42129 10.7685L6.90858 10.4248L6.24249 11.7982L7.43851 12.7467L5.94943 13.0823L5.95355 14.6087L4.76274 13.6537L3.57188 14.6087L3.57605 13.0823L2.08698 12.7467L3.28294 11.7982L2.61694 10.4248L4.10415 10.7685L4.76274 9.39136Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6650">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagJordan = forwardRef<HTMLSpanElement, FlagProps>(function FlagJordan(props, ref) {
  return <SvgIcon title="Jordan" {...props} ref={ref} svg={svg} />
})

FlagJordan.displayName = 'FlagJordan'
