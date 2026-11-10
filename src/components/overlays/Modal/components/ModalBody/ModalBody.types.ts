import type { HTMLAttributes, ReactNode } from 'react'
import type { ContractValue } from '@/theme/contract'
import type { modalBodyContract } from '@/theme/contracts/modal-body'

export type ModalBodyAlign = ContractValue<typeof modalBodyContract, 'align'>

export type ModalBodyProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode
  /** Выравнивание контента: слева (по умолчанию) или по центру (статусные модалки и т.п.) */
  align?: ModalBodyAlign
  /** Узкий отступ сверху (под шапку только с крестиком), по умолчанию 20px */
  compactTop?: boolean
}
