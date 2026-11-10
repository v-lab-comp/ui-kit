import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6768)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FFDA44"/>\n<path d="M19.3058 2.48062C17.2823 0.925266 14.7494 0 12 0C9.2506 0 6.71767 0.925312 4.69421 2.48062L12 9.78638L19.3058 2.48062Z" fill="#6DA544"/>\n<path d="M2.48058 4.69421C0.925312 6.71767 0 9.25056 0 12C0 14.7494 0.925312 17.2823 2.48062 19.3058L9.78642 12L2.48058 4.69421Z" fill="black"/>\n<path d="M4.69421 21.5194C6.71771 23.0747 9.2506 24 12 24C14.7494 24 17.2823 23.0747 19.3058 21.5194L12 14.2136L4.69421 21.5194Z" fill="#6DA544"/>\n<path d="M21.5194 19.3057C23.0747 17.2823 24 14.7494 24 12C24 9.25056 23.0747 6.71767 21.5194 4.69421L14.2136 12L21.5194 19.3057Z" fill="black"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6768">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagJamaica = forwardRef<HTMLSpanElement, FlagProps>(function FlagJamaica(props, ref) {
  return <SvgIcon title="Jamaica" {...props} ref={ref} svg={svg} />
})

FlagJamaica.displayName = 'FlagJamaica'
