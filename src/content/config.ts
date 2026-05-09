import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    company: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const heroCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    highlights: z.array(z.string()),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
  hero: heroCollection,
  experience: experienceCollection,
};
