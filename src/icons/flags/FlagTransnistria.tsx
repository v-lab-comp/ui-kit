import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5640)">\n<path d="M23.5866 8.86955C22.2096 3.76036 17.5443 0 12 0C6.45567 0 1.79039 3.76036 0.413391 8.86955L12 9.39131L23.5866 8.86955Z" fill="#A2001D"/>\n<path d="M0.413391 15.1304C1.79039 20.2395 6.45567 24 12 24C17.5443 24 22.2096 20.2396 23.5866 15.1304L12 14.6086L0.413391 15.1304Z" fill="#A2001D"/>\n<path d="M23.5866 8.86951H0.413391C0.144375 9.86762 0 10.9168 0 12C0 13.0831 0.144375 14.1323 0.413391 15.1304H23.5867C23.8556 14.1323 24 13.0831 24 12C24 10.9168 23.8556 9.86762 23.5866 8.86951Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5640">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagTransnistria = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagTransnistria(props, ref) {
    return <SvgIcon title="Transnistria" {...props} ref={ref} svg={svg} />
  }
)

FlagTransnistria.displayName = 'FlagTransnistria'
