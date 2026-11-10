import { useState } from 'react'
import {
  Toast,
  ToastAction,
  useToast,
  ToastProvider,
  TOAST_COLOR_OPTIONS,
  TOAST_VARIANT_OPTIONS,
  TOAST_POSITION_OPTIONS,
} from '@/components/Toast'
import type {
  ToastColor,
  ToastPosition,
  ToastProps,
  ToastVariant,
} from '@/components/Toast/Toast.types'
import { Button } from '@/components/Button'
import styles from './ToastGalleryPage.module.css'

function getColorLabel(v: ToastColor): string {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

const defaultActions = [
  <ToastAction key="upgrade" onClick={() => {}}>
    Upgrade
  </ToastAction>,
  <ToastAction key="learn" onClick={() => {}}>
    Learn More
  </ToastAction>,
]

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

/** Секция-сетка: колонка на каждый вариант, в колонке — тост каждого цвета. */
function ToastVariantColumns({
  colors = TOAST_COLOR_OPTIONS,
  ...toastProps
}: Omit<ToastProps, 'variant' | 'color'> & { colors?: readonly ToastColor[] }) {
  return (
    <div className={styles.fourColumnsScrollWrap}>
      <div className={styles.fourColumns}>
        {TOAST_VARIANT_OPTIONS.map((variant) => (
          <div key={variant} className={styles.variantsStack}>
            {colors.map((color) => (
              <Toast
                key={color}
                variant={variant}
                color={color}
                onClose={() => {}}
                {...toastProps}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function LiveDemoButtons({ variant }: { variant: ToastVariant }) {
  const toast = useToast()
  return (
    <div className={styles.triggerRow}>
      {TOAST_COLOR_OPTIONS.map((color) => (
        <Button
          key={color}
          onClick={() =>
            toast.add(color, {
              title: `${getColorLabel(color)}: Insert your alert title here!`,
              description:
                'Insert the alert description here. It would look better as two lines of text.',
              variant,
              actions: defaultActions,
            })
          }
          color={TRIGGER_BUTTON_COLOR[color]}
          variant="filled"
        >
          {getColorLabel(color)}
        </Button>
      ))}
    </div>
  )
}

function LiveDemoSection() {
  const [position, setPosition] = useState<ToastPosition>('top-right')
  const [duration, setDuration] = useState(5000)
  const [maxToasts, setMaxToasts] = useState(5)
  const [gap, setGap] = useState(12)
  const [offset, setOffset] = useState(24)
  const [pauseOnHover, setPauseOnHover] = useState(true)
  const [variant, setVariant] = useState<ToastVariant>('filled')
  const [key, setKey] = useState(0)
  const reset = () => setKey((k) => k + 1)

  return (
    <section className={`${styles.section} ${styles.triggerSection}`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Живой демо (ToastProvider)</h2>
        <p className={styles.sectionDescription}>
          Настройте параметры и нажмите цветную кнопку. Тост появится в выбранной позиции.
        </p>
      </div>

      <div className={styles.controlsGrid}>
        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Position</span>
          <select
            className={styles.controlSelect}
            value={position}
            onChange={(e) => {
              setPosition(e.target.value as ToastPosition)
              reset()
            }}
          >
            {TOAST_POSITION_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Duration (ms)</span>
          <input
            type="number"
            className={styles.controlInput}
            value={duration}
            min={0}
            step={500}
            onChange={(e) => {
              setDuration(Number(e.target.value))
              reset()
            }}
          />
        </label>

        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Max Toasts</span>
          <input
            type="number"
            className={styles.controlInput}
            value={maxToasts}
            min={1}
            max={20}
            onChange={(e) => {
              setMaxToasts(Number(e.target.value))
              reset()
            }}
          />
        </label>

        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Gap (px)</span>
          <input
            type="number"
            className={styles.controlInput}
            value={gap}
            min={0}
            max={48}
            onChange={(e) => {
              setGap(Number(e.target.value))
              reset()
            }}
          />
        </label>

        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Offset (px)</span>
          <input
            type="number"
            className={styles.controlInput}
            value={offset}
            min={0}
            max={100}
            onChange={(e) => {
              setOffset(Number(e.target.value))
              reset()
            }}
          />
        </label>

        <label className={styles.controlLabel}>
          <span className={styles.controlName}>Variant</span>
          <select
            className={styles.controlSelect}
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

        <label className={styles.controlCheckbox}>
          <input
            type="checkbox"
            checked={pauseOnHover}
            onChange={(e) => {
              setPauseOnHover(e.target.checked)
              reset()
            }}
          />
          <span className={styles.controlName}>Pause on hover</span>
        </label>
      </div>

      <ToastProvider
        key={key}
        position={position}
        duration={duration}
        maxToasts={maxToasts}
        gap={gap}
        offset={offset}
        pauseOnHover={pauseOnHover}
      >
        <LiveDemoButtons variant={variant} />
      </ToastProvider>
    </section>
  )
}

export function ToastGalleryPage() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>Toast Gallery</h1>
          <p className={styles.subtitle}>
            Варианты filled, light, lighter и stroke для всех цветов (error, warning, success, info,
            neutral) — с описанием, действиями и кнопкой закрытия.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Filled, Light, Lighter и Stroke</h2>
            <p className={styles.sectionDescription}>
              Четыре колонки: filled, light, lighter, stroke. Заголовок, описание и кнопки действий.
            </p>
          </div>
          <ToastVariantColumns
            title="Insert your alert title here!"
            description="Insert the alert description here. It would look better as two lines of text."
            actions={defaultActions}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Без кнопок действий</h2>
            <p className={styles.sectionDescription}>
              Заголовок и описание, только крестик закрытия.
            </p>
          </div>
          <ToastVariantColumns
            title="Insert your alert title here!"
            description="Insert the alert description here. It would look better as two lines of text."
          />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Только заголовок</h2>
            <p className={styles.sectionDescription}>
              Один заголовок, одна кнопка действия и крестик закрытия.
            </p>
          </div>
          <ToastVariantColumns
            title="Insert your alert title here!"
            actions={[
              <ToastAction key="upgrade" onClick={() => {}}>
                Upgrade
              </ToastAction>,
            ]}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Много кнопок — перенос строки</h2>
            <p className={styles.sectionDescription}>
              Разделитель «·» при переносе остаётся на предыдущей строке.
            </p>
          </div>
          <ToastVariantColumns
            colors={TOAST_COLOR_OPTIONS.slice(0, 1)}
            title="Insert your alert title here!"
            description="Разделители и перенос — автоматически."
            actions={['Upgrade', 'Learn More', 'View Details', 'Dismiss'].map((label) => (
              <ToastAction key={label} onClick={() => {}}>
                {label}
              </ToastAction>
            ))}
          />
        </section>

        <LiveDemoSection />
      </div>
    </div>
  )
}
