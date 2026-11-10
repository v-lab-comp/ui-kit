import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6398)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#D80027"/>\n<path d="M19.0922 9.84846H13.6735L12 4.6969L10.3266 9.84846H4.90784L9.29065 13.0313L7.61721 18.1828L12 15L16.3828 18.1828L14.7094 13.0313L19.0922 9.84846ZM10.5188 12.6328L11.086 10.8891H12.9188L13.486 12.6328L12.0047 13.711L10.5188 12.6328ZM12.5766 9.84846H11.4235L12 8.0719L12.5766 9.84846ZM14.3719 11.9906L14.0156 10.8938H15.8813L14.3719 11.9906ZM9.98909 10.8938L9.63284 11.9906L8.12346 10.8938H9.98909ZM9.60002 15.4547L10.1766 13.6781L11.1094 14.3578L9.60002 15.4547ZM12.886 14.3578L13.8188 13.6781L14.3953 15.4547L12.886 14.3578Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6398">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagMorocco = forwardRef<HTMLSpanElement, FlagProps>(function FlagMorocco(props, ref) {
  return <SvgIcon title="Morocco" {...props} ref={ref} svg={svg} />
})

FlagMorocco.displayName = 'FlagMorocco'
