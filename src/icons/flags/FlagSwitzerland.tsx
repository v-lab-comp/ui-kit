import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6322)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#D80027"/>\n<path d="M18.2609 9.91307H14.087V5.73914H9.91303V9.91307H5.73914V14.087H9.91303V18.2609H14.087V14.087H18.2609V9.91307Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6322">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagSwitzerland = forwardRef<HTMLSpanElement, FlagProps>(
  function FlagSwitzerland(props, ref) {
    return <SvgIcon title="Switzerland" {...props} ref={ref} svg={svg} />
  }
)

FlagSwitzerland.displayName = 'FlagSwitzerland'
