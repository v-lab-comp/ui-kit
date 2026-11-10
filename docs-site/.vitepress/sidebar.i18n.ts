/**
 * Навигация и сайдбар — **всегда на английском** (имена компонентов и разделов как в коде / Storybook).
 * Переводы текстов страниц — только в теле `.md` для каждой локали.
 *
 * Локаль меняет только префикс путей: ru → `/guide/…`, en → `/en/guide/…`, uz → `/uz/guide/…`.
 */
export type DocsLocale = 'ru' | 'en' | 'uz'

/** Единые подписи (English). */
const L = {
  navHome: 'Home',
  navDocs: 'Documentation',
  gettingStarted: 'Getting started',
  installation: 'Installation',
  theming: 'Theming',
  documentation: 'Documentation overview',
  storybook: 'Storybook',
  adapters: 'React Hook Form adapters',
  repoDocs: 'Repository docs',
  components: 'Components',
  overview: 'Overview',
  calendar: 'Calendar',
  inputs: 'Inputs',
  inputsOverview: 'Overview & gallery',
  layout: 'Layout',
  overlays: 'Overlays',
  hooks: 'Hooks',
  designSystem: 'Design system',
  releases: 'Releases',
  changelog: 'Changelog',
  comments: 'Comments',
  /** Подгруппа Accordion … Typography (как в Storybook). */
  componentsSubgroup: 'Components',
} as const

function base(locale: DocsLocale): string {
  return locale === 'ru' ? '' : `/${locale}`
}

export function docsNav(locale: DocsLocale) {
  const b = base(locale)
  return [
    { text: L.navHome, link: `${b}/` },
    {
      text: L.navDocs,
      link: `${b}/guide/installation`,
      activeMatch: locale === 'ru' ? '^/guide/' : `^${b}/guide/`,
    },
  ]
}

