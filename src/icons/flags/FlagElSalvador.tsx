import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_6826)">\n<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F0F0"/>\n<path d="M12 0C7.24248 0 3.13173 2.76867 1.19073 6.78263H22.8092C20.8683 2.76867 16.7575 0 12 0Z" fill="#0052B4"/>\n<path d="M12 24C16.7575 24 20.8683 21.2314 22.8093 17.2174H1.19073C3.13173 21.2314 7.24248 24 12 24Z" fill="#0052B4"/>\n<path d="M9.59015 12.5217L12 8.34778L14.4098 12.5217H9.59015Z" fill="#FFDA44"/>\n<path d="M15.1305 13.8999L12 15.4652L8.86957 13.8999V11.813H15.1305V13.8999Z" fill="#6DA544"/>\n<path d="M14.9514 8.52686L13.8446 9.63362C14.3167 10.1057 14.6088 10.7579 14.6088 11.4782C14.6088 12.919 13.4408 14.0869 12.0001 14.0869C10.5594 14.0869 9.39138 12.9189 9.39138 11.4782C9.39138 10.7579 9.68341 10.1057 10.1555 9.63362L9.04872 8.52686C8.29333 9.28211 7.82617 10.3256 7.82617 11.4782C7.82617 13.7835 9.69489 15.6521 12.0001 15.6521C14.3052 15.6521 16.174 13.7834 16.174 11.4782C16.1739 10.3256 15.7068 9.28211 14.9514 8.52686Z" fill="#FFDA44"/>\n</g>\n<defs>\n<clipPath id="clip0_253_6826">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagElSalvador(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="El Salvador" />
}
