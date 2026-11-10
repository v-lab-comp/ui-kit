import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@/components/Button'
import { CheckboxField } from '@/components/inputs/Checkbox'
import {
  ModalFooter,
  ModalFooterConfirmActions,
  ModalFooterInfo,
  ModalFooterLinkButton,
  ModalFooterStepDots,
  ModalFooterSwitch,
} from './index'

const meta: Meta<typeof ModalFooter> = {
  component: ModalFooter,
  title: 'Overlays/ModalFooter',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**ModalFooter** — слот слева (`startContent`) + произвольные кнопки в `children`. Для классической пары «отмена / действие» используй **ModalFooterConfirmActions**.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ModalFooter>

export const Basic: Story = {
  name: 'Базовый footer',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter>
        <ModalFooterConfirmActions onCancel={fn()} onConfirm={fn()} />
      </ModalFooter>
    </div>
  ),
}

export const ThreeButtons: Story = {
  name: 'Три кнопки',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter>
        <Button type="button" variant="ghost" color="neutral" size="small" onClick={fn()}>
          Назад
        </Button>
        <Button type="button" variant="stroke" color="neutral" size="small" onClick={fn()}>
          Отмена
        </Button>
        <Button type="button" color="primary" size="small" onClick={fn()}>
          Сохранить
        </Button>
      </ModalFooter>
    </div>
  ),
}

export const WithCheckbox: Story = {
  name: 'С чекбоксом слева',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter startContent={<CheckboxField label="Don't show again" size="small" />}>
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const WithInfo: Story = {
  name: 'С информацией слева',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter startContent={<ModalFooterInfo>Read before proceeding.</ModalFooterInfo>}>
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const WithSwitch: Story = {
  name: 'С переключателем слева',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter
        startContent={<ModalFooterSwitch label="Remain anonymous" defaultChecked={false} />}
      >
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const WithStepDots: Story = {
  name: 'С точками шагов',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter startContent={<ModalFooterStepDots total={3} activeIndex={0} />}>
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const WithLink: Story = {
  name: 'Со ссылкой слева',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter
        startContent={<ModalFooterLinkButton onClick={() => {}}>Link Button</ModalFooterLinkButton>}
      >
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const FullWidth: Story = {
  name: 'Полноширина кнопок',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter fullWidth>
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const FullWidthWithCheckbox: Story = {
  name: 'Полноширина + контент слева',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter
        fullWidth
        startContent={<CheckboxField label="Remember my choice" size="small" />}
      >
        <ModalFooterConfirmActions onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}

export const ErrorColor: Story = {
  name: 'Красная кнопка (delete)',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter>
        <ModalFooterConfirmActions
          confirmColor="error"
          confirmText="Delete"
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      </ModalFooter>
    </div>
  ),
}

export const SuccessColor: Story = {
  name: 'Зелёная кнопка (approve)',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter>
        <ModalFooterConfirmActions
          confirmColor="success"
          confirmText="Approve"
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      </ModalFooter>
    </div>
  ),
}

export const Loading: Story = {
  name: 'Состояние загрузки',
  render: function LoadingRender() {
    const [loading, setLoading] = useState(false)

    const handleConfirm = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
        <ModalFooter>
          <ModalFooterConfirmActions
            loading={loading}
            confirmText="Save"
            onCancel={() => {}}
            onConfirm={handleConfirm}
          />
        </ModalFooter>
      </div>
    )
  },
}

export const Disabled: Story = {
  name: 'Отключены',
  render: () => (
    <div style={{ width: 500, border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <ModalFooter>
        <ModalFooterConfirmActions disabled onCancel={() => {}} onConfirm={() => {}} />
      </ModalFooter>
    </div>
  ),
}
