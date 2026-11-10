import clsx from 'clsx'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { RiLinkM, RiFileCopyLine, RiCheckLine } from '@remixicon/react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
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
      endBlock,
      id,
      size = 'medium',
      disabled,
      className,
      value,
      onCopy,
      ...inputProps
    },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(
      () => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      },
      []
    )

    const handleRef = useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el
        if (typeof forwardedRef === 'function') forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      },
      [forwardedRef]
    )

    const handleCopy = useCallback(() => {
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
    }, [disabled, value, onCopy])

    const defaultPrefix = prefix ?? <RiLinkM size={20} />
    const defaultEndBlock =
      endBlock !== undefined ? (
        endBlock
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
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={error}
        completed={completed}
        completedColor={completedColor}
        prefix={defaultPrefix}
        suffix={suffix}
        endBlock={defaultEndBlock}
        size={size}
        disabled={disabled}
        className={clsx(shareLinkInputContract.className, className)}
        id={id}
      >
        {(fieldId) => (
          <BaseInput
            ref={handleRef}
            id={fieldId}
            type="url"
            size={size}
            hasError={!!error}
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
