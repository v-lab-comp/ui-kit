export type { Color } from './types/colors'
export { COLOR_OPTIONS } from './types/colors'

export {
  ThemeProvider,
  useTheme,
  defineSkin,
  skinChain,
  themeHtmlAttributes,
  defineContract,
  contractAttrs,
  contractPart,
  contractSelector,
  themeContracts,
  buttonContract,
} from './theme'
export type {
  ThemeProviderProps,
  ThemeContextValue,
  Skin,
  ColorScheme,
  ColorSchemePreference,
  ThemeHtmlAttributes,
  Contract,
  ContractDefinition,
  ContractValue,
  ContractInput,
} from './theme'

export { useClickOutside, useTabsSearchParam } from './hooks'
export type { UseTabsSearchParamOptions, UseTabsSearchParamResult } from './hooks'

export {
  Button,
  BUTTON_COLOR_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_SHAPE_OPTIONS,
} from './components/Button'
export type {
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonShape,
} from './components/Button'

export { Typography } from './components/Typography'
export type {
  TypographyProps,
  TypographyVariant,
  TitleSize,
  LabelSize,
  ParagraphSize,
  SubheadingSize,
  DocsSize,
  TypographyWeight,
  VariantMap,
} from './components/Typography'

export {
  Toast,
  ToastAction,
  ToastProvider,
  useToast,
  TOAST_COLOR_OPTIONS,
  TOAST_VARIANT_OPTIONS,
  TOAST_POSITION_OPTIONS,
  TOAST_SIZE_OPTIONS,
} from './components/Toast'
export type {
  ToastProps,
  ToastActionProps,
  ToastActionElement,
  ToastVariant,
  ToastSize,
  ToastPosition,
  ToastConfig,
  ToastColor,
  ToastAddOptions,
  ToastContextValue,
} from './components/Toast'

export { Badge } from './components/Badge'
export type {
  BadgeProps,
  BadgeVariant,
  BadgeColor,
  BadgeSize,
  BadgeShape,
} from './components/Badge'

export { Tag, TAG_VARIANT_OPTIONS, TAG_COLOR_OPTIONS } from './components/Tag'
export type { TagProps, TagVariant, TagColor } from './components/Tag'

export { Box } from './components/Box'
export type { BoxProps } from './components/Box'

export { UiKitRoot } from './components/UiKitRoot'
export type { UiKitRootProps } from './components/UiKitRoot'

export { Accordion } from './components/Accordion'
export type { AccordionProps } from './components/Accordion'

export { ContentDivider } from './components/ContentDivider'
export type { ContentDividerProps, ContentDividerVariant } from './components/ContentDivider'

export {
  FileUploadField,
  FileUploadItem,
  FileDropZone,
  formatFileSize,
  fileToUploadFile,
  uploadFilesToNativeFiles,
} from './components/FileUpload'
export type {
  UploadFile,
  UploadFileStatus,
  FileDropZoneProps,
  FileDropZoneSize,
  FileUploadFieldProps,
  FileUploadFilesChangeHandler,
} from './components/FileUpload'

export { Avatar, AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from './components/Avatar'
export type { AvatarProps, AvatarSize, AvatarColor } from './components/Avatar'

export { AvatarGroup } from './components/AvatarGroup'
export type {
  AvatarGroupProps,
  AvatarGroupMode,
  AvatarGroupCompactStyle,
  AvatarGroupCompactSize,
} from './components/AvatarGroup'

export { AvatarCard } from './components/AvatarCard'
export type { AvatarCardProps } from './components/AvatarCard'

export {
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarContent,
  SidebarSection,
  SidebarTrigger,
  SidebarItem,
  SidebarCard,
  SidebarHeaderCard,
  SidebarHeader,
  SidebarUserProfileCard,
  SidebarFooter,
} from './components/layout/Sidebar'
export { useSidebar } from './components/layout/Sidebar'
export type {
  SidebarProps,
  SidebarLayoutProps,
  SidebarMainProps,
  SidebarContentProps,
  SidebarSectionProps,
  SidebarTriggerProps,
  SidebarItemProps,
  SidebarCardProps,
  SidebarHeaderCardProps,
  SidebarHeaderCardOption,
  SidebarHeaderProps,
  SidebarUserProfileCardProps,
  SidebarFooterProps,
} from './components/layout/Sidebar'

export { PageHeader, PageHeaderDemoContent } from './components/layout/Header'
export type { PageHeaderProps } from './components/layout/Header'

export { LanguageSwitcher } from './components/LanguageSwitcher'
export type { LanguageSwitcherProps } from './components/LanguageSwitcher'

export {
  CommentRichInput,
  CommentsSection,
  COMMENTS_SECTION_STRING_KEYS,
  DEFAULT_COMMENTS_SECTION_STRINGS,
  DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
  formatCommentDayDivider,
  mergeCommentsSectionStrings,
  mergeCommentsSectionStringsFromJson,
} from './components/Comments'
export type {
  CommentRichInputProps,
  CommentRichInputAriaLabels,
  CommentThreadItem,
  CommentsSectionLabels,
  CommentsSectionMessages,
  CommentsSectionProps,
  CommentsSectionStringKey,
  CommentsSectionStringsOverride,
  FormatCommentDayDividerOptions,
  FormatCommentDayDividerLabels,
} from './components/Comments'

export { SidebarInset, SidebarInsetContent } from './components/layout/Inset'
export type { SidebarInsetProps, SidebarInsetContentProps } from './components/layout/Inset'

export { LayoutRoot } from './components/layout/LayoutRoot'
export type { LayoutRootProps } from './components/layout/LayoutRoot'

export {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DRAWER_SIDES,
  DRAWER_SIZES,
} from './components/layout/Drawer'
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerSide,
  DrawerSize,
} from './components/layout/Drawer'

