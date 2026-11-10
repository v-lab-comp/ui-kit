import type { ReactNode } from 'react'

const HEADER_CELL_STYLE = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#525252',
} as const

/** Заголовок страницы токенов: h1 + вводный абзац. */
export function TokenPageTitle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1
        style={{
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: 700,
          color: '#171717',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#5C5C5C', lineHeight: 1.5 }}>
        {children}
      </p>
    </>
  )
}

/** Таблица токенов в рамке: шапка из `columns`, строки — `children` (`<tr>`). */
export function TokenTable({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid #EBEBEB',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #EBEBEB', backgroundColor: '#F5F5F5' }}>
            {columns.map((column) => (
              <th key={column} style={HEADER_CELL_STYLE}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
