import type { Meta, StoryObj } from '@storybook/react'
import { RiHome5Line } from '@remixicon/react'
import { Breadcrumbs } from './Breadcrumbs'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from './BreadcrumbItem'
import { BREADCRUMBS_SEPARATOR_OPTIONS } from './Breadcrumbs.types'

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Components/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    separator: {
      control: 'select',
      options: [...BREADCRUMBS_SEPARATOR_OPTIONS],
    },
  },
}

export default meta

type Story = StoryObj<typeof Breadcrumbs>

const icon = <RiHome5Line size={20} />

export const Playground: Story = {
  name: 'Playground',
  args: { separator: 'chevron' },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" icon={icon}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Section</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Current page</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
}

const sampleItems = (
  <>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon={icon}>
        Breadcrumb
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon={icon}>
        Breadcrumb
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon={icon}>
        Breadcrumb
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" icon={icon}>
        Breadcrumb
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbPage icon={icon}>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </>
)

export const Chevron: Story = {
  name: 'Separator: Chevron (>)',
  args: { separator: 'chevron' },
  render: (args) => <Breadcrumbs {...args}>{sampleItems}</Breadcrumbs>,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { RiHome5Line } from '@remixicon/react'
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/Breadcrumb'

const icon = <RiHome5Line size={20} />

<Breadcrumbs separator="chevron">
  <BreadcrumbItem>
    <BreadcrumbLink href="/home" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/section" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage icon={icon}>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>`,
      },
    },
  },
}

export const Slash: Story = {
  name: 'Separator: Slash (/)',
  args: { separator: 'slash' },
  render: (args) => <Breadcrumbs {...args}>{sampleItems}</Breadcrumbs>,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<Breadcrumbs separator="slash">
  <BreadcrumbItem>
    <BreadcrumbLink href="/home" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/section" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage icon={icon}>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>`,
      },
    },
  },
}

export const Dot: Story = {
  name: 'Separator: Dot (•)',
  args: { separator: 'dot' },
  render: (args) => <Breadcrumbs {...args}>{sampleItems}</Breadcrumbs>,
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<Breadcrumbs separator="dot">
  <BreadcrumbItem>
    <BreadcrumbLink href="/home" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/section" icon={icon}>Breadcrumb</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage icon={icon}>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>`,
      },
    },
  },
}

// Пример совместимости с роутерами (симулируем Link компонент)
const MockRouterLink = ({
  to,
  children,
  ...props
}: {
  to: string
  children: React.ReactNode
  [k: string]: unknown
}) => (
  <a href={String(to)} {...props}>
    {children}
  </a>
)

export const WithRouterLink: Story = {
  name: 'С роутером (as prop)',
  render: () => (
    <Breadcrumbs separator="chevron">
      <BreadcrumbItem>
        <BreadcrumbLink as={MockRouterLink} to="/home" icon={icon}>
          Главная
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={MockRouterLink} to="/settings" icon={icon}>
          Настройки
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage icon={icon}>Профиль</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `// React Router DOM
import { Link } from 'react-router-dom'

<Breadcrumbs separator="chevron">
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/home" icon={icon}>Главная</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/settings" icon={icon}>Настройки</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage icon={icon}>Профиль</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>

// Next.js
import NextLink from 'next/link'

<Breadcrumbs separator="chevron">
  <BreadcrumbItem>
    <BreadcrumbLink as={NextLink} href="/home" icon={icon}>Главная</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage icon={icon}>Профиль</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>`,
      },
    },
  },
}

export const AllSeparators: Story = {
  name: 'Все разделители',
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `// separator: 'chevron' | 'slash' | 'dot'
<Breadcrumbs separator="chevron">{/* ... */}</Breadcrumbs>
<Breadcrumbs separator="slash">{/* ... */}</Breadcrumbs>
<Breadcrumbs separator="dot">{/* ... */}</Breadcrumbs>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {BREADCRUMBS_SEPARATOR_OPTIONS.map((sep) => (
        <Breadcrumbs key={sep} separator={sep}>
          {sampleItems}
        </Breadcrumbs>
      ))}
    </div>
  ),
}
