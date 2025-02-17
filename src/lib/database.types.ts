export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          name: string
          difficulty: number
          duration: string
          season: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          difficulty: number
          duration: string
          season: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          difficulty?: number
          duration?: string
          season?: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
          user_id?: string
          created_at?: string
        }
      }
      activities_countries: {
        Row: {
          activity_id: string
          country_id: string
          created_at: string
        }
        Insert: {
          activity_id: string
          country_id: string
          created_at?: string
        }
        Update: {
          activity_id?: string
          country_id?: string
          created_at?: string
        }
      }
      countries: {
        Row: {
          id: string
          name: string
          flag_image: string
          continent: string
          capital: string | null
          population: number
          created_at: string
        }
        Insert: {
          id: string
          name: string
          flag_image: string
          continent: string
          capital?: string | null
          population: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          flag_image?: string
          continent?: string
          capital?: string | null
          population?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      season_type: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera'
    }
  }
}