export {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BREADCRUMBS_SEPARATOR_OPTIONS,
} from './components/Breadcrumb'
export type {
  BreadcrumbsProps,
  BreadcrumbsSeparator,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
} from './components/Breadcrumb'

export { ButtonGroup } from './components/ButtonGroup'
export type { ButtonGroupProps } from './components/ButtonGroup'

export { SegmentedControl, SegmentedControlItem } from './components/SegmentedControl'
export type {
  SegmentedControlProps,
  SegmentedControlItemProps,
  SegmentedControlSize,
} from './components/SegmentedControl'

export { ToggleButton, ToggleGroup } from './components/ToggleButton'
export type {
  ToggleButtonProps,
  ToggleButtonSize,
  ToggleButtonShape,
  ToggleGroupProps,
} from './components/ToggleButton'

export { Tabs } from './components/Tabs'
export type { TabsProps, TabsTabProps, TabsPanelProps } from './components/Tabs'

export { Table } from './components/Table'
export type { TableProps, TableColumn } from './components/Table'

// ── Base primitives ────────────────────────────────────────────────────────
export { BaseInput, BASE_INPUT_SIZE_OPTIONS } from './components/inputs'
export type { BaseInputProps, BaseInputSize } from './components/inputs'

export { BaseCheckbox, BASE_CHECKBOX_SIZE_OPTIONS } from './components/inputs'
export type { BaseCheckboxProps, BaseCheckboxSize } from './components/inputs'

export { InputField } from './components/inputs'
export type { InputFieldProps } from './components/inputs'

export { useCompositeInput } from './components/inputs'

// ── Inputs ─────────────────────────────────────────────────────────────────
export { TextInput } from './components/inputs'
export type { TextInputProps } from './components/inputs'

export { TagInput, tagLabel } from './components/inputs'
export type {
  TagInputProps,
  TagInputSuggestion,
  TagInputSuggestionObject,
  TagInputSuggestionsMatch,
  TagInputTagObject,
  TagInputTagValue,
} from './components/inputs'

export {
  RichInput,
  DEFAULT_RICH_INPUT_ARIA_EN,
  DEFAULT_RICH_INPUT_TOOLS,
} from './components/inputs'
export type { RichInputAriaLabels, RichInputProps, RichInputTool } from './components/inputs'

export { EmailInput } from './components/inputs'
export type { EmailInputProps } from './components/inputs'

export { PasswordInput } from './components/inputs'
export type { PasswordInputProps } from './components/inputs'

export { SearchInput } from './components/inputs'
export type { SearchInputProps } from './components/inputs'

export { SiteInput } from './components/inputs'
export type { SiteInputProps } from './components/inputs'

export { ShareLinkInput } from './components/inputs'
export type { ShareLinkInputProps } from './components/inputs'

export { SelectInput } from './components/inputs'
export type {
  SelectVariant,
  SelectOption,
  SelectOptionWithShortLabel,
  SelectOptionGroup,
  SelectInputOptionsProp,
  SelectInputMultipleChangeEvent,
  SelectInputMultipleDisplay,
  SelectInputFullFieldProps,
  FullVariantMultipleProps,
  SelectInputProps,
} from './components/inputs'

export { AsyncSearchSelect } from './components/inputs'
export type { AsyncSearchSelectLoadResult, AsyncSearchSelectProps } from './components/inputs'

export { Checkbox, CheckboxField, CheckboxCard, CHECKBOX_SIZE_OPTIONS } from './components/inputs'
export type {
  CheckboxProps,
  CheckboxFieldProps,
  CheckboxCardProps,
  CheckboxSize,
} from './components/inputs'

// ── Calendar ───────────────────────────────────────────────────────────────
export {
  CalendarDay,
  CalendarHeader,
  CalendarGrid,
  Calendar,
  calendarLocales,
  defaultLocale,
} from './components/Calendar'
export type {
  CalendarDayProps,
  CalendarHeaderProps,
  CalendarGridProps,
  CalendarProps,
  DateRange,
  CalendarLocale,
  BuiltinLocale,
} from './components/Calendar'

// ── Overlays ───────────────────────────────────────────────────────────────
export { Popover } from './components/overlays'
export type { PopoverProps } from './components/overlays'

export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  ModalFooterInfo,
  ModalFooterStepDots,
  ModalFooterLinkButton,
  ModalFooterSwitch,
  ModalStatus,
  ConfirmModal,
  ModalProvider,
  MODAL_SIZES,
  MODAL_ANIMATIONS,
} from './components/overlays'
export type {
  ModalProps,
  ModalHandle,
  ModalHeaderProps,
  ModalBodyProps,
  ModalBodyAlign,
  ModalFooterProps,
  ModalFooterConfirmActionsProps,
  ModalFooterInfoProps,
  ModalFooterStepDotsProps,
  ModalFooterLinkButtonProps,
  ModalFooterSwitchProps,
  ModalStatusProps,
  ModalStatusVariant,
  ModalStatusLayout,
  ConfirmModalProps,
  ModalProviderProps,
  ModalAnimation,
  ModalSize,
} from './components/overlays'

export { Tooltip } from './components/overlays'
export type { TooltipProps } from './components/overlays'

export { AppSwitcher } from './components/AppSwitcher'
export type { AppItem, AppSwitcherProps, AppSwitcherPromo } from './components/AppSwitcher'
