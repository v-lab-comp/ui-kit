import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6476)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M6.78262 16.174L7.82611 23.2538C9.12605 23.7362 10.5322 24.0001 12 24.0001C17.1595 24.0001 21.5581 20.7436 23.2536 16.174H6.78262Z" fill="black"/>\n<path d="M6.78262 7.82611L7.82611 0.746297C9.12605 0.263906 10.5322 0 12 0C17.1595 0 21.5581 3.2565 23.2536 7.82611H6.78262Z" fill="#6DA544"/>\n<path d="M0 11.9999C0 17.1595 3.25655 21.558 7.82611 23.2536V0.746338C3.25655 2.44185 0 6.84037 0 11.9999Z" fill="#A2001D"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6476">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagUnitedArabEmirates = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagUnitedArabEmirates(props, ref) {
    return <SvgIcon title="United Arab Emirates" {...props} ref={ref} svg={svg} />
  }
)

FlagUnitedArabEmirates.displayName = 'FlagUnitedArabEmirates'
