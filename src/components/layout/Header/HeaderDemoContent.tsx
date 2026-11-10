import {
  RiSearch2Line,
  RiNotification3Line,
  RiCalendarCheckLine,
  RiAddLine,
} from '@remixicon/react'
import { contractPart } from '@/theme/contract'
import { pageHeaderDemoContract } from '@/theme/contracts/page-header-demo'

const part = (name: Parameters<typeof contractPart<typeof pageHeaderDemoContract>>[1]) =>
  contractPart(pageHeaderDemoContract, name)

/** Демо по Figma 3829-27890: слева компактный заголовок (без длинных плейсхолдеров — иначе в превью доков ломается сетка), справа действия. */
export function PageHeaderDemoContent() {
  return (
    <div className={pageHeaderDemoContract.className} data-uikit-ph-demo>
      <div className={part('row')} data-uikit-ph-row>
        <div className={part('title-block')} data-uikit-ph-title-block>
          <span className={part('title')} data-uikit-ph-title>
            Dashboard
          </span>
        </div>
        <div className={part('actions')}>
          <button type="button" className={part('topbar-btn')} aria-label="Search">
            <RiSearch2Line />
          </button>
          <div className={part('notification-wrap')}>
            <button type="button" className={part('topbar-btn')} aria-label="Notifications">
              <RiNotification3Line />
            </button>
            <span className={part('notification-dot')} aria-hidden />
          </div>
          <div className={part('btn-group')}>
            <button type="button" className={part('secondary-btn')}>
              <RiCalendarCheckLine />
              Schedule
            </button>
            <button type="button" className={part('primary-btn')}>
              <RiAddLine />
              Create Request
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
