import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_4773)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C7.24247 0 3.13172 2.76867 1.19072 6.78263H22.8092C20.8683 2.76867 16.7575 0 12 0Z" fill="#D80027"/>\n<path d="M12 24C16.7575 24 20.8683 21.2313 22.8093 17.2173H1.19072C3.13172 21.2313 7.24247 24 12 24Z" fill="#0052B4"/>\n<path d="M14.9514 8.52692L13.8446 9.63368C14.3167 10.1058 14.6087 10.7579 14.6087 11.4783C14.6087 12.9191 13.4408 14.087 12 14.087C10.5593 14.087 9.39136 12.919 9.39136 11.4783C9.39136 10.7579 9.68339 10.1058 10.1555 9.63368L9.0487 8.52692C8.29331 9.28217 7.82616 10.3257 7.82616 11.4783C7.82616 13.7835 9.69488 15.6522 12 15.6522C14.3052 15.6522 16.1739 13.7835 16.1739 11.4783C16.1739 10.3257 15.7067 9.28217 14.9514 8.52692Z" fill="#6DA544"/>\n<path d="M12 9.91302L12.3885 11.1088H13.6458L12.6286 11.8477L13.0172 13.0435L12 12.3045L10.9828 13.0435L11.3714 11.8477L10.3542 11.1088H11.6115L12 9.91302Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_4773">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagParaguay = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagParaguay(props, ref) {
    return <SvgIcon title="Paraguay" {...props} ref={ref} svg={svg} />
  }
)

FlagParaguay.displayName = 'FlagParaguay'
