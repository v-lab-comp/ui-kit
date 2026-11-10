import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6713)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#338AF3"/>\n<path d="M18.7826 12.1305H5.21735C5.21735 13.067 6.03302 13.8261 6.96944 13.8261H6.913C6.913 14.7627 7.67214 15.5218 8.60866 15.5218C8.60866 16.4583 9.3678 17.2175 10.3043 17.2175H13.6956C14.6321 17.2175 15.3913 16.4583 15.3913 15.5218C16.3278 15.5218 17.0869 14.7627 17.0869 13.8261H17.0305C17.9668 13.8261 18.7826 13.067 18.7826 12.1305Z" fill="#FFDA44"/>\n<path d="M16.6956 9.91309C16.6956 12.5064 14.5933 14.6087 12 14.6087C9.40662 14.6087 7.30432 12.5064 7.30432 9.91309" fill="#338AF3"/>\n<path d="M15.5866 9.91299L14.1211 10.6024L14.9015 12.0218L13.3101 11.7173L13.1084 13.3249L12 12.1425L10.8915 13.3249L10.6899 11.7173L9.09845 12.0217L9.87883 10.6023L8.41333 9.91299L9.87888 9.22365L9.09845 7.80432L10.6898 8.10872L10.8915 6.5011L12 7.68352L13.1085 6.5011L13.3101 8.10872L14.9015 7.80432L14.1211 9.22369L15.5866 9.91299Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6713">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagKazakhstan = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagKazakhstan(props, ref) {
    return <SvgIcon title="Kazakhstan" {...props} ref={ref} svg={svg} />
  }
)

FlagKazakhstan.displayName = 'FlagKazakhstan'
