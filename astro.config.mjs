// @ts-check
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";


import vercel from "@astrojs/vercel";


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkRehype: {
      footnoteLabel: "脚注"
    },
  },

  integrations: [react()],
  adapter: vercel(),
});