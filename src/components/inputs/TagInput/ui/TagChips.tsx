import { Tag } from '@/components/Tag'
import type { TagVariant } from '@/components/Tag'
import { chipKey } from '../model'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'
import type { TagInputProps } from '../types'
import type { TagInputTagValue } from '../types'
import { tagLabel } from '../types'

type RenderTagFn = NonNullable<TagInputProps['renderTag']>

export type TagChipsProps = {
  visibleTags: TagInputTagValue[]
  hiddenTagCount: number
  tagVariant: TagVariant
  disabled: boolean
  removeTagLabel: (tag: TagInputTagValue) => string
  renderTag: RenderTagFn | undefined
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
      {visibleTags.map((tag, index) =>
        renderTag ? (
          <span
            key={chipKey(tag, index)}
            className={contractPart(tagInputContract, 'render-tag-wrap')}
          >
            {renderTag({
              tag,
              index,
              disabled: !!disabled,
              onRemove: disabled ? () => {} : () => onRemoveAt(index),
            })}
          </span>
        ) : (
          <Tag
            key={chipKey(tag, index)}
            variant={tagVariant}
            disabled={disabled}
            onDismiss={disabled ? undefined : () => onRemoveAt(index)}
            dismissLabel={removeTagLabel(tag)}
          >
            {tagLabel(tag)}
          </Tag>
        )
      )}
      {hiddenTagCount > 0 ? (
        <span className={contractPart(tagInputContract, 'more-tags')}>
          {maxTagCountOverflow ? maxTagCountOverflow(hiddenTagCount) : `+${hiddenTagCount}`}
        </span>
      ) : null}
    </>
  )
}
