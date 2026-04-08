import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set — running in demo mode')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string
          name: string
          sku: string
          description: string | null
          cost_price: number
          selling_price: number
          category: string | null
          unit: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['items']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['items']['Insert']>
      }
      stock_levels: {
        Row: {
          id: string
          item_id: string
          warehouse_id: string
          quantity: number
          reserved_quantity: number
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['stock_levels']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['stock_levels']['Insert']>
      }
      warehouses: {
        Row: {
          id: string
          name: string
          location: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['warehouses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['warehouses']['Insert']>
      }
      sales_orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          status: string
          total_amount: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sales_orders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sales_orders']['Insert']>
      }
      purchase_orders: {
        Row: {
          id: string
          po_number: string
          vendor_name: string
          status: string
          total_amount: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['purchase_orders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['purchase_orders']['Insert']>
      }
    }
  }
}
