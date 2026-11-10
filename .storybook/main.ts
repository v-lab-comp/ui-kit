import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config, { configType }) {
    return mergeConfig(config, {
      // В проде статика отдаётся с тем же домена по пути /storybook/ (см. nginx в docs-site/docker).
      ...(configType === 'PRODUCTION' ? { base: '/storybook/' } : {}),
      // Не следить за артефактом `npm run build-storybook` — иначе Vite ловит лишние перезагрузки.
      server: {
        watch: {
          ignored: ['**/storybook-static/**'],
        },
      },
      resolve: {
        alias: {
          '@': resolve(process.cwd(), 'src'),
          // Как у потребителя пакета — примеры в Docs можно копировать с этим импортом
          '@v-lab/ui-kit': resolve(process.cwd(), 'src/index.ts'),
        },
      },
    })
  },
}

export default config
