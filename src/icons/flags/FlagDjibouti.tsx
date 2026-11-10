import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5166)">\n<path d="M10.9565 13.0435C10.9565 13.0435 3.52173 3.51305 3.51469 3.51473C5.68623 1.34316 8.68627 0 12 0C18.6274 0 24 5.37262 24 12L10.9565 13.0435Z" fill="#338AF3"/>\n<path d="M10.9565 12C10.9565 12 3.52173 20.487 3.51469 20.4853C5.68623 22.6568 8.68627 24 12 24C18.6274 24 24 18.6274 24 12H10.9565Z" fill="#6DA544"/>\n<path d="M3.51468 3.51465C-1.1716 8.20093 -1.1716 15.7989 3.51468 20.4853C5.45123 18.5487 7.31371 16.6862 12 12L3.51468 3.51465Z" fill="#F0F0F0"/>\n<path d="M4.85672 8.86951L5.63367 11.2609H8.14833L6.11404 12.7389L6.89095 15.1304L4.85672 13.6524L2.82239 15.1304L3.59948 12.7389L1.5652 11.2609H4.07967L4.85672 8.86951Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5166">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagDjibouti(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Djibouti" />
}
