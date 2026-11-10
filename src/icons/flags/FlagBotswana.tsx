import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_5916)">\n<path d="M0.566625 8.34777C0.199031 9.49944 -4.68667e-05 10.7263 8.276e-09 11.9999C-4.68667e-05 13.2735 0.199031 14.5004 0.566672 15.6521L12 16.1739L23.4333 15.6521C23.8008 14.5004 24 13.2734 24 12C24 10.7264 23.8009 9.49944 23.4333 8.34777L12 7.82605L0.566625 8.34777Z" fill="#F0F0F0"/>\n<path d="M24 12C24 11.2881 23.9377 10.5908 23.8187 9.91296H0.181313C0.0623437 10.5908 0 11.288 0 11.9999C0 12.7119 0.0623906 13.4091 0.181313 14.0869H23.8187C23.9376 13.409 24 12.7118 24 12Z" fill="black"/>\n<path d="M12 23.9999C17.3539 23.9999 21.8881 20.4935 23.4333 15.652H0.56665C2.11188 20.4934 6.64615 23.9998 12 23.9999Z" fill="#338AF3"/>\n<path d="M12 1.87984e-09C6.6462 1.87984e-09 2.11198 3.50639 0.56665 8.34773L23.4332 8.34778C21.8881 3.50639 17.3538 -9.37481e-05 12 1.87984e-09Z" fill="#338AF3"/>\n</g>\n<defs>\n<clipPath id="clip0_253_5916">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagBotswana(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="Botswana" />
}
