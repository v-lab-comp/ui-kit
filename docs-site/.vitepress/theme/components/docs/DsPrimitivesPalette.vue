<script setup lang="ts">
import { computed } from 'vue'
import { colors } from '@/colors/primitives'

/** Совпадает с порядком и названиями в Storybook ColorsPage — источник hex: `src/colors/primitives.ts` ← `primitives.css` */
const SCALE_ORDER = [
  '950',
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '50',
  '0',
] as const
const DARK_STEPS = new Set(['400', '500', '600', '700', '800', '900', '950'])

const PALETTE_NAMES: Record<string, string> = {
  slate: 'Slate',
  blue: 'Blue',
  orange: 'Orange',
  red: 'Red',
  green: 'Green',
  yellow: 'Yellow',
  purple: 'Purple',
  sky: 'Sky',
  pink: 'Pink',
  teal: 'Teal',
  neutral: 'Neutral / Gray',
}

const PALETTE_ORDER = [
  'neutral',
  'slate',
  'blue',
  'orange',
  'red',
  'green',
  'yellow',
  'purple',
  'sky',
  'pink',
  'teal',
] as const

function getSteps(scale: Record<string, string>): string[] {
  return SCALE_ORDER.filter((step) => step in scale)
}

function isDarkStep(step: string): boolean {
  return DARK_STEPS.has(step)
}

const palettes = computed(() => {
  const out: Array<{
    key: string
    displayName: string
    steps: string[]
    scale: Record<string, string>
  }> = []
  for (const key of PALETTE_ORDER) {
    const scale = colors[key as keyof typeof colors] as Record<string, string> | undefined
    if (!scale) continue
    out.push({
      key,
      displayName: PALETTE_NAMES[key] ?? key,
      steps: getSteps(scale),
      scale,
    })
  }
  return out
})
</script>

<template>
  <div class="ds-primitives">
    <p class="ds-primitives__intro">
      Шкалы из
      <code>src/skins/corporate/primitives.css</code>
      (hex берём из сгенерированного
      <code>src/colors/primitives.ts</code>
      — после правок CSS запускай
      <code>npm run gen:primitives</code>
      ).
    </p>
    <section v-for="p in palettes" :key="p.key" class="ds-primitives__section">
      <h2 class="ds-primitives__h2">{{ p.displayName }}</h2>
      <p class="ds-primitives__desc">
        Примитивы:
        <code>{{ p.key }}-…</code>
        — в UI используй семантические токены из
        <code>tokens.css</code>.
      </p>
      <div class="ds-primitives__grid">
        <div
          v-for="step in p.steps"
          :key="step"
          class="ds-primitives__swatch"
          :class="{ 'ds-primitives__swatch--dark': isDarkStep(step) }"
          :style="{ backgroundColor: p.scale[step] ?? '#ccc' }"
        >
          <span class="ds-primitives__swatch-title">{{ p.displayName }} [{{ step }}]</span>
          <span class="ds-primitives__swatch-hex">{{ p.scale[step] }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ds-primitives {
  margin: 1rem 0 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ds-primitives__intro {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ds-primitives__section {
  margin-bottom: 2rem;
}

.ds-primitives__section:last-child {
  margin-bottom: 0;
}

.ds-primitives__h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.ds-primitives__desc {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ds-primitives__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.ds-primitives__swatch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 120px;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  color: #171717;
}

.ds-primitives__swatch--dark {
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.ds-primitives__swatch-title {
  font-size: 0.8125rem;
  font-weight: 600;
}

.ds-primitives__swatch-hex {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: ui-monospace, monospace;
  opacity: 0.85;
}
</style>
