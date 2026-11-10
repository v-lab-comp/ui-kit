import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6158)">\n<path d="M12 0C18.6273 0 24 5.37261 24 12C24 18.6273 18.6273 24 12 24C5.37261 24 0 18.6273 0 12" fill="#FFDA44"/>\n<path d="M11.7391 5.33341H21.9787C21.3044 4.32621 20.4816 3.42715 19.5418 2.66675H11.7391V5.33341Z" fill="#D80027"/>\n<path d="M11.7391 10.6667H23.9259C23.8236 9.74209 23.6164 8.84926 23.3163 8.00012H11.7391V10.6667Z" fill="#D80027"/>\n<path d="M0.683752 16.0001H23.3161C23.6163 15.1509 23.8236 14.258 23.9258 13.3334H0.0740967C0.176284 14.2581 0.383565 15.151 0.683752 16.0001Z" fill="#D80027"/>\n<path d="M4.45815 21.3334H19.5417C20.4815 20.5731 21.3044 19.6739 21.9786 18.6667H2.02136C2.69561 19.6739 3.51836 20.573 4.45815 21.3334Z" fill="#D80027"/>\n<path d="M12 0C5.37262 0 -4.68746e-05 5.37261 3.06725e-10 12.0001C2.73871 12 5.37261 12.0001 12 12.0001L12 0Z" fill="#4A1F63"/>\n<path d="M9.91302 6.26089V7.30437H9.3913V6.26089H8.34782V7.30437H7.8261V5.21741H5.73914V7.30437H5.21737V6.26089H4.17394V7.30437H3.65217V6.26089H2.60864V9.39129H10.9565V6.26089H9.91302Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6158">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagBalearicIslands = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagBalearicIslands(props, ref) {
    return <SvgIcon title="Balearic Islands" {...props} ref={ref} svg={svg} />
  }
)

FlagBalearicIslands.displayName = 'FlagBalearicIslands'
