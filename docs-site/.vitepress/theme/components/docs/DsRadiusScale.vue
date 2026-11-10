<script setup lang="ts">
/** Имена и значения как в `src/skins/corporate/tokens.css` (блок Radius). */
const RADII: Array<{ name: string; note?: string }> = [
  { name: '--radius-0' },
  { name: '--radius-2' },
  { name: '--radius-4' },
  { name: '--radius-6' },
  { name: '--radius-8' },
  { name: '--radius-10' },
  { name: '--radius-12' },
  { name: '--radius-16' },
  { name: '--radius-20' },
  { name: '--radius-24' },
  { name: '--radius-28' },
  { name: '--radius-full', note: 'пилюля / круг' },
]
</script>

<template>
  <div class="ds-radius">
    <p class="ds-radius__intro">
      Переменные из
      <code>src/skins/corporate/tokens.css</code>
      (импорт в теме док-сайта уже подключён — значения берутся из CSS в браузере).
    </p>
    <div class="ds-radius__grid">
      <div v-for="item in RADII" :key="item.name" class="ds-radius__cell">
        <div class="ds-radius__sample" :style="{ borderRadius: `var(${item.name})` }" />
        <code class="ds-radius__name">{{ item.name }}</code>
        <span v-if="item.note" class="ds-radius__note">{{ item.note }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-radius {
  margin: 1rem 0 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ds-radius__intro {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ds-radius__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.ds-radius__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
}

.ds-radius__sample {
  width: 100%;
  max-width: 88px;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #335cff), var(--vp-c-brand-2, #2547d0));
  border: 1px solid var(--vp-c-divider);
}

.ds-radius__name {
  font-size: 0.6875rem;
  word-break: break-all;
}

.ds-radius__note {
  font-size: 0.625rem;
  color: var(--vp-c-text-3);
}
</style>
