import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5058)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FFDA44"/>\n<path d="M13.8249 23.862C15.7766 23.5643 17.5732 22.7957 19.0963 21.6768L12 12L13.8249 23.862Z" fill="#D80027"/>\n<path d="M10.175 0.137939C8.22335 0.435689 6.42681 1.20425 4.90356 2.32311L12 12L10.175 0.137939Z" fill="#D80027"/>\n<path d="M4.90356 21.6768C6.42672 22.7957 8.22325 23.5643 10.1749 23.8621L12 12L4.90356 21.6768Z" fill="#D80027"/>\n<path d="M2.32311 4.90356C1.20421 6.42681 0.435736 8.2233 0.137939 10.175L12 12L2.32311 4.90356Z" fill="#D80027"/>\n<path d="M0.137939 13.8249C0.435689 15.7766 1.20425 17.5732 2.32316 19.0963L12 12L0.137939 13.8249Z" fill="#D80027"/>\n<path d="M23.862 10.175C23.5642 8.22336 22.7957 6.42683 21.6768 4.90363L12 12L23.862 10.175Z" fill="#D80027"/>\n<path d="M19.0963 2.32306C17.5731 1.20421 15.7766 0.435689 13.8249 0.137939L12 12L19.0963 2.32306Z" fill="#D80027"/>\n<path d="M21.6769 19.0964C22.7958 17.5732 23.5643 15.7766 23.8621 13.825L12 12L21.6769 19.0964Z" fill="#D80027"/>\n<path d="M11.9999 16.1739C14.3051 16.1739 16.1738 14.3052 16.1738 12C16.1738 9.69483 14.3051 7.82611 11.9999 7.82611C9.69476 7.82611 7.82605 9.69483 7.82605 12C7.82605 14.3052 9.69476 16.1739 11.9999 16.1739Z" fill="#D80027"/>\n<path d="M12 15.1305C13.7289 15.1305 15.1304 13.7289 15.1304 12C15.1304 10.2711 13.7289 8.86957 12 8.86957C10.2711 8.86957 8.86951 10.2711 8.86951 12C8.86951 13.7289 10.2711 15.1305 12 15.1305Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5058">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagRepublicofMacedonia = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagRepublicofMacedonia(props, ref) {
    return <SvgIcon title="Republic of Macedonia" {...props} ref={ref} svg={svg} />
  }
)

FlagRepublicofMacedonia.displayName = 'FlagRepublicofMacedonia'
