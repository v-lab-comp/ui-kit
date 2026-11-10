import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { useCompositeInput } from '../base/useCompositeInput'
import { SelectInput } from '../SelectInput'
import { contractPart } from '@/theme/contract'
import { siteInputContract } from '@/theme/contracts/site-input'
import type { SiteInputProps } from './SiteInput.types'

/** Match any scheme like https://, http://, ftp://, ssh:// */
const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//

function splitProtocol(url: string, fallback: string): [string, string] {
  const match = url.match(PROTOCOL_RE)
  if (match) return [match[0], url.slice(match[0].length)]
  return [fallback, url]
}

export const SiteInput = forwardRef<HTMLInputElement, SiteInputProps>(
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
      protocol = 'https://',
      protocolOptions,
      id,
      size = 'medium',
      disabled,
      className,
      value,
      defaultValue,
      onChange,
      name,
      ...inputProps
    },
    ref
  ) => {
    const defaultProtocol = protocolOptions?.[0]?.value ?? protocol

    const { parts, notifyParts, hiddenInputs } = useCompositeInput<[string, string]>({
      value: value as string | undefined,
      defaultValue: defaultValue as string | undefined,
      onChange,
      name,
      split: (url) => splitProtocol(url, defaultProtocol),
      join: ([proto, path]) => proto + path,
      formNames: ['protocol'],
    })

    const [currentProtocol, currentPath] = parts

    const showCompletedChrome = !!(completed && !error && !disabled)

    const startBlock = protocolOptions ? (
      <SelectInput
        variant="inline"
        options={protocolOptions}
        value={currentProtocol}
        onChange={(e) => notifyParts([e.target.value, currentPath])}
        size={size}
        disabled={disabled}
        placement="bottom"
        completed={showCompletedChrome}
        completedColor={completedColor}
      />
    ) : (
      currentProtocol
    )

    return (
      <>
        {hiddenInputs}
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
          prefix={prefix}
          suffix={suffix}
          startBlock={startBlock}
          endBlock={endBlock}
          size={size}
          disabled={disabled}
          className={clsx(siteInputContract.className, className)}
          id={id}
        >
          {(_fieldId, control) => (
            <BaseInput
              ref={ref}
              {...control}
              type="text"
              inputMode="url"
              autoComplete="url"
              size={size}
              hasError={!!error}
              disabled={disabled}
              className={contractPart(siteInputContract, 'input-inner')}
              value={currentPath}
              onChange={(e) => notifyParts([currentProtocol, e.target.value])}
              {...inputProps}
            />
          )}
        </InputField>
      </>
    )
  }
)

SiteInput.displayName = 'SiteInput'
