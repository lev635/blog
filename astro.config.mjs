// @ts-check
import { defineConfig } from 'astro/config';
import { exampleRemarkPlugin } from './example-remark-plugin.mjs';
import react from "@astrojs/react";


import vercel from "@astrojs/vercel";


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkRehype: {
      footnoteLabel: "脚注"
    },
    remarkPlugins: [exampleRemarkPlugin],
  },

  integrations: [react()],
  adapter: vercel(),
});