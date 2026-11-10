import { forwardRef, type Ref } from 'react'
import { BaseInput } from '../base/BaseInput'
import { InputField } from '../base/InputField'
import { useTagInputController } from './hooks/controller'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'
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
      disabled,
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
      removeTagLabel = (tag: TagInputTagValue) => `Remove ${tagLabel(tag)}`,
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
      ...inputProps
    },
    ref
  ) => {
    const ctrl = useTagInputController({
      value,
      defaultValue,
      onChange,
      disabled,
      maxTags,
      maxTagCount,
      allowDuplicates,
      allowCustomTags,
      commitOnBlur,
      splitPattern,
      validateTag,
      suggestions,
      suggestionsMatch,
      suggestionsLimit,
      suggestionsExcludeSelected,
      suggestionsLoading,
      suggestionsLoadingText,
      suggestionsEmptyText,
      getOptionDisabled,
      onSuggestionsQueryChange,
      tagsAreaMaxHeight,
      wrapperClassName,
      wrapperStyle,
      inputProps,
    })

    const suggestionsDefined = suggestions != null

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
        filled={ctrl.visibleTags.length > 0 || ctrl.hiddenTagCount > 0}
        prefix={prefix}
        suffix={suffix}
        startBlock={startBlock}
        endBlock={endBlock}
        size={size}
        disabled={disabled}
        className={className}
        wrapperClassName={ctrl.mergedWrapperClass}
        wrapperStyle={ctrl.mergedWrapperStyle}
        id={id}
      >
        {(fieldId) => (
          <>
            <div
              ref={ctrl.anchorRef as Ref<HTMLDivElement>}
              className={contractPart(tagInputContract, 'tags-scroll-area')}
              style={ctrl.scrollAreaStyle}
            >
              <div className={contractPart(tagInputContract, 'tags-shell')}>
                <TagChips
                  visibleTags={ctrl.visibleTags}
                  hiddenTagCount={ctrl.hiddenTagCount}
                  tagVariant={tagVariant}
                  disabled={!!disabled}
                  removeTagLabel={removeTagLabel}
                  renderTag={renderTag}
                  maxTagCountOverflow={maxTagCountOverflow}
                  onRemoveAt={ctrl.removeAt}
                />
                <BaseInput
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...inputProps}
                  {...ctrl.inputHandlers}
                  ref={ref}
                  id={fieldId}
                  size={size}
                  hasError={!!error}
                  disabled={disabled}
                  className={contractPart(tagInputContract, 'input-inner')}
                  placeholder={placeholder}
                  value={ctrl.draft}
                  role={ctrl.comboboxAria.role}
                  aria-expanded={ctrl.comboboxAria.ariaExpanded}
                  aria-controls={ctrl.comboboxAria.ariaControls}
                  aria-autocomplete={ctrl.comboboxAria.ariaAutocomplete}
                  aria-activedescendant={ctrl.comboboxAria.ariaActiveDescendant}
                  data-lpignore="true"
                  data-1p-ignore=""
                  data-bwignore=""
                  autoComplete="off"
                />
              </div>
            </div>

            {suggestionsDefined ? (
              <SuggestionsPopover
                open={ctrl.panelOpen}
                anchorRef={ctrl.anchorRef}
                popoverMinWidth={ctrl.popoverMinWidth}
                suggestionsListId={ctrl.suggestionsListId}
                suggestionsLoading={ctrl.suggestionsLoading}
                suggestionsLoadingText={ctrl.suggestionsLoadingText}
                suggestionsEmptyText={ctrl.suggestionsEmptyText}
                filtered={ctrl.filtered}
                highlightIndex={ctrl.highlightIndex}
                isOptionDisabled={ctrl.isOptionDisabled}
                showCheckmarks={ctrl.suggestionsShowCheckmarks}
                isRowSelected={ctrl.isSuggestionSelected}
                onPick={ctrl.pickSuggestion}
              />
            ) : null}
          </>
        )}
      </InputField>
    )
  }
)

TagInput.displayName = 'TagInput'
