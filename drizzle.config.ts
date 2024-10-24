import { defineConfig } from 'drizzle-kit'
import '@/drizzle/envConfig'

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})