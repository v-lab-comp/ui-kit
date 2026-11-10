<script setup lang="ts">
import {
  semanticLight,
  semanticDark,
  getPrimitiveHex,
  semanticTokenGroups,
} from '@/colors/semantic'

function isDarkHex(hex: string): boolean {
  if (!hex || hex.length < 5) return false
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

function darkRef(tokenName: string): string {
  return semanticDark[tokenName] ?? semanticLight[tokenName] ?? ''
}
</script>

<template>
  <div class="ds-semantic">
    <p class="ds-semantic__intro">
      Таблицы и свотчи соответствуют
      <code>src/colors/semantic.ts</code>
      (в паре с
      <code>src/skins/corporate/tokens.css</code>
      ). Hex через примитивы —
      <code>getPrimitiveHex()</code>
      .
    </p>

    <section v-for="group in semanticTokenGroups" :key="group.prefix" class="ds-semantic__group">
      <h2 class="ds-semantic__h2">
        {{ group.title }}
        <span class="ds-semantic__prefix">{{ '{' + group.prefix + '}' }}</span>
      </h2>
      <p class="ds-semantic__desc">{{ group.description }}</p>

      <div class="ds-semantic__swatches">
        <div
          v-for="tokenName in group.tokens"
          :key="tokenName"
          class="ds-semantic__swatch"
          :class="{
            'ds-semantic__swatch--dark': isDarkHex(getPrimitiveHex(semanticLight[tokenName] ?? '')),
          }"
          :style="{
            backgroundColor: getPrimitiveHex(semanticLight[tokenName] ?? '') || '#eee',
          }"
        >
          <span class="ds-semantic__token-label">{{ tokenName }}</span>
          <span class="ds-semantic__primitive">{{ semanticLight[tokenName] }}</span>
        </div>
      </div>

      <div class="ds-semantic__table-wrap">
        <table class="ds-semantic__table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Light → примитив</th>
              <th>Dark → примитив</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tokenName in group.tokens" :key="tokenName + '-row'">
              <td>
                <code>{{ tokenName }}</code>
              </td>
              <td>
                <span class="ds-semantic__dot-wrap">
                  <span
                    class="ds-semantic__dot"
                    :style="{
                      backgroundColor: getPrimitiveHex(semanticLight[tokenName] ?? ''),
                      border:
                        getPrimitiveHex(semanticLight[tokenName] ?? '').toLowerCase() ===
                          '#ffffff' || !getPrimitiveHex(semanticLight[tokenName] ?? '')
                          ? '1px solid var(--vp-c-divider)'
                          : 'none',
                    }"
                  />
                  <code>{{ semanticLight[tokenName] }}</code>
                </span>
              </td>
              <td>
                <span class="ds-semantic__dot-wrap">
                  <span
                    class="ds-semantic__dot"
                    :style="{
                      backgroundColor: getPrimitiveHex(darkRef(tokenName)),
                      border:
                        getPrimitiveHex(darkRef(tokenName)).toLowerCase() === '#ffffff' ||
                        !getPrimitiveHex(darkRef(tokenName))
                          ? '1px solid var(--vp-c-divider)'
                          : 'none',
                    }"
                  />
                  <code>{{ darkRef(tokenName) }}</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ds-semantic {
  margin: 1rem 0 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ds-semantic__intro {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ds-semantic__group {
  margin-bottom: 2.5rem;
}

.ds-semantic__group:last-child {
  margin-bottom: 0;
}

.ds-semantic__h2 {
  margin: 0 0 0.35rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ds-semantic__prefix {
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.ds-semantic__desc {
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.45;
}

.ds-semantic__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ds-semantic__swatch {
  flex: 1 1 140px;
  min-width: 120px;
  min-height: 100px;
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #171717;
}

.ds-semantic__swatch--dark {
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.ds-semantic__token-label {
  font-size: 0.75rem;
  font-weight: 600;
}

.ds-semantic__primitive {
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  opacity: 0.9;
}

.ds-semantic__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.ds-semantic__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.ds-semantic__table th,
.ds-semantic__table td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: middle;
}

.ds-semantic__table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.ds-semantic__table tr:last-child td {
  border-bottom: none;
}

.ds-semantic__dot-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.ds-semantic__dot {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
