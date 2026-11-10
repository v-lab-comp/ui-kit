import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6129)">\n<path d="M0 12C0 12.8219 0.082875 13.6245 0.240328 14.4L12 15.1304L23.7597 14.4C23.9172 13.6245 24 12.8219 24 12C24 11.178 23.9171 10.3754 23.7597 9.59996L12 8.86951L0.240328 9.59996C0.082875 10.3754 0 11.178 0 12H0Z" fill="#0052B4"/>\n<path d="M23.7597 14.4H0.240356C1.35218 19.8774 6.19461 24 12 24C17.8055 24 22.6479 19.8774 23.7597 14.4Z" fill="#F0F0F0"/>\n<path d="M0.240356 9.6H23.7598C22.6479 4.12266 17.8055 0 12 0C6.19451 0 1.35218 4.12266 0.240356 9.6Z" fill="black"/>\n<path d="M17.2173 9.59998H6.78259L8.91447 8.59714L7.7792 6.53253L10.0941 6.97527L10.3876 4.63672L12 6.35675L13.6125 4.63672L13.9057 6.97527L16.2207 6.53253L15.0856 8.59723L17.2173 9.59998Z" fill="#FFDA44"/>\n<path d="M0 12C0 18.6274 5.37262 24 12 24L2.39981 4.79956C0.893062 6.80529 0 9.29825 0 12Z" fill="#A2001D"/>\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 9.29825 23.1069 6.80529 21.6002 4.79956L12 24Z" fill="#A2001D"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6129">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagAntiguaandBarbuda(
  props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>
) {
  return <SvgIcon {...props} svg={svg} title="Antigua and Barbuda" />
}
