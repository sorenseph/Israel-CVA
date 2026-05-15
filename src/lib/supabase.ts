import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && key)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, key!)
  : null

export type ContactLead = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export type DemoStats = {
  id: number
  projects_count: number
  clients_count: number
  uptime_percent: number
  updated_at: string
}
