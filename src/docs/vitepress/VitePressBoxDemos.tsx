import { Box } from '@/components/Box'

export function BoxDocsDemo() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <Box>Содержимое в Box</Box>
    </div>
  )
}
