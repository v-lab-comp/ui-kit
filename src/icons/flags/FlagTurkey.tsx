import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6098)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#D80027"/>\n<path d="M14.5086 9.80554L15.4932 11.1623L17.0877 10.6453L16.1016 12.0009L17.0861 13.3577L15.4921 12.8387L14.506 14.1943L14.507 12.518L12.913 11.999L14.5076 11.482L14.5086 9.80554Z" fill="#F0F0F0"/>\n<path d="M11.8216 15.3913C9.94868 15.3913 8.43031 13.8729 8.43031 12C8.43031 10.127 9.94868 8.60867 11.8216 8.60867C12.4056 8.60867 12.9551 8.75638 13.4348 9.0163C12.6822 8.28027 11.653 7.82605 10.5173 7.82605C8.21206 7.82605 6.34338 9.69477 6.34338 11.9999C6.34338 14.3051 8.2121 16.1738 10.5173 16.1738C11.6531 16.1738 12.6822 15.7196 13.4348 14.9836C12.9551 15.2436 12.4056 15.3913 11.8216 15.3913Z" fill="#F0F0F0"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6098">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagTurkey(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Turkey" />
}
