import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import type { ModalHandle } from '../../Modal.types'
import { ModalFooter, ModalFooterConfirmActions } from '../ModalFooter'
import { ModalStatus } from './ModalStatus'

const meta: Meta<typeof ModalStatus> = {
  component: ModalStatus,
  title: 'Overlays/ModalStatus',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Статусная модалка: иконка в цветном круге и вариант **layout**: слева в шапке (`left`) или по центру в теле (`center`). Опционально `footer` — обычно `ModalFooter`.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ModalStatus>

const SAMPLE_TITLE = 'Заголовок статуса'
const SAMPLE_SUB =
  'Краткое описание ситуации: что произошло и что может сделать пользователь дальше.'

export const LeftAligned: Story = {
  name: 'layout: left (иконка слева)',
  render: function LeftRender() {
    const ref = useRef<ModalHandle>(null)
    return (
      <>
        <Button type="button" onClick={() => ref.current?.open()}>
          Открыть (ошибка)
        </Button>
        <ModalStatus
          ref={ref}
          variant="error"
          layout="left"
          title={SAMPLE_TITLE}
          subtitle={SAMPLE_SUB}
          width={480}
        />
      </>
    )
  },
}

export const CenterAligned: Story = {
  name: 'layout: center (по центру)',
  render: function CenterRender() {
    const ref = useRef<ModalHandle>(null)
    return (
      <>
        <Button type="button" onClick={() => ref.current?.open()}>
          Открыть (успех, центр)
        </Button>
        <ModalStatus
          ref={ref}
          variant="success"
          layout="center"
          title={SAMPLE_TITLE}
          subtitle={SAMPLE_SUB}
          width={480}
        />
      </>
    )
  },
}

export const CenterWithFooter: Story = {
  name: 'center + ModalFooter (как в макете)',
  render: function CenterFooterRender() {
    const ref = useRef<ModalHandle>(null)
    return (
      <>
        <Button type="button" onClick={() => ref.current?.open()}>
          Статус + футер
        </Button>
        <ModalStatus
          ref={ref}
          variant="info"
          layout="center"
          title={SAMPLE_TITLE}
          subtitle={SAMPLE_SUB}
          width={480}
          footer={
            <ModalFooter startContent={<CheckboxField label="Больше не показывать" size="small" />}>
              <ModalFooterConfirmActions
                cancelText="Отмена"
                confirmText="Продолжить"
                onCancel={() => ref.current?.close()}
                onConfirm={() => ref.current?.close()}
              />
            </ModalFooter>
          }
        />
      </>
    )
  },
}

export const VariantsGrid: Story = {
  name: 'Варианты status (left)',
  parameters: { controls: { disable: true } },
  render: function VariantsRender() {
    const variants = ['error', 'warning', 'success', 'info'] as const
    const refE = useRef<ModalHandle>(null)
    const refW = useRef<ModalHandle>(null)
    const refS = useRef<ModalHandle>(null)
    const refI = useRef<ModalHandle>(null)
    const refs = [refE, refW, refS, refI] as const

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {variants.map((v, i) => (
          <span key={v}>
            <Button type="button" size="small" onClick={() => refs[i].current?.open()}>
              {v}
            </Button>
            <ModalStatus
              ref={refs[i]}
              variant={v}
              layout="left"
              title={SAMPLE_TITLE}
              subtitle={SAMPLE_SUB}
              width={440}
            />
          </span>
        ))}
      </div>
    )
  },
}
