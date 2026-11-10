import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6678)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 8.86959H23.5866C23.2857 7.75331 22.8284 6.70139 22.2387 5.73914H12V8.86959Z" fill="#338AF3"/>\n<path d="M4.53015 21.3913H19.4698C20.565 20.5191 21.5042 19.4596 22.2387 18.2609H1.76129C2.49587 19.4596 3.43506 20.5191 4.53015 21.3913Z" fill="#338AF3"/>\n<path d="M12 0V2.60869H19.4699C17.42 0.976125 14.8242 0 12 0Z" fill="#338AF3"/>\n<path d="M12 8.86959H23.5866C23.2857 7.75331 22.8284 6.70139 22.2387 5.73914H12V8.86959Z" fill="#338AF3"/>\n<path d="M0 12C0 13.0831 0.144375 14.1323 0.413391 15.1305H23.5867C23.8556 14.1323 24 13.0831 24 12H0Z" fill="#338AF3"/>\n<path d="M10.4348 7.02281L8.96922 7.7122L9.74964 9.13157L8.15824 8.82716L7.95658 10.4347L6.84818 9.25237L5.73968 10.4347L5.53807 8.82716L3.94666 9.13148L4.72704 7.71215L3.26154 7.02281L4.72708 6.33351L3.94666 4.91413L5.53802 5.21854L5.73972 3.61096L6.84818 4.79334L7.95663 3.61096L8.15824 5.21854L9.74969 4.91413L8.96927 6.33356L10.4348 7.02281Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6678">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagUruguay = forwardRef<HTMLSpanElement, FlagProps>(function FlagUruguay(props, ref) {
  return <SvgIcon title="Uruguay" {...props} ref={ref} svg={svg} />
})

FlagUruguay.displayName = 'FlagUruguay'
