import { accordionContract } from './accordion'
import { appSwitcherContract } from './app-switcher'
import { avatarContract } from './avatar'
import { avatarCardContract } from './avatar-card'
import { avatarGroupContract } from './avatar-group'
import { badgeContract } from './badge'
import { baseCheckboxContract } from './base-checkbox'
import { baseInputContract } from './base-input'
import { breadcrumbItemContract } from './breadcrumb-item'
import { breadcrumbLinkContract } from './breadcrumb-item'
import { breadcrumbPageContract } from './breadcrumb-item'
import { breadcrumbsContract } from './breadcrumbs'
import { buttonContract } from './button'
import { buttonGroupContract } from './button-group'
import { calendarContract } from './calendar'
import { calendarDayContract } from './calendar-day'
import { calendarGridContract } from './calendar-grid'
import { calendarHeaderContract } from './calendar-header'
import { checkboxCardContract } from './checkbox-card'
import { checkboxFieldContract } from './checkbox-field'
import { checkboxLabelRowContract } from './checkbox-label-row'
import { commentRichInputContract } from './comment-rich-input'
import { commentsSectionContract } from './comments-section'
import { confirmModalContract } from './confirm-modal'
import { contentDividerContract } from './content-divider'
import { dateInputContract } from './date-input'
import { drawerContract } from './drawer'
import { drawerBodyContract } from './drawer-body'
import { drawerFooterContract } from './drawer-footer'
import { drawerHeaderContract } from './drawer-header'
import { emailInputContract } from './email-input'
import { fileUploadContract } from './file-upload'
import { inputFieldContract } from './input-field'
import { layoutRootContract } from './layout-root'
import { modalContract } from './modal'
import { modalBodyContract } from './modal-body'
import { modalFooterContract } from './modal-footer'
import { modalFooterSlotsContract } from './modal-footer-slots'
import { modalHeaderContract } from './modal-header'
import { modalStatusContract } from './modal-status'
import { pageHeaderContract } from './page-header'
import { pageHeaderDemoContract } from './page-header-demo'
import { passwordInputContract } from './password-input'
import { pdfPreviewContract } from './pdf-preview'
import { phoneInputContract } from './phone-input'
import { popoverContract } from './popover'
import { richInputContract } from './rich-input'
import { searchInputContract } from './search-input'
import { segmentedControlContract } from './segmented-control'
import { selectInputContract } from './select-input'
import { shareLinkInputContract } from './share-link-input'
import { sidebarContentContract } from './sidebar'
import { sidebarContract } from './sidebar'
import { sidebarLayoutContract } from './sidebar'
import { sidebarMainContract } from './sidebar'
import { sidebarSectionContract } from './sidebar'
import { sidebarTriggerContract } from './sidebar'
import { sidebarCardContract } from './sidebar-card'
import { sidebarFooterContract } from './sidebar-footer'
import { sidebarHeaderContract } from './sidebar-header'
import { sidebarHeaderCardContract } from './sidebar-header-card'
import { sidebarInsetContentContract } from './sidebar-inset'
import { sidebarInsetContract } from './sidebar-inset'
import { sidebarItemContract } from './sidebar-item'
import { siteInputContract } from './site-input'
import { tableContract } from './table'
import { tabsContract } from './tabs'
import { tagContract } from './tag'
import { tagInputContract } from './tag-input'
import { textInputContract } from './text-input'
import { toastContract } from './toast'
import { toastProviderContract } from './toast-provider'
import { toggleButtonContract } from './toggle-button'
import { toggleGroupContract } from './toggle-group'
import { tooltipContract } from './tooltip'
import { typographyContract } from './typography'
import { uiKitRootContract } from './ui-kit-root'

