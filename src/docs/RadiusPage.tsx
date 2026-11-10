import { TokenPageTitle, TokenTable } from './TokenTable'

const RADIUS_TOKENS = [
  { name: 'radius-0', pixels: '0px' },
  { name: 'radius-2', pixels: '2px' },
  { name: 'radius-4', pixels: '4px' },
  { name: 'radius-6', pixels: '6px' },
  { name: 'radius-8', pixels: '8px' },
  { name: 'radius-10', pixels: '10px' },
  { name: 'radius-12', pixels: '12px' },
  { name: 'radius-16', pixels: '16px' },
  { name: 'radius-20', pixels: '20px' },
  { name: 'radius-24', pixels: '24px' },
  { name: 'radius-28', pixels: '28px' },
  { name: 'radius-full', pixels: '999px' },
]

export function RadiusPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        padding: '40px 24px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <TokenPageTitle title="Radius">
          Переменные скругления углов. Использование: <code>border-radius: var(--radius-8);</code>
        </TokenPageTitle>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[4, 6, 8, 10, 12, 16, 20, 24].map((n) => (
            <div
              key={n}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-8)',
                border: '1px solid #EBEBEB',
                background: '#FAFAFA',
                fontSize: '13px',
                fontWeight: 500,
                color: '#171717',
              }}
            >
              radius-{n} {n}px
            </div>
          ))}
        </div>

        <TokenTable columns={['NAME', 'PIXELS', 'CORNER']}>
          {RADIUS_TOKENS.map(({ name, pixels }) => (
            <tr key={name} style={{ borderBottom: '1px solid #EBEBEB' }}>
              <td style={{ padding: '12px 16px', fontWeight: 500, color: '#171717' }}>{name}</td>
              <td style={{ padding: '12px 16px', color: '#525252' }}>{pixels}</td>
              <td style={{ padding: '12px 16px' }}>
                <div
                  style={{
                    width: 64,
                    height: 40,
                    background: '#FFC0DF',
                    borderRadius: `var(--${name})`,
                  }}
                />
              </td>
            </tr>
          ))}
        </TokenTable>
      </div>
    </div>
  )
}
