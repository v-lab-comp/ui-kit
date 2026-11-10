import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Tabs } from '@/components/Tabs'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function TabsDocsDemo() {
  const [active, setActive] = useState('tab2')

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 480 }}>
      <section style={{ marginBottom: 28 }}>
        <p style={label}>По умолчанию</p>
        <Tabs defaultValue="tab1">
          <Tabs.Tab value="tab1">Вкладка 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Вкладка 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Вкладка 3</Tabs.Tab>
          <Tabs.Panel value="tab1">Содержимое первой вкладки.</Tabs.Panel>
          <Tabs.Panel value="tab2">Содержимое второй вкладки.</Tabs.Panel>
          <Tabs.Panel value="tab3">Содержимое третьей вкладки.</Tabs.Panel>
        </Tabs>
      </section>
      <section>
        <p style={label}>Управляемый</p>
        <Tabs value={active} onChange={setActive}>
          <Tabs.Tab value="tab1">Первый</Tabs.Tab>
          <Tabs.Tab value="tab2">Второй</Tabs.Tab>
          <Tabs.Tab value="tab3">Третий</Tabs.Tab>
          <Tabs.Panel value="tab1">Панель 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Панель 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Панель 3</Tabs.Panel>
        </Tabs>
      </section>
    </div>
  )
}
