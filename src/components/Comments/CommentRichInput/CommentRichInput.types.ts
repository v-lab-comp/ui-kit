import type { ReactNode } from 'react'

/**
 * Подписи для кнопок тулбара (a11y). Значения по умолчанию — на английском внутри кита;
 * при необходимости передайте свои строки снаружи.
 */
export type CommentRichInputAriaLabels = {
  bold?: string
  italic?: string
  underline?: string
  strikethrough?: string
  /** Кнопка выравнивания (сейчас вызывается `justifyLeft`) */
  align?: string
  send?: string
}

/**
 * Дополнительная кнопка слева от «Отправить» (используется как «Отмена» в режиме редактирования).
 */
export type CommentRichInputSecondaryAction = {
  label: string
  ariaLabel?: string
  onClick: () => void
}

/**
 * Rich-input для комментария: `contenteditable`, форматирование через `document.execCommand`,
 * вставка из буфера — только plain text. **Без сетевых запросов**: результат отдаётся в `onSend`.
 *
 * @remarks
 * - **Отправка:** `Enter`. **Новая строка:** `Shift`+`Enter`.
 * - **ARIA:** см. {@link DEFAULT_COMMENT_RICH_INPUT_ARIA_EN} — можно развернуть и переопределить отдельные ключи.
 * - **Режим редактирования:** передайте `initialHtml` + `submitLabel` («Save») + `secondaryAction` («Cancel»).
 *   При наличии `initialHtml` поле после `onSend` **не очищается** (родитель размонтирует редактор сам).
 */
export type CommentRichInputProps = {
  /**
   * HTML фрагмент после очистки от `<script>` и проверки «не пусто».
   * Санитизацию для `dangerouslySetInnerHTML` при отображении списка выполняет приложение / бэкенд.
   */
  onSend: (html: string) => void | Promise<void>
  isPending?: boolean
  disabled?: boolean
  /** Текст плейсхолдера в пустом поле — задаёт приложение */
  placeholder: string
  ariaLabels?: CommentRichInputAriaLabels
  className?: string
  /** Доп. класс на корневой обёртке (например ширина в сетке) */
  rootClassName?: string
  /** Слот слева от тулбара (например аватар) */
  toolbarStartSlot?: ReactNode
  /** Начальный HTML — выставляется в редактор при mount (для inline-редактирования) */
  initialHtml?: string
  /**
   * Если задано — кнопка отправки рендерится как текстовая (Save), а не иконка-«самолётик».
   * Используется в режиме редактирования.
   */
  submitLabel?: string
  /**
   * Сбрасывать ли поле после успешной отправки. По умолчанию: `true` для создания (без `initialHtml`),
   * `false` для режима редактирования (с `initialHtml`).
   */
  resetOnSubmit?: boolean
  /** Доп. кнопка слева от send — обычно «Отмена» в режиме редактирования. */
  secondaryAction?: CommentRichInputSecondaryAction
  /**
   * Лимит длины текстового содержимого (по `textContent`, без HTML-тегов).
   * Когда задан — в футере появляется счётчик `current / max`, ввод сверх лимита блокируется
   * (вставка из буфера обрезается), отправка отключена при превышении.
   */
  maxLength?: number
}
