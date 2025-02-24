import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://react-typescript-style-guide.vercel.app',
})


