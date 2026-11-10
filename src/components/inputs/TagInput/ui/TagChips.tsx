import { Tag } from '@/components/Tag'
import type { TagVariant } from '@/components/Tag'
import { chipKey } from '../model'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'
import type { TagInputProps, TagInputTagValue } from '../types'
import { tagLabel } from '../types'

export type TagChipsProps = {
  visibleTags: TagInputTagValue[]
  hiddenTagCount: number
  tagVariant: TagVariant
  disabled: boolean
  removeTagLabel: (tag: TagInputTagValue) => string
  renderTag: TagInputProps['renderTag']
  maxTagCountOverflow: TagInputProps['maxTagCountOverflow']
  onRemoveAt: (index: number) => void
}

export function TagChips({
  visibleTags,
  hiddenTagCount,
  tagVariant,
  disabled,
  removeTagLabel,
  renderTag,
  maxTagCountOverflow,
  onRemoveAt,
}: TagChipsProps) {
  return (
    <>
      {visibleTags.map((tag, index) => {
        // Имя кнопки удаления содержит текст тега: «Remove React», а не безликое «Remove»
        const removeLabel = removeTagLabel(tag)
        return renderTag ? (
          <span
            key={chipKey(tag, index)}
            className={contractPart(tagInputContract, 'render-tag-wrap')}
          >
            {renderTag({
              tag,
              index,
              disabled,
              removeLabel,
              onRemove: disabled ? () => {} : () => onRemoveAt(index),
            })}
          </span>
        ) : (
          <Tag
            key={chipKey(tag, index)}
            variant={tagVariant}
            disabled={disabled}
            onDismiss={disabled ? undefined : () => onRemoveAt(index)}
            dismissLabel={removeLabel}
          >
            {tagLabel(tag)}
          </Tag>
        )
      })}
      {hiddenTagCount > 0 ? (
        <span className={contractPart(tagInputContract, 'more-tags')}>
          {maxTagCountOverflow ? maxTagCountOverflow(hiddenTagCount) : `+${hiddenTagCount}`}
        </span>
      ) : null}
    </>
  )
}