export {
  accordionContract,
  appSwitcherContract,
  avatarContract,
  avatarCardContract,
  avatarGroupContract,
  badgeContract,
  baseCheckboxContract,
  baseInputContract,
  breadcrumbItemContract,
  breadcrumbLinkContract,
  breadcrumbPageContract,
  breadcrumbsContract,
  buttonContract,
  buttonGroupContract,
  calendarContract,
  calendarDayContract,
  calendarGridContract,
  calendarHeaderContract,
  checkboxCardContract,
  checkboxFieldContract,
  checkboxLabelRowContract,
  commentRichInputContract,
  commentsSectionContract,
  confirmModalContract,
  contentDividerContract,
  dateInputContract,
  drawerContract,
  drawerBodyContract,
  drawerFooterContract,
  drawerHeaderContract,
  emailInputContract,
  fileUploadContract,
  inputFieldContract,
  layoutRootContract,
  modalContract,
  modalBodyContract,
  modalFooterContract,
  modalFooterSlotsContract,
  modalHeaderContract,
  modalStatusContract,
  pageHeaderContract,
  pageHeaderDemoContract,
  passwordInputContract,
  pdfPreviewContract,
  phoneInputContract,
  popoverContract,
  richInputContract,
  searchInputContract,
  segmentedControlContract,
  selectInputContract,
  shareLinkInputContract,
  sidebarContentContract,
  sidebarContract,
  sidebarLayoutContract,
  sidebarMainContract,
  sidebarSectionContract,
  sidebarTriggerContract,
  sidebarCardContract,
  sidebarFooterContract,
  sidebarHeaderContract,
  sidebarHeaderCardContract,
  sidebarInsetContentContract,
  sidebarInsetContract,
  sidebarItemContract,
  siteInputContract,
  tableContract,
  tabsContract,
  tagContract,
  tagInputContract,
  textInputContract,
  toastContract,
  toastProviderContract,
  toggleButtonContract,
  toggleGroupContract,
  tooltipContract,
  typographyContract,
  uiKitRootContract,
}

/** Реестр контрактов всех компонентов — для проверки скинов и документации. */
export const themeContracts = {
  accordion: accordionContract,
  appSwitcher: appSwitcherContract,
  avatar: avatarContract,
  avatarCard: avatarCardContract,
  avatarGroup: avatarGroupContract,
  badge: badgeContract,
  baseCheckbox: baseCheckboxContract,
  baseInput: baseInputContract,
  breadcrumbItem: breadcrumbItemContract,
  breadcrumbLink: breadcrumbLinkContract,
  breadcrumbPage: breadcrumbPageContract,
  breadcrumbs: breadcrumbsContract,
  button: buttonContract,
  buttonGroup: buttonGroupContract,
  calendar: calendarContract,
  calendarDay: calendarDayContract,
  calendarGrid: calendarGridContract,
  calendarHeader: calendarHeaderContract,
  checkboxCard: checkboxCardContract,
  checkboxField: checkboxFieldContract,
  checkboxLabelRow: checkboxLabelRowContract,
  commentRichInput: commentRichInputContract,
  commentsSection: commentsSectionContract,
  confirmModal: confirmModalContract,
  contentDivider: contentDividerContract,
  dateInput: dateInputContract,
  drawer: drawerContract,
  drawerBody: drawerBodyContract,
  drawerFooter: drawerFooterContract,
  drawerHeader: drawerHeaderContract,
  emailInput: emailInputContract,
  fileUpload: fileUploadContract,
  inputField: inputFieldContract,
  layoutRoot: layoutRootContract,
  modal: modalContract,
  modalBody: modalBodyContract,
  modalFooter: modalFooterContract,
  modalFooterSlots: modalFooterSlotsContract,
  modalHeader: modalHeaderContract,
  modalStatus: modalStatusContract,
  pageHeader: pageHeaderContract,
  pageHeaderDemo: pageHeaderDemoContract,
  passwordInput: passwordInputContract,
  pdfPreview: pdfPreviewContract,
  phoneInput: phoneInputContract,
  popover: popoverContract,
  richInput: richInputContract,
  searchInput: searchInputContract,
  segmentedControl: segmentedControlContract,
  selectInput: selectInputContract,
  shareLinkInput: shareLinkInputContract,
  sidebarContent: sidebarContentContract,
  sidebar: sidebarContract,
  sidebarLayout: sidebarLayoutContract,
  sidebarMain: sidebarMainContract,
  sidebarSection: sidebarSectionContract,
  sidebarTrigger: sidebarTriggerContract,
  sidebarCard: sidebarCardContract,
  sidebarFooter: sidebarFooterContract,
  sidebarHeader: sidebarHeaderContract,
  sidebarHeaderCard: sidebarHeaderCardContract,
  sidebarInsetContent: sidebarInsetContentContract,
  sidebarInset: sidebarInsetContract,
  sidebarItem: sidebarItemContract,
  siteInput: siteInputContract,
  table: tableContract,
  tabs: tabsContract,
  tag: tagContract,
  tagInput: tagInputContract,
  textInput: textInputContract,
  toast: toastContract,
  toastProvider: toastProviderContract,
  toggleButton: toggleButtonContract,
  toggleGroup: toggleGroupContract,
  tooltip: tooltipContract,
  typography: typographyContract,
  uiKitRoot: uiKitRootContract,
} as const
