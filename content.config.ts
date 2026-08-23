import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data',
      source: 'projects/**.yml',
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        logo: z.string().optional(),
        img: z.string().optional(),
        links: z.record(z.string(), z.string()).default({}),
        tags: z.array(z.string()).default([]),
        de: z.string().optional(),
        en: z.string().optional(),
        visible: z.boolean().default(false),
        sort: z.number().default(0)
      })
    })
  }
})
