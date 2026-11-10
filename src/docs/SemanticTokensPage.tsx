import {
  semanticLight,
  semanticDark,
  getPrimitiveHex,
  semanticTokenGroups,
} from '@/colors/semantic'
import { TokenPageTitle, TokenTable } from './TokenTable'

function isDarkHex(hex: string): boolean {
  if (!hex || hex.length < 5) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

const SWATCH_MIN_WIDTH = 140
const SWATCH_HEIGHT = 120

function SemanticSwatch({ tokenName, primitiveRef }: { tokenName: string; primitiveRef: string }) {
  const hex = getPrimitiveHex(primitiveRef)
  const dark = isDarkHex(hex)
  return (
    <div
      style={{
        flex: `1 1 ${SWATCH_MIN_WIDTH}px`,
        minWidth: SWATCH_MIN_WIDTH,
        height: SWATCH_HEIGHT,
        borderRadius: '12px',
        border:
          hex.toLowerCase() === '#ffffff' || hex === ''
            ? '1px solid #E5E5E5'
            : '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: hex || '#f0f0f0',
        color: dark ? '#FFFFFF' : '#171717',
        textShadow: dark ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
        textAlign: 'center',
        lineHeight: 1.35,
        boxSizing: 'border-box',
      }}
    >
      <span style={{ fontSize: '13px', fontWeight: 600 }}>{tokenName}</span>
      <span
        style={{ fontSize: '12px', fontWeight: 500, marginTop: '4px', opacity: dark ? 0.9 : 0.8 }}
      >
        {primitiveRef}
      </span>
    </div>
  )
}

function TokenTableRow({
  tokenName,
  lightRef,
  darkRef,
}: {
  tokenName: string
  lightRef: string
  darkRef: string
}) {
  const lightHex = getPrimitiveHex(lightRef)
  const darkHex = getPrimitiveHex(darkRef)
  return (
    <tr style={{ borderBottom: '1px solid #EBEBEB' }}>
      <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
        <span style={{ color: '#5C5C5C', marginRight: '8px' }}>◇</span>
        <span style={{ fontWeight: 500, color: '#171717' }}>{tokenName}</span>
      </td>
      <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: lightHex,
              border: lightHex === '#ffffff' || !lightHex ? '1px solid #E5E5E5' : 'none',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '13px', color: '#525252' }}>{lightRef}</span>
        </span>
      </td>
      <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: darkHex,
              border: darkHex === '#ffffff' || !darkHex ? '1px solid #E5E5E5' : 'none',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '13px', color: '#525252' }}>{darkRef}</span>
        </span>
      </td>
    </tr>
  )
}

function TokenGroupSection({ group }: { group: (typeof semanticTokenGroups)[number] }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2
        style={{
          margin: '0 0 6px 0',
          fontSize: '22px',
          fontWeight: 700,
          color: '#171717',
          letterSpacing: '-0.02em',
        }}
      >
        {group.title}{' '}
        <span style={{ fontWeight: 500, color: '#737373' }}>{`{${group.prefix}}`}</span>
      </h2>
      <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#5C5C5C', lineHeight: 1.5 }}>
        {group.description}
      </p>
      <div style={{ borderTop: '1px solid #EBEBEB', paddingTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {group.tokens.map((tokenName) => (
            <SemanticSwatch
              key={tokenName}
              tokenName={tokenName}
              primitiveRef={semanticLight[tokenName] ?? ''}
            />
          ))}
        </div>
        <TokenTable columns={['NAME', 'LIGHT MODE', 'DARK MODE']}>
          {group.tokens.map((tokenName) => (
            <TokenTableRow
              key={tokenName}
              tokenName={tokenName}
              lightRef={semanticLight[tokenName] ?? ''}
              darkRef={semanticDark[tokenName] ?? semanticLight[tokenName] ?? ''}
            />
          ))}
        </TokenTable>
      </div>
    </section>
  )
}

export function SemanticTokensPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        padding: '40px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <TokenPageTitle title="Semantic Tokens">
          Theme-aware tokens from <code>tokens.css</code>. Use in components via{' '}
          <code>var(--token-name)</code>.
        </TokenPageTitle>
        {semanticTokenGroups.map((group) => (
          <TokenGroupSection key={group.prefix} group={group} />
        ))}
      </div>
    </div>
  )
}
