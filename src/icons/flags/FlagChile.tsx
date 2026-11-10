import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6577)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M24 11.9999C24 18.6273 18.6274 23.9999 12 23.9999C5.37262 23.9999 0 18.6273 0 11.9999C0 5.37257 12 11.9999 12 11.9999C12 11.9999 21.0825 11.9999 24 11.9999Z" fill="#D80027"/>\n<path d="M0 12C0 5.37262 5.37262 0 12 0V12C12 12 4.17389 12 0 12Z" fill="#0052B4"/>\n<path d="M7.14325 4.17395L7.92029 6.56542H10.4348L8.40053 8.04339L9.17753 10.4349L7.14325 8.95684L5.10897 10.4349L5.88597 8.04339L3.85168 6.56542H6.3662L7.14325 4.17395Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6577">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagChile(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Chile" />
}
