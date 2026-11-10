import { PageHeader, PageHeaderDemoContent } from '@/components/layout/Header'

/** Пример как в Storybook Layout/Header → AsInFigma. */
export function PageHeaderDocsDemo() {
  return (
    <div style={{ overflow: 'auto', maxWidth: '100%' }}>
      <div style={{ minWidth: 'min(100%, 720px)' }}>
        <PageHeader>
          <PageHeaderDemoContent />
        </PageHeader>
      </div>
    </div>
  )
}
