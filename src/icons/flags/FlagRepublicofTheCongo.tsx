import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_253_4911)">\n<path d="M6.50492 22.6708L15.3205 15.3204L22.6708 6.50491C21.528 4.29016 19.7159 2.47709 17.5021 1.33282L8.67954 8.67958L1.33289 17.502C2.47706 19.7159 4.29013 21.528 6.50492 22.6708Z" fill="#FFDA44"/>\n<path d="M20.4856 20.4856C24.2715 16.6997 24.9983 11.0139 22.6675 6.49768L6.49768 22.6675C11.0139 24.9983 16.6997 24.2715 20.4856 20.4856Z" fill="#D80027"/>\n<path d="M3.51436 3.51436C-0.271537 7.30026 -0.998285 12.9861 1.33248 17.5023L17.5023 1.33252C12.9861 -0.998335 7.30026 -0.271493 3.51436 3.51436Z" fill="#6DA544"/>\n</g>\n<defs>\n<clipPath id="clip0_253_4911">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>\n'

export function FlagRepublicofTheCongo(
  props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>
) {
  return <SvgIcon {...props} svg={svg} title="Republic of The Congo" />
}
