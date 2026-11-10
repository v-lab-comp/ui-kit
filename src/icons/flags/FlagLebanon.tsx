import { forwardRef } from 'react'
import { SvgIcon, type FlagProps } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6877)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C7.24242 0 3.13167 2.76867 1.19067 6.78263H22.8092C20.8682 2.76867 16.7574 0 12 0Z" fill="#D80027"/>\n<path d="M12 24C16.7574 24 20.8682 21.2314 22.8092 17.2174H1.19067C3.13167 21.2314 7.24242 24 12 24Z" fill="#D80027"/>\n<path d="M15.1304 14.0869L12 8.34778L8.86951 14.0869H11.2173V15.6521H12.7826V14.0869H15.1304Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6877">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export const FlagLebanon = forwardRef<HTMLSpanElement, FlagProps>(function FlagLebanon(props, ref) {
  return <SvgIcon title="Lebanon" {...props} ref={ref} svg={svg} />
})

FlagLebanon.displayName = 'FlagLebanon'
