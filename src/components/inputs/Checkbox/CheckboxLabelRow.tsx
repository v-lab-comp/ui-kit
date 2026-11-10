import type { ReactNode } from 'react'
import { contractPart } from '@/theme/contract'
import { checkboxLabelRowContract } from '@/theme/contracts/checkbox-label-row'

interface CheckboxLabelRowProps {
  label?: ReactNode
  sublabel?: ReactNode
  tag?: ReactNode
}

export function CheckboxLabelRow({ label, sublabel, tag }: CheckboxLabelRowProps) {
  if (!label && !sublabel && !tag) return null

  return (
    <span className={checkboxLabelRowContract.className}>
      {label && (
        <span className={contractPart(checkboxLabelRowContract, 'label-text')}>{label}</span>
      )}
      {sublabel && (
        <span className={contractPart(checkboxLabelRowContract, 'sublabel-text')}>{sublabel}</span>
      )}
      {tag && <span className={contractPart(checkboxLabelRowContract, 'tag-wrapper')}>{tag}</span>}
    </span>
  )
}
