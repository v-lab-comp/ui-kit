import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6820)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#496E2D"/>\n<path d="M16.6957 12H12V24C13.4027 24 14.7488 23.7585 16 23.3163L16.6957 12Z" fill="#D80027"/>\n<path d="M19.9999 20.9434C22.4547 18.7462 24 15.5537 24 12H19.3043L19.9999 20.9434Z" fill="#FF9811"/>\n<path d="M16 12V23.3163C17.4905 22.7894 18.8458 21.9766 20 20.9435V12H16Z" fill="black"/>\n<path d="M22.1739 7.82608H19.0434C19.0434 7.2498 18.5762 6.78259 17.9999 6.78259C17.4236 6.78259 16.9564 7.2498 16.9564 7.82608H13.826C13.826 8.40241 14.328 8.86956 14.9042 8.86956H14.8695C14.8695 9.44589 15.3366 9.91305 15.913 9.91305C15.913 10.4894 16.3801 10.9565 16.9564 10.9565H19.0434C19.6197 10.9565 20.0869 10.4894 20.0869 9.91305C20.6632 9.91305 21.1304 9.44589 21.1304 8.86956H21.0956C21.6719 8.86951 22.1739 8.40236 22.1739 7.82608Z" fill="#FF9811"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6820">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagZambia(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Zambia" />
}
