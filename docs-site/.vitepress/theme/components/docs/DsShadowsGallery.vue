<script setup lang="ts">
/** Имена из `src/skins/corporate/shadows.css` — только семантические тени для превью. */
const GROUPS: Array<{ title: string; vars: string[] }> = [
  {
    title: 'Regular Shadow',
    vars: [
      '--shadow-regular-x-small',
      '--shadow-regular-small',
      '--shadow-regular-medium',
      '--shadow-regular-x-small-soft',
      '--shadow-dropdown',
    ],
  },
  {
    title: 'Custom Shadow',
    vars: ['--shadow-x-small', '--shadow-small', '--shadow-medium', '--shadow-large'],
  },
  {
    title: 'Colored Shadows',
    vars: [
      '--shadow-colored-gray',
      '--shadow-colored-primary',
      '--shadow-colored-blue',
      '--shadow-colored-purple',
      '--shadow-colored-orange',
      '--shadow-colored-green',
    ],
  },
  {
    title: 'Card Shadow',
    vars: ['--shadow-card-large'],
  },
]
</script>

<template>
  <div class="ds-shadows">
    <p class="ds-shadows__intro">
      Preview
      <code>box-shadow: var(--…)</code>
      из
      <code>src/skins/corporate/shadows.css</code>
      (подключён через
      <code>tokens.css</code>
      ).
    </p>
    <section v-for="g in GROUPS" :key="g.title" class="ds-shadows__section">
      <h3 class="ds-shadows__h3">{{ g.title }}</h3>
      <div class="ds-shadows__row">
        <div v-for="v in g.vars" :key="v" class="ds-shadows__card-wrap">
          <div class="ds-shadows__card" :style="{ boxShadow: `var(${v})` }" />
          <code class="ds-shadows__label">{{ v }}</code>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ds-shadows {
  margin: 1rem 0 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ds-shadows__intro {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ds-shadows__section {
  margin-bottom: 1.5rem;
}

.ds-shadows__section:last-child {
  margin-bottom: 0;
}

.ds-shadows__h3 {
  margin: 0 0 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ds-shadows__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.ds-shadows__card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.ds-shadows__card {
  width: 100%;
  max-width: 120px;
  height: 72px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.ds-shadows__label {
  font-size: 0.625rem;
  text-align: center;
  word-break: break-all;
  line-height: 1.3;
}
</style>
