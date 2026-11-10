import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6272)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M22.5409 6.26084C20.9903 3.41886 18.3239 1.27344 15.1305 0.41272L14.6087 6.26084H22.5409Z" fill="#0052B4"/>\n<path d="M1.45908 6.26084H9.39126L8.86954 0.41272C5.67609 1.27344 3.00975 3.41891 1.45908 6.26084Z" fill="#0052B4"/>\n<path d="M14.6087 12V17.7391H22.5409C23.4711 16.0342 24 14.0789 24 12H14.6087Z" fill="#6DA544"/>\n<path d="M9.39131 12H0C0 14.0789 0.528891 16.0342 1.45908 17.7391H9.39127V12H9.39131Z" fill="#6DA544"/>\n<path d="M1.45908 17.7391C3.00975 20.5811 5.67609 22.7265 8.86954 23.5873L9.39126 18.4728L1.45908 17.7391Z" fill="#FFDA44"/>\n<path d="M15.1305 23.5873C18.3239 22.7265 20.9903 20.5811 22.5409 17.7391L14.6087 18.4727L15.1305 23.5873Z" fill="#FFDA44"/>\n<path d="M14.6087 18.4727L22.5409 17.7391H14.6087V18.4727Z" fill="#FFDA44"/>\n<path d="M9.39131 17.7391H1.45908L9.39131 18.4727V17.7391Z" fill="#FFDA44"/>\n<path d="M12 0C10.9169 0 9.86769 0.144375 8.86954 0.413391V23.5867C9.86769 23.8556 10.9169 24 12 24C13.0831 24 14.1323 23.8556 15.1304 23.5866V0.413391C14.1323 0.144375 13.0831 0 12 0V0Z" fill="#D80027"/>\n<path d="M6.4546 2.60864L6.77832 3.60506H7.82611L6.97852 4.22091L7.30228 5.21733L6.4546 4.60153L5.60696 5.21733L5.93082 4.22091L5.08322 3.60506H6.13092L6.4546 2.60864Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6272">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagCentralAfricanRepublic = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagCentralAfricanRepublic(props, ref) {
    return <SvgIcon title="Central African Republic" {...props} ref={ref} svg={svg} />
  }
)

FlagCentralAfricanRepublic.displayName = 'FlagCentralAfricanRepublic'
