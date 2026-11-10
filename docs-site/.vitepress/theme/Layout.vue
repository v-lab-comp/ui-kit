<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()
const siteVersion = computed(() => theme.value.siteVersion ?? '')
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <span v-if="siteVersion" class="vp-site-version" aria-label="Package version"
        >v{{ siteVersion }}</span
      >
    </template>
    <template #nav-screen-content-after>
      <span v-if="siteVersion" class="vp-site-version vp-site-version--screen" aria-hidden="true"
        >v{{ siteVersion }}</span
      >
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.vp-site-version {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  padding-inline: 0.5rem;
}

.vp-site-version--screen {
  display: block;
  padding: 0.5rem 1rem;
}
</style>
