import { Typography } from '@/components/Typography'
import { UiKitRoot } from '@/components/UiKitRoot'

export function UiKitRootDocsDemo() {
  return (
    <UiKitRoot style={{ padding: '16px 20px', borderRadius: 8, maxWidth: 420 }}>
      <Typography variant="paragraph" size="medium">
        Обёртка с локальным reset (типографика, формы, box-sizing) для островка UI. Обычно — корень
        приложения или изолированный блок превью.
      </Typography>
    </UiKitRoot>
  )
}
