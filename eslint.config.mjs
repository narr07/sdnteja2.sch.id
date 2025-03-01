// @ts-nocheck

import antfu from '@antfu/eslint-config'
// import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(

  antfu({
    formatters: {
      css: 'prettier',
      html: true,
      markdown: 'dprint',
    },
    vue: true,
    stylistic: true,
    typescript: true,
  }),
  // {
  //   plugins: { tailwindcss: pluginTailwindCSS },
  //   rules: pluginTailwindCSS.configs.recommended.rules,
  // },
)
