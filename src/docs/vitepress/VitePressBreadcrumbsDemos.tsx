import type { CSSProperties } from 'react'
import { RiHome5Line } from '@remixicon/react'
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/Breadcrumb'

const icon = <RiHome5Line size={20} />

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

function Trail() {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" icon={icon}>
          Раздел
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" icon={icon}>
          Подраздел
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage icon={icon}>Текущая страница</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  )
}

export function BreadcrumbsDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 720 }}>
      <section style={{ marginBottom: 20 }}>
        <p style={label}>Chevron</p>
        <Breadcrumbs separator="chevron">
          <Trail />
        </Breadcrumbs>
      </section>
      <section>
        <p style={label}>Slash</p>
        <Breadcrumbs separator="slash">
          <Trail />
        </Breadcrumbs>
      </section>
    </div>
  )
}
