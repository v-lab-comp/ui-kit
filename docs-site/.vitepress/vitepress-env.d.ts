/// <reference types="vite/client" />
/// <reference types="vitepress/client" />

declare module 'vitepress/client' {
  interface DefaultTheme {
    /** Версия npm-пакета из корневого `package.json` */
    siteVersion?: string
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
