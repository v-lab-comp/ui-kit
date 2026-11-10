import { forwardRef, useRef } from 'react'
import type { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react'
import clsx from 'clsx'
import { BaseInput } from '../base/BaseInput'
import { InputField, inputFieldLabelId } from '../base/InputField'
import { useSuggestionsListbox } from './hooks/useSuggestionsListbox'
import { useTagDraft } from './hooks/useTagDraft'
import { useTagList } from './hooks/useTagList'
import {
  tagMatchesSuggestion,
  tagsAreaStyle,
  tagValueFromSuggestionRow,
  type NormalizedSuggestion,
} from './model'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'
import { useMergeRefs } from '@/utils/useMergeRefs'
import type { TagInputProps, TagInputTagValue } from './types'
import { tagLabel } from './types'
import { SuggestionsPopover } from './ui/SuggestionsPopover'
import { TagChips } from './ui/TagChips'

export { tagLabel } from './types'
export type {
  TagInputProps,
  TagInputSuggestion,
  TagInputSuggestionObject,
  TagInputSuggestionsMatch,
  TagInputTagObject,
  TagInputTagValue,
} from './types'

const defaultRemoveTagLabel = (tag: TagInputTagValue) => `Remove ${tagLabel(tag)}`

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      startBlock,
      endBlock,
      id,
      size = 'medium',
      disabled = false,
      className,
      wrapperClassName,
      wrapperStyle,
      tagsAreaMaxHeight,
      value,
      defaultValue,
      onChange,
      tagVariant = 'stroke',
      maxTags,
      allowDuplicates = false,
      allowCustomTags = true,
      commitOnBlur = true,
      splitPattern,
      removeTagLabel = defaultRemoveTagLabel,
      renderTag,
      maxTagCount,
      maxTagCountOverflow,
      validateTag,
      placeholder,
      suggestions,
      suggestionsMatch = 'contains',
      suggestionsLimit = 50,
      suggestionsExcludeSelected = false,
      suggestionsLoading = false,
      suggestionsEmptyText = 'No matches',
      suggestionsLoadingText = 'Loading…',
      getOptionDisabled,
      onSuggestionsQueryChange,
      onKeyDown,
      onFocus,
      onBlur,
      onPaste,
      onClick,
      ...inputProps
    },
    ref
  ) => {
    const anchorRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const list = useTagList({
      value,
      defaultValue,
      onChange,
      disabled,
      maxTags,
      allowDuplicates,
      validateTag,
    })
    const draft = useTagDraft(splitPattern)
    const listbox = useSuggestionsListbox({
      suggestions,
      query: draft.value,
      tags: list.tags,
      allowDuplicates,
      match: suggestionsMatch,
      limit: suggestionsLimit,
      excludeSelected: suggestionsExcludeSelected,
      loading: suggestionsLoading,
      disabled,
      getOptionDisabled,
      onQueryChange: onSuggestionsQueryChange,
    })
    const mergedInputRef = useMergeRefs<HTMLInputElement>([ref, inputRef, listbox.setReference])

    /** Набранные подписи → теги; без `allowCustomTags` — только точные совпадения с пунктами. */
    const addLabels = (labels: string[]) => {
      if (labels.length === 0) return
      const items = allowCustomTags
        ? labels
        : labels.flatMap((lbl) => {
            const row = listbox.findOptionByLabel(lbl)
            return row ? [tagValueFromSuggestionRow(row)] : []
          })
      list.addTags(items)
    }

    /** Выбор пункта: добавить тег или (в режиме с галочками) снять уже выбранный. */
    const pickOption = (row: NormalizedSuggestion) => {
      if (listbox.isOptionDisabled(row)) return
      if (listbox.showCheckmarks && listbox.isOptionSelected(row)) {
        list.removeWhere((tag) => tagMatchesSuggestion(tag, row))
        return
      }
      if (list.addTags([tagValueFromSuggestionRow(row)])) draft.clear()
    }

    /** Удаление кнопкой на чипе: фокус не теряется вместе с удалённой кнопкой, а уходит в поле. */
    const removeChip = (index: number) => {
      const input = inputRef.current
      const focused = input?.ownerDocument.activeElement
      const focusOnChip = focused !== input && !!anchorRef.current?.contains(focused ?? null)
      list.removeAt(index)
      if (focusOnChip && input) {
        input.focus()
        // Фокус вернули программно — список не открываем, пока пользователь не начнёт ввод
        listbox.dismiss()
      }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented || e.nativeEvent.isComposing) return
      const { activeOption } = listbox
      switch (e.key) {
        case 'Enter':
          // Не отправляем форму: Enter в этом поле — добавление тега
          e.preventDefault()
          if (activeOption) pickOption(activeOption)
          else addLabels(draft.take())
          break
        case ',':
        case ';':
          e.preventDefault()
          addLabels(draft.take())
          break
        case 'Tab':
          // Tab принимает подсвеченный пункт и уводит фокус дальше — ловушки фокуса нет
          if (activeOption && !e.shiftKey) {
            pickOption(activeOption)
            draft.clear()
          }
          break
        case 'Backspace':
          if (e.currentTarget.value === '' && list.tags.length > 0) {
            e.preventDefault()
            list.removeAt(list.tags.length - 1)
          }
          break
      }
    }

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      listbox.setFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      listbox.setFocused(false)
      if (commitOnBlur && !disabled) addLabels(draft.take())
      onBlur?.(e)
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(e)
      if (e.defaultPrevented) return
      const labels = draft.takePaste(e)
      if (labels) addLabels(labels)
    }

    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
      onClick?.(e)
      listbox.reopen()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      draft.setValue(e.target.value)
      listbox.reopen()
    }

    const visibleTags =
      maxTagCount != null ? list.tags.slice(0, Math.max(0, maxTagCount)) : list.tags

    return (
      <InputField
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={error}
        completed={completed}
        completedColor={completedColor}
        filled={list.tags.length > 0}
        prefix={prefix}
        suffix={suffix}
        startBlock={startBlock}
        endBlock={endBlock}
        size={size}
        disabled={disabled}
        className={className}
        wrapperClassName={clsx(tagInputContract.className, wrapperClassName)}
        wrapperStyle={{ ...wrapperStyle, height: 'auto' }}
        id={id}
      >
        {(fieldId, control) => (
          <>
            <div
              ref={anchorRef}
              className={contractPart(tagInputContract, 'tags-scroll-area')}
              style={tagsAreaStyle(tagsAreaMaxHeight)}
            >
              <div className={contractPart(tagInputContract, 'tags-shell')}>
                <TagChips
                  visibleTags={visibleTags}
                  hiddenTagCount={list.tags.length - visibleTags.length}
                  tagVariant={tagVariant}
                  disabled={disabled}
                  removeTagLabel={removeTagLabel}
                  renderTag={renderTag}
                  maxTagCountOverflow={maxTagCountOverflow}
                  onRemoveAt={removeChip}
                />
                <BaseInput
                  {...control}
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...listbox.getComboboxProps({
                    ...inputProps,
                    onKeyDown: handleKeyDown,
                    onFocus: handleFocus,
                    onBlur: handleBlur,
                    onPaste: handlePaste,
                    onClick: handleClick,
                  })}
                  ref={mergedInputRef}
                  size={size}
                  hasError={!!error}
                  disabled={disabled}
                  className={contractPart(tagInputContract, 'input-inner')}
                  placeholder={placeholder}
                  value={draft.value}
                  onChange={handleChange}
                  data-lpignore="true"
                  data-1p-ignore=""
                  data-bwignore=""
                  autoComplete="off"
                />
              </div>
            </div>

            {listbox.enabled ? (
              <SuggestionsPopover
                listbox={listbox}
                listboxRef={listbox.setListbox}
                anchorRef={anchorRef}
                loadingText={suggestionsLoadingText}
                emptyText={suggestionsEmptyText}
                labelledBy={label ? inputFieldLabelId(fieldId) : inputProps['aria-labelledby']}
                ariaLabel={inputProps['aria-label']}
                onPick={pickOption}
              />
            ) : null}
          </>
        )}
      </InputField>
    )
  }
)

TagInput.displayName = 'TagInput'
