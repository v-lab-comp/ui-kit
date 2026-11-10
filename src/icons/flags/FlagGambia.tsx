import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5627)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C7.03897 0 2.78141 3.01059 0.953796 7.30434H23.0462C21.2186 3.01059 16.961 0 12 0Z" fill="#A2001D"/>\n<path d="M12 24C16.961 24 21.2186 20.9894 23.0462 16.6957H0.953796C2.78141 20.9894 7.03897 24 12 24Z" fill="#496E2D"/>\n<path d="M23.5866 8.86951H0.413391C0.144375 9.86762 0 10.9168 0 12C0 13.0831 0.144375 14.1323 0.413391 15.1304H23.5867C23.8556 14.1323 24 13.0831 24 12C24 10.9168 23.8556 9.86762 23.5866 8.86951Z" fill="#0052B4"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5627">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagGambia(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Gambia" />
}
