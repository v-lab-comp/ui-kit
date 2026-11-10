import { useState, type CSSProperties, type ReactNode } from 'react'
import { Button } from '@/components/Button'
import { Toast, ToastAction, ToastProvider, useToast } from '@/components/Toast'
import { TOAST_COLOR_OPTIONS, TOAST_VARIANT_OPTIONS } from '@/components/Toast/Toast.types'
import type { ToastColor, ToastVariant } from '@/components/Toast/Toast.types'

const defaultActions = [
  <ToastAction key="upgrade" onClick={() => {}}>
    Upgrade
  </ToastAction>,
  <ToastAction key="learn" onClick={() => {}}>
    Learn More
  </ToastAction>,
]

const desc = 'Insert the alert description here. It would look better as two lines of text.'
const titleSample = 'Insert your alert title here!'

const manyActions = ['Upgrade', 'Learn More', 'View Details', 'Dismiss'].map((label) => (
  <ToastAction key={label} onClick={() => {}}>
    {label}
  </ToastAction>
))

function getColorLabel(v: ToastColor): string {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

const TRIGGER_BUTTON_COLOR: Record<
  ToastColor,
  'error' | 'warning' | 'success' | 'information' | 'neutral'
> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'information',
  neutral: 'neutral',
}

const sectionLabel: CSSProperties = {
  margin: '0 0 12px',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-soft-400, #99a0ae)',
}

const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

const hint: CSSProperties = {
  margin: '0 0 12px',
  fontSize: 13,
  lineHeight: 1.45,
  color: 'var(--text-sub-600, #525866)',
}

const gallerySection: CSSProperties = {
  marginBottom: 24,
  padding: '24px 28px',
  background: 'var(--bg-white-0)',
  borderRadius: 12,
  border: '1px solid var(--stroke-soft-200)',
  boxShadow: 'var(--shadow-regular-x-small)',
}

const gallerySectionHeader: CSSProperties = {
  marginBottom: 20,
  paddingBottom: 12,
  borderBottom: '1px solid var(--stroke-soft-200)',
}

const gallerySectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--text-strong-950)',
  letterSpacing: '-0.01em',
}

const gallerySectionDesc: CSSProperties = {
  margin: '6px 0 0 0',
  fontSize: 13,
  color: 'var(--text-sub-600)',
  lineHeight: 1.45,
}

const columnVariantLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
  textTransform: 'capitalize',
}

/** Полная ширина контейнера; колонки не уже 390px — как у .toast (min-width), иначе карточки наезжают. */
const scrollWrap: CSSProperties = {
  width: '100%',
  minWidth: 0,
}

const variantColumnsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))',
  gap: 24,
  alignItems: 'start',
  width: '100%',
  boxSizing: 'border-box',
}

const variantsStack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 0,
  width: '100%',
}

const selectStyle: CSSProperties = {
  padding: '6px 10px',
  borderRadius: 8,
  border: '1px solid var(--stroke-soft-200)',
  fontSize: 13,
  background: 'var(--bg-white-0)',
  color: 'var(--text-strong-950)',
  minWidth: 140,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

const labelRow: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginBottom: 16,
}

const labelText: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--text-sub-600)',
}