export function docsSidebar(locale: DocsLocale): Record<string, unknown[]> {
  const b = base(locale)
  const key = locale === 'ru' ? '/guide/' : `${b}/guide/`

  const tree = [
    {
      text: L.gettingStarted,
      items: [
        { text: L.installation, link: `${b}/guide/installation` },
        { text: L.theming, link: `${b}/guide/theming` },
        { text: L.documentation, link: `${b}/guide/documentation` },
        { text: L.storybook, link: `${b}/guide/storybook` },
        { text: L.adapters, link: `${b}/guide/adapters` },
        { text: 'Optional entries', link: `${b}/guide/optional-entries` },
        { text: L.repoDocs, link: `${b}/guide/repository-docs` },
      ],
    },
    {
      text: L.components,
      collapsed: false,
      items: [
        { text: L.overview, link: `${b}/guide/components/` },
        {
          text: L.calendar,
          collapsed: false,
          items: [{ text: L.calendar, link: `${b}/guide/components/calendar` }],
        },
        {
          text: L.componentsSubgroup,
          collapsed: false,
          items: [
            { text: 'Accordion', link: `${b}/guide/components/accordion` },
            { text: 'AppSwitcher', link: `${b}/guide/components/app-switcher` },
            { text: 'Avatar', link: `${b}/guide/components/avatar` },
            { text: 'AvatarCard', link: `${b}/guide/components/avatar-card` },
            { text: 'AvatarGroup', link: `${b}/guide/components/avatar-group` },
            { text: 'Badge', link: `${b}/guide/components/badge` },
            { text: 'Box', link: `${b}/guide/components/box` },
            { text: 'Breadcrumbs', link: `${b}/guide/components/breadcrumbs` },
            { text: 'Button', link: `${b}/guide/components/button` },
            { text: 'ButtonGroup', link: `${b}/guide/components/button-group` },
            {
              text: L.comments,
              collapsed: false,
              items: [
                { text: L.overview, link: `${b}/guide/components/comments/` },
                {
                  text: 'CommentRichInput',
                  link: `${b}/guide/components/comments/comment-rich-input`,
                },
                {
                  text: 'CommentsSection',
                  link: `${b}/guide/components/comments/comments-section`,
                },
                {
                  text: 'EDOC API integration',
                  link: `${b}/guide/components/comments/comments-edoc-api`,
                },
              ],
            },
            { text: 'ContentDivider', link: `${b}/guide/components/content-divider` },
            { text: 'FileUpload', link: `${b}/guide/components/file-upload` },
            { text: 'PdfPreview', link: `${b}/guide/components/pdf-preview` },
            { text: 'LanguageSwitcher', link: `${b}/guide/components/language-switcher` },
            { text: 'Table', link: `${b}/guide/components/table` },
            { text: 'Tag', link: `${b}/guide/components/tag` },
            { text: 'SegmentedControl', link: `${b}/guide/components/segmented-control` },
            { text: 'Tabs', link: `${b}/guide/components/tabs` },
            { text: 'Toast', link: `${b}/guide/components/toast` },
            { text: 'ToggleButton', link: `${b}/guide/components/toggle-button` },
            { text: 'Typography', link: `${b}/guide/components/typography` },
          ],
        },
        {
          text: L.inputs,
          collapsed: false,
          items: [
            { text: L.inputsOverview, link: `${b}/guide/components/inputs/` },
            { text: 'InputField', link: `${b}/guide/components/input-field` },
            { text: 'Checkbox', link: `${b}/guide/components/checkbox` },
            { text: 'CheckboxCard', link: `${b}/guide/components/checkbox-card` },
            { text: 'CheckboxField', link: `${b}/guide/components/checkbox-field` },
            { text: 'DateInput', link: `${b}/guide/components/date-input` },
            { text: 'EmailInput', link: `${b}/guide/components/email-input` },
            { text: 'PasswordInput', link: `${b}/guide/components/password-input` },
            { text: 'MarkdownInput', link: `${b}/guide/components/markdown-input` },
            { text: 'PhoneInput', link: `${b}/guide/components/phone-input` },
            { text: 'RichInput', link: `${b}/guide/components/rich-input` },
            { text: 'SearchInput', link: `${b}/guide/components/search-input` },
            { text: 'SelectInput', link: `${b}/guide/components/select-input` },
            { text: 'AsyncSearchSelect', link: `${b}/guide/components/async-search-select` },
            { text: 'ShareLinkInput', link: `${b}/guide/components/share-link-input` },
            { text: 'SiteInput', link: `${b}/guide/components/site-input` },
            { text: 'TextInput', link: `${b}/guide/components/text-input` },
            { text: 'TagInput', link: `${b}/guide/components/tag-input` },
            { text: 'BaseInput', link: `${b}/guide/components/base-input` },
            { text: 'BaseCheckbox', link: `${b}/guide/components/base-checkbox` },
          ],
        },
        {
          text: L.layout,
          collapsed: false,
          items: [
            { text: 'Drawer', link: `${b}/guide/components/drawer` },
            { text: 'Layout', link: `${b}/guide/components/layout` },
            { text: 'PageHeader', link: `${b}/guide/components/page-header` },
          ],
        },
        {
          text: L.overlays,
          collapsed: false,
          items: [
            { text: 'ConfirmModal', link: `${b}/guide/components/confirm-modal` },
            { text: 'Modal', link: `${b}/guide/components/modal` },
            { text: 'Popover', link: `${b}/guide/components/popover` },
            { text: 'Tooltip', link: `${b}/guide/components/tooltip` },
          ],
        },
        { text: 'UiKitRoot', link: `${b}/guide/components/uikit-root` },
      ],
    },
    {
      text: L.hooks,
      collapsed: false,
      items: [
        { text: L.overview, link: `${b}/guide/hooks/` },
        { text: 'useClickOutside', link: `${b}/guide/hooks/use-click-outside` },
        { text: 'useTabsSearchParam', link: `${b}/guide/hooks/use-tabs-search-param` },
        { text: 'useToast', link: `${b}/guide/hooks/use-toast` },
        { text: 'useSidebar', link: `${b}/guide/hooks/use-sidebar` },
        { text: 'useCompositeInput', link: `${b}/guide/hooks/use-composite-input` },
      ],
    },
    {
      text: L.designSystem,
      collapsed: false,
      items: [
        { text: L.overview, link: `${b}/guide/design-system/` },
        { text: 'Colors', link: `${b}/guide/design-system/colors` },
        { text: 'Semantic tokens', link: `${b}/guide/design-system/semantic-tokens` },
        { text: 'Radius', link: `${b}/guide/design-system/radius` },
        { text: 'Shadows', link: `${b}/guide/design-system/shadows` },
        { text: 'Icons', link: `${b}/guide/design-system/icons` },
        { text: 'Country flags', link: `${b}/guide/design-system/flags` },
      ],
    },
    {
      text: L.releases,
      items: [{ text: L.changelog, link: `${b}/guide/changelog` }],
    },
  ]

  return { [key]: tree }
}
