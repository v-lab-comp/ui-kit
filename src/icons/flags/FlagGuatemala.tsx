import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6664)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M24 12C24 7.24242 21.2313 3.13167 17.2173 1.19067V22.8092C21.2313 20.8682 24 16.7574 24 12Z" fill="#338AF3"/>\n<path d="M0 12C0 16.7574 2.76867 20.8682 6.78263 22.8092V1.19067C2.76867 3.13167 0 7.24242 0 12Z" fill="#338AF3"/>\n<path d="M15.1359 14.0291L13.1068 12.0001L15.0382 10.0686L14.9507 9.04851L14.3978 8.49548L12 10.8932L9.60228 8.49548L9.04934 9.04851L8.96182 10.0686L10.8932 12.0001L8.86414 14.0291L9.97095 15.1358L12 13.1069L14.0291 15.1358L15.1359 14.0291Z" fill="#ACABB1"/>\n<path d="M14.9514 9.04858L13.8446 10.1553C14.3167 10.6274 14.6087 11.2796 14.6087 12C14.6087 13.4407 13.4408 14.6087 12 14.6087C10.5593 14.6087 9.39131 13.4407 9.39131 12C9.39131 11.2796 9.68335 10.6274 10.1554 10.1553L9.04866 9.04858C8.29327 9.80383 7.82611 10.8473 7.82611 12C7.82611 14.3052 9.69483 16.1739 12 16.1739C14.3052 16.1739 16.1739 14.3051 16.1739 12C16.1739 10.8474 15.7067 9.80388 14.9514 9.04858Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6664">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagGuatemala = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagGuatemala(props, ref) {
    return <SvgIcon title="Guatemala" {...props} ref={ref} svg={svg} />
  }
)

FlagGuatemala.displayName = 'FlagGuatemala'