function ToastVariantColorGrid({
  heading,
  description,
  render,
}: {
  heading: string
  description: string
  render: (variant: ToastVariant, color: ToastColor) => ReactNode
}) {
  return (
    <section style={gallerySection}>
      <div style={gallerySectionHeader}>
        <h3 style={gallerySectionTitle}>{heading}</h3>
        <p style={gallerySectionDesc}>{description}</p>
      </div>
      <div style={scrollWrap}>
        <div style={variantColumnsGrid}>
          {TOAST_VARIANT_OPTIONS.map((variant) => (
            <div key={variant} style={variantsStack}>
              <span style={columnVariantLabel}>{variant}</span>
              {TOAST_COLOR_OPTIONS.map((color) => (
                <div key={`${variant}-${color}`} style={{ minWidth: 0 }}>
                  {render(variant, color)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ToastLiveTriggers({ variant }: { variant: ToastVariant }) {
  const toast = useToast()
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginTop: 16 }}
    >
      {TOAST_COLOR_OPTIONS.map((color) => (
        <Button
          key={color}
          type="button"
          color={TRIGGER_BUTTON_COLOR[color]}
          variant="filled"
          onClick={() =>
            toast.add(color, {
              title: `${getColorLabel(color)}: Insert your alert title here!`,
              description: desc,
              variant,
              actions: defaultActions,
            })
          }
        >
          {getColorLabel(color)}
        </Button>
      ))}
    </div>
  )
}

function ToastGalleryLiveDemo() {
  const [variant, setVariant] = useState<ToastVariant>('filled')
  return (
    <section
      style={{
        ...gallerySection,
        background: 'linear-gradient(135deg, var(--bg-white-0) 0%, var(--bg-weak-50) 100%)',
        borderColor: 'var(--stroke-sub-300)',
      }}
    >
      <div style={gallerySectionHeader}>
        <h3 style={gallerySectionTitle}>Живой демо (ToastProvider)</h3>
        <p style={gallerySectionDesc}>
          Выберите вариант заливки и нажмите цветную кнопку — тост появится в углу экрана (как в
          Storybook Live Demo).
        </p>
      </div>
      <label style={labelRow}>
        <span style={labelText}>Variant</span>
        <select
          style={selectStyle}
          value={variant}
          onChange={(e) => setVariant(e.target.value as ToastVariant)}
        >
          {TOAST_VARIANT_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <ToastProvider
        position="top-right"
        duration={5000}
        maxToasts={5}
        gap={12}
        offset={24}
        pauseOnHover
      >
        <ToastLiveTriggers variant={variant} />
      </ToastProvider>
    </section>
  )
}

function ToastLiveDemoSection() {
  const toast = useToast()
  return (
    <section>
      <p style={sectionLabel}>Живой пример (useToast)</p>
      <p style={hint}>
        Нажмите кнопку — тост добавится в очередь и появится в углу экрана (как в приложении с{' '}
        <code style={{ fontSize: 12 }}>ToastProvider</code>).
      </p>
      <Button
        type="button"
        color="success"
        variant="filled"
        onClick={() =>
          toast.add('success', {
            title: titleSample,
            description: desc,
            variant: 'filled',
            size: 'large',
            actions: defaultActions,
          })
        }
      >
        Показать тост
      </Button>
    </section>
  )
}

/** Верхнее превью — useToast + один статичный пример как в блоке «Пример» в доке */
function ToastPreviewInner() {
  return (
    <div style={{ ...stack, maxWidth: 520, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <ToastLiveDemoSection />

      <section>
        <p style={sectionLabel}>Статичная плашка</p>
        <Toast
          color="success"
          variant="light"
          size="large"
          title="Сохранено"
          description="Изменения применены."
          onClose={() => {}}
          actions={[
            <ToastAction key="undo" onClick={() => {}}>
              Отменить
            </ToastAction>,
          ]}
        />
      </section>
    </div>
  )
}

export function ToastDocsDemo() {
  return (
    <ToastProvider position="top-right" duration={6000}>
      <ToastPreviewInner />
    </ToastProvider>
  )
}

const singleUpgrade = [
  <ToastAction key="upgrade" onClick={() => {}}>
    Upgrade
  </ToastAction>,
]

/**
 * Полная галерея как `src/docs/ToastGalleryPage.tsx` и Storybook: сетки вариант × цвет,
 * компактные размеры, живой демо с кнопками.
 */
export function ToastGalleryDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        minWidth: 0,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <section style={gallerySection}>
        <div style={gallerySectionHeader}>
          <h3 style={gallerySectionTitle}>Размеры (Storybook: X-Small, Small, Large)</h3>
          <p style={gallerySectionDesc}>Компактные высоты без описания и полная карточка large.</p>
        </div>
        <div style={{ ...stack, maxWidth: 520 }}>
          <span style={{ fontSize: 12, color: 'var(--text-sub-600)' }}>X-Small (32px)</span>
          <Toast
            color="warning"
            variant="filled"
            size="x-small"
            title={titleSample}
            actions={singleUpgrade}
            onClose={() => {}}
          />
          <span style={{ fontSize: 12, color: 'var(--text-sub-600)' }}>Small (36px)</span>
          <Toast
            color="success"
            variant="filled"
            size="small"
            title={titleSample}
            actions={singleUpgrade}
            onClose={() => {}}
          />
          <span style={{ fontSize: 12, color: 'var(--text-sub-600)' }}>
            Large — заголовок и описание
          </span>
          <Toast
            color="neutral"
            variant="filled"
            size="large"
            title={titleSample}
            description={desc}
            actions={defaultActions}
            onClose={() => {}}
          />
        </div>
      </section>

      <ToastVariantColorGrid
        heading="Filled, Light, Lighter и Stroke"
        description="Четыре колонки: filled, light, lighter, stroke — по всем цветам. Заголовок, описание и кнопки действий."
        render={(variant, color) => (
          <Toast
            variant={variant}
            color={color}
            size="large"
            title={titleSample}
            description={desc}
            actions={defaultActions}
            onClose={() => {}}
          />
        )}
      />

      <ToastVariantColorGrid
        heading="Без кнопок действий"
        description="Заголовок и описание, только крестик закрытия."
        render={(variant, color) => (
          <Toast
            variant={variant}
            color={color}
            size="large"
            title={titleSample}
            description={desc}
            onClose={() => {}}
          />
        )}
      />

      <ToastVariantColorGrid
        heading="Только заголовок"
        description="Один заголовок, одна кнопка действия и крестик закрытия."
        render={(variant, color) => (
          <Toast
            variant={variant}
            color={color}
            size="large"
            title={titleSample}
            actions={singleUpgrade}
            onClose={() => {}}
          />
        )}
      />

      <section style={gallerySection}>
        <div style={gallerySectionHeader}>
          <h3 style={gallerySectionTitle}>Много кнопок — перенос строки</h3>
          <p style={gallerySectionDesc}>
            Разделитель «·» при переносе остаётся на предыдущей строке.
          </p>
        </div>
        <div style={scrollWrap}>
          <div style={variantColumnsGrid}>
            {TOAST_VARIANT_OPTIONS.map((variant) => (
              <div key={variant} style={variantsStack}>
                <span style={columnVariantLabel}>{variant}</span>
                <Toast
                  variant={variant}
                  color="error"
                  size="large"
                  title={titleSample}
                  description="Разделители и перенос — автоматически."
                  actions={manyActions}
                  onClose={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToastGalleryLiveDemo />
    </div>
  )
}
