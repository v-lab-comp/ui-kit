import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { RiLinkM, RiFileCopyLine, RiCheckLine } from '@remixicon/react'
import { InputField, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { shareLinkInputContract } from '@/theme/contracts/share-link-input'
import type { ShareLinkInputProps } from './ShareLinkInput.types'

const COPIED_DURATION_MS = 2000

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text.trim()) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const ShareLinkInput = forwardRef<HTMLInputElement, ShareLinkInputProps>(
  (props, forwardedRef) => {
    const [field, rest] = splitInputFieldProps(props)
    const { value, onCopy, ...inputProps } = rest
    const { disabled } = field
    const size = field.size ?? 'medium'
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(
      () => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      },
      []
    )

    const handleRef = useMergeRefs([inputRef, forwardedRef])

    const handleCopy = () => {
      if (disabled) return
      const text = value !== undefined ? String(value) : (inputRef.current?.value ?? '')
      copyToClipboard(text).then((ok) => {
        if (ok) {
          onCopy?.(text)
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          setCopied(true)
          timeoutRef.current = setTimeout(() => {
            setCopied(false)
            timeoutRef.current = null
          }, COPIED_DURATION_MS)
        }
      })
    }

    const defaultPrefix = field.prefix ?? <RiLinkM size={20} />
    const defaultEndBlock =
      field.endBlock !== undefined ? (
        field.endBlock
      ) : (
        <button
          type="button"
          className={contractPart(shareLinkInputContract, 'copy-button')}
          onClick={handleCopy}
          disabled={disabled}
          aria-label={copied ? 'Copied' : 'Copy link'}
          tabIndex={-1}
        >
          {copied ? (
            <>
              <RiCheckLine
                size={20}
                className={contractPart(shareLinkInputContract, 'copy-icon')}
              />
              <span className={contractPart(shareLinkInputContract, 'copy-label')}>Copied!</span>
            </>
          ) : (
            <>
              <RiFileCopyLine
                size={20}
                className={contractPart(shareLinkInputContract, 'copy-icon')}
              />
              <span className={contractPart(shareLinkInputContract, 'copy-label')}>Copy</span>
            </>
          )}
        </button>
      )

    return (
      <InputField
        {...field}
        prefix={defaultPrefix}
        endBlock={defaultEndBlock}
        size={size}
        className={clsx(shareLinkInputContract.className, field.className)}
      >
        {(_id, control) => (
          <BaseInput
            ref={handleRef}
            {...control}
            type="url"
            size={size}
            hasError={!!field.error}
            disabled={disabled}
            className={contractPart(shareLinkInputContract, 'input-inner')}
            value={value}
            {...inputProps}
          />
        )}
      </InputField>
    )
  }
)

ShareLinkInput.displayName = 'ShareLinkInput'
