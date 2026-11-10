import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './Header'
import { PageHeaderDemoContent } from './HeaderDemoContent'
import { contractPart } from '@/theme/contract'
import { pageHeaderContract } from '@/theme/contracts/page-header'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  title: 'Layout/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof PageHeader>

/** Плейсхолдер: в проекте сюда передаётся свой контент. */
export const Default: Story = {
  args: {
    children: 'В проекте сюда прокидывается свой контент (breadcrumbs, поиск, профиль и т.д.)',
  },
}

/** Заголовок и описание страницы — по Figma 3829-27890 (Label/Large + Paragraph/Small). */
export const WithTitle: Story = {
  render: () => (
    <PageHeader>
      <div className={contractPart(pageHeaderContract, 'title-block')}>
        <h1 className={contractPart(pageHeaderContract, 'title')}>Insert page title here</h1>
        <p className={contractPart(pageHeaderContract, 'description')}>
          Insert page description here.
        </p>
      </div>
    </PageHeader>
  ),
}

/** Только заголовок. */
export const TitleOnly: Story = {
  render: () => (
    <PageHeader>
      <h1 className={contractPart(pageHeaderContract, 'title')} style={{ margin: 0 }}>
        Page Title
      </h1>
    </PageHeader>
  ),
}

/** Как в Figma 3829-27890: заголовок, описание, поиск, уведомления (с точкой), кнопки Schedule и Create Request. */
export const AsInFigma: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderDemoContent />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Полный пример по макету Figma 3829-27890: блок заголовка слева, справа — иконки поиска и уведомлений (с индикатором), вторичная кнопка Schedule и основная Create Request.',
      },
    },
  },
}
