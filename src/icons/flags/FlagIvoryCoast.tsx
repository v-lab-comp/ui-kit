import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_4875)">\n<path d="M12 24C13.4678 24 14.8739 23.736 16.1739 23.2536L16.6956 12L16.1739 0.746391C14.8739 0.264047 13.4678 0 12 0C10.5321 0 9.12602 0.264047 7.82609 0.746391L7.30432 12L7.82604 23.2536C9.12602 23.736 10.5321 24 12 24Z" fill="#F0F0F0"/>\n<path d="M0 12C0 17.1596 3.2565 21.5581 7.82611 23.2536V0.746399C3.2565 2.44191 0 6.84043 0 12Z" fill="#FF9811"/>\n<path d="M16.174 0.746399V23.2537C20.7436 21.5581 24.0001 17.1596 24.0001 12C24.0001 6.84043 20.7436 2.44191 16.174 0.746399Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_4875">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagIvoryCoast = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagIvoryCoast(props, ref) {
    return <SvgIcon title="Ivory Coast" {...props} ref={ref} svg={svg} />
  }
)

FlagIvoryCoast.displayName = 'FlagIvoryCoast'
