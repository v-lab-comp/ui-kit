import type { ReactNode } from 'react'
import { contractPart } from '@/theme/contract'
import { checkboxLabelRowContract } from '@/theme/contracts/checkbox-label-row'

interface CheckboxLabelRowProps {
  label?: ReactNode
  sublabel?: ReactNode
  tag?: ReactNode
  /** id чекбокса: строка рендерится как `<label for>` и становится его доступным именем */
  htmlFor?: string
  id?: string
}

export function CheckboxLabelRow({ label, sublabel, tag, htmlFor, id }: CheckboxLabelRowProps) {
  if (!label && !sublabel && !tag) return null
  const Root = htmlFor ? 'label' : 'span'

  return (
    <Root id={id} className={checkboxLabelRowContract.className} htmlFor={htmlFor}>
      {label && (
        <span className={contractPart(checkboxLabelRowContract, 'label-text')}>{label}</span>
      )}
      {sublabel && (
        <span className={contractPart(checkboxLabelRowContract, 'sublabel-text')}>{sublabel}</span>
      )}
      {tag && <span className={contractPart(checkboxLabelRowContract, 'tag-wrapper')}>{tag}</span>}
    </Root>
  )
}
