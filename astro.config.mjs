// @ts-check
import { defineConfig } from 'astro/config';
import { rehypeSpotifyEmbed, rehypeYoutubeEmbed } from './src/utils';
import react from "@astrojs/react";


import vercel from "@astrojs/vercel";


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkRehype: {
      footnoteLabel: "脚注"
    },
    rehypePlugins: [rehypeSpotifyEmbed, rehypeYoutubeEmbed],
  },

  integrations: [react()],
  adapter: vercel(),
});