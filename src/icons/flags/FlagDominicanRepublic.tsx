import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6807)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M0.413391 15.1305C1.52142 19.2416 4.75847 22.4787 8.86959 23.5867V15.1305H0.413391Z" fill="#D80027"/>\n<path d="M8.86955 0.41333C4.75847 1.52131 1.52138 4.75841 0.413391 8.86949H8.86959V0.41333H8.86955Z" fill="#0052B4"/>\n<path d="M23.5866 8.86949C22.4786 4.75841 19.2415 1.52131 15.1305 0.41333V8.86953H23.5866V8.86949Z" fill="#D80027"/>\n<path d="M15.1305 23.5866C19.2415 22.4785 22.4786 19.2415 23.5867 15.1304H15.1305V23.5866Z" fill="#0052B4"/>\n<path d="M15.1304 12C15.1304 13.7289 13.7289 15.1304 12 15.1304C10.2711 15.1304 8.86954 13.7289 8.86954 12C8.86954 10.271 12 8.86951 12 8.86951C12 8.86951 15.1304 10.271 15.1304 12Z" fill="#496E2D"/>\n<path d="M8.86954 12C8.86954 10.271 10.2711 8.86951 12 8.86951C13.7289 8.86951 15.1304 10.271 15.1304 12" fill="#0052B4"/>\n<path d="M10.2391 10.4348V12.3913C10.2391 13.3638 11.0275 14.1522 12 14.1522C12.9725 14.1522 13.7609 13.3638 13.7609 12.3913V10.4348H10.2391Z" fill="#D80027"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6807">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagDominicanRepublic = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagDominicanRepublic(props, ref) {
    return <SvgIcon title="Dominican Republic" {...props} ref={ref} svg={svg} />
  }
)

FlagDominicanRepublic.displayName = 'FlagDominicanRepublic'
