import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6671)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C6.84043 0 2.44191 3.2565 0.746399 7.82611H23.2537C21.5581 3.2565 17.1596 0 12 0Z" fill="#D80027"/>\n<path d="M12 24.0001C17.1596 24.0001 21.5581 20.7436 23.2536 16.174H0.746399C2.44191 20.7436 6.84043 24.0001 12 24.0001Z" fill="black"/>\n<path d="M7.17012 9.13049L7.81761 11.1232H9.91306L8.21783 12.355L8.86536 14.3479L7.17012 13.1162L5.47489 14.3479L6.12242 12.355L4.42719 11.1232H6.52264L7.17012 9.13049Z" fill="#6DA544"/>\n<path d="M16.8299 9.13049L17.4774 11.1232H19.5729L17.8776 12.355L18.5251 14.3479L16.8299 13.1162L15.1347 14.3479L15.7822 12.355L14.087 11.1232H16.1824L16.8299 9.13049Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6671">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagSyria = forwardRef<HTMLSpanElement, FlagProps>(function FlagSyria(props, ref) {
  return <SvgIcon title="Syria" {...props} ref={ref} svg={svg} />
})

FlagSyria.displayName = 'FlagSyria'
