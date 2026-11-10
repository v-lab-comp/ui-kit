/**
 * Динамические entry для превью в VitePress.
 * Ключ = атрибут `name` у `<ComponentDocsPreview>`.
 */
export const componentDocsLoaders = {
  accordion: () => import('./VitePressAccordionDemos').then((m) => m.AccordionDocsDemo),
  appSwitcher: () => import('./VitePressAppSwitcherDemos').then((m) => m.AppSwitcherDocsDemo),
  appSwitcherGallery: () =>
    import('./VitePressAppSwitcherDemos').then((m) => m.AppSwitcherGalleryDemo),
  accordionGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.AccordionGalleryEmbed),
  avatar: () => import('./VitePressAvatarDemos').then((m) => m.AvatarDocsDemo),
  avatarGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.AvatarGalleryEmbed),
  avatarCard: () => import('./VitePressAvatarCardDemos').then((m) => m.AvatarCardDocsDemo),
  avatarGroup: () => import('./VitePressAvatarGroupDemos').then((m) => m.AvatarGroupDocsDemo),
  avatarGroupGallery: () =>
    import('./VitePressGalleryEmbeds').then((m) => m.AvatarGroupGalleryEmbed),
  badge: () => import('./VitePressBadgeDemos').then((m) => m.BadgeDocsDemo),
  badgeGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.BadgeGalleryEmbed),
  box: () => import('./VitePressBoxDemos').then((m) => m.BoxDocsDemo),
  breadcrumbs: () => import('./VitePressBreadcrumbsDemos').then((m) => m.BreadcrumbsDocsDemo),
  button: () => import('./VitePressButtonDemos').then((m) => m.ButtonDocsDemo),
  calendar: () => import('./VitePressCalendarDemos').then((m) => m.CalendarDocsDemo),
  checkbox: () => import('./VitePressCheckboxDemos').then((m) => m.CheckboxPrimitiveDocsDemo),
  checkboxCard: () => import('./VitePressCheckboxDemos').then((m) => m.CheckboxCardDocsDemo),
  checkboxField: () => import('./VitePressCheckboxDemos').then((m) => m.CheckboxFieldDocsDemo),
  buttonGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.ButtonGalleryEmbed),
  buttonGroup: () => import('./VitePressButtonGroupDemos').then((m) => m.ButtonGroupDocsDemo),
  commentRichInput: () =>
    import('./VitePressCommentsDemos').then((m) => m.CommentRichInputDocsDemo),
  commentsSection: () => import('./VitePressCommentsDemos').then((m) => m.CommentsSectionDocsDemo),
  confirmModal: () => import('./VitePressConfirmModalDemos').then((m) => m.ConfirmModalDocsDemo),
  confirmModalGallery: () =>
    import('./VitePressGalleryEmbeds').then((m) => m.ConfirmModalGalleryEmbed),
  baseInput: () => import('./VitePressInputsStoryDemos').then((m) => m.BaseInputDocsDemo),
  baseCheckbox: () => import('./VitePressCheckboxDemos').then((m) => m.BaseCheckboxDocsDemo),
  contentDivider: () =>
    import('./VitePressContentDividerDemos').then((m) => m.ContentDividerDocsDemo),
  dateInput: () => import('./VitePressInputsStoryDemos').then((m) => m.DateInputDocsDemo),
  emailInput: () => import('./VitePressInputsStoryDemos').then((m) => m.EmailInputDocsDemo),
  fileUpload: () => import('./VitePressFileUploadDemos').then((m) => m.FileUploadDocsDemo),
  flagsGallery: () => import('./VitePressIconsFlagsGalleryDemos').then((m) => m.FlagsGalleryEmbed),
  hookClickOutside: () => import('./VitePressHooksDemos').then((m) => m.HookClickOutsideDemo),
  hookCompositeInput: () => import('./VitePressHooksDemos').then((m) => m.HookCompositeInputDemo),
  hookSidebar: () => import('./VitePressHooksDemos').then((m) => m.HookSidebarDemo),
  hookTabsSearchParam: () => import('./VitePressHooksDemos').then((m) => m.HookTabsSearchParamDemo),
  hookToast: () => import('./VitePressHooksDemos').then((m) => m.HookToastDemo),
  inputCompleted: () =>
    import('./VitePressInputCompletedDemos').then((m) => m.InputCompletedDocsDemo),
  iconsGallery: () => import('./VitePressIconsFlagsGalleryDemos').then((m) => m.IconsGalleryEmbed),
  inputsGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.InputsGalleryEmbed),
  passwordInput: () => import('./VitePressInputsStoryDemos').then((m) => m.PasswordInputDocsDemo),
  pdfPreview: () => import('./VitePressPdfPreviewDemos').then((m) => m.PdfPreviewDocsDemo),
  phoneInput: () => import('./VitePressInputsStoryDemos').then((m) => m.PhoneInputDocsDemo),
  languageSwitcher: () =>
    import('./VitePressLanguageSwitcherDemos').then((m) => m.LanguageSwitcherDocsDemo),
  languageSwitcherGallery: () =>
    import('./VitePressLanguageSwitcherDemos').then((m) => m.LanguageSwitcherGalleryEmbed),
  drawer: () => import('./VitePressDrawerDemos').then((m) => m.DrawerDocsDemo),
  drawerHeader: () => import('./VitePressDrawerDemos').then((m) => m.DrawerHeaderDocsDemo),
  drawerFooter: () => import('./VitePressDrawerDemos').then((m) => m.DrawerFooterDocsDemo),
  drawerSizes: () => import('./VitePressDrawerDemos').then((m) => m.DrawerSizesDocsDemo),
  layout: () => import('./VitePressLayoutDemos').then((m) => m.LayoutDocsDemo),
  layoutSidebar: () => import('./VitePressLayoutDemos').then((m) => m.LayoutSidebarDocsDemo),
  layoutHeader: () => import('./VitePressLayoutDemos').then((m) => m.LayoutHeaderDocsDemo),
  modal: () => import('./VitePressModalDemos').then((m) => m.ModalDocsDemo),
  modalGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.ModalGalleryEmbed),
  richInput: () => import('./VitePressRichInputDemos').then((m) => m.RichInputDocsDemo),
  searchInput: () => import('./VitePressInputsStoryDemos').then((m) => m.SearchInputDocsDemo),
  selectInput: () => import('./VitePressSelectInputDemos').then((m) => m.SelectInputDocsDemo),
  selectInputMultiple: () =>
    import('./VitePressSelectInputDemos').then((m) => m.SelectInputMultipleDocsDemo),
  selectInputGrouped: () =>
    import('./VitePressSelectInputDemos').then((m) => m.SelectInputGroupedDocsDemo),
  asyncSearchSelect: () =>
    import('./VitePressAsyncSearchSelectDemos').then((m) => m.AsyncSearchSelectDocsDemo),
  shareLinkInput: () => import('./VitePressInputsStoryDemos').then((m) => m.ShareLinkInputDocsDemo),
  siteInput: () => import('./VitePressInputsStoryDemos').then((m) => m.SiteInputDocsDemo),
  pageHeader: () => import('./VitePressPageHeaderDemos').then((m) => m.PageHeaderDocsDemo),
  popover: () => import('./VitePressPopoverDemos').then((m) => m.PopoverDocsDemo),
  table: () => import('./VitePressTableDemos').then((m) => m.TableDocsDemo),
  tag: () => import('./VitePressTagDemos').then((m) => m.TagDocsDemo),
  tagInput: () => import('./VitePressTagInputDemos').then((m) => m.TagInputDocsDemo),
  textInput: () => import('./VitePressTextInputDemos').then((m) => m.TextInputDocsDemo),
  tableGallery: () => import('./VitePressGalleryEmbeds').then((m) => m.TableGalleryEmbed),
  tabs: () => import('./VitePressTabsDemos').then((m) => m.TabsDocsDemo),
  tooltip: () => import('./VitePressTooltipDemos').then((m) => m.TooltipDocsDemo),
  toast: () => import('./VitePressToastDemos').then((m) => m.ToastDocsDemo),
  toastGallery: () => import('./VitePressToastDemos').then((m) => m.ToastGalleryDemo),
  typography: () => import('./VitePressTypographyDemos').then((m) => m.TypographyDocsDemo),
  typographyGallery: () =>
    import('./VitePressTypographyDemos').then((m) => m.TypographyGalleryDemo),
  uikitRoot: () => import('./VitePressUiKitRootDemos').then((m) => m.UiKitRootDocsDemo),
  toggleButton: () => import('./VitePressToggleButtonDemos').then((m) => m.ToggleButtonDocsDemo),
  toggleButtonGallery: () =>
    import('./VitePressToggleButtonDemos').then((m) => m.ToggleButtonGalleryDemo),
  segmentedControl: () =>
    import('./VitePressSegmentedControlDemos').then((m) => m.SegmentedControlDocsDemo),
  segmentedControlGallery: () =>
    import('./VitePressSegmentedControlDemos').then((m) => m.SegmentedControlGalleryDemo),
} as const

export type ComponentDocsName = keyof typeof componentDocsLoaders
