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
      achievements: {
        Row: {
          badge_type: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          points_required: number | null
        }
        Insert: {
          badge_type?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points_required?: number | null
        }
        Update: {
          badge_type?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points_required?: number | null
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          favorite_user_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorite_user_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          favorite_user_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string
          created_at: string | null
          id: string
          job_id: string
          message: string | null
          status: string | null
        }
        Insert: {
          applicant_id: string
          created_at?: string | null
          id?: string
          job_id: string
          message?: string | null
          status?: string | null
        }
        Update: {
          applicant_id?: string
          created_at?: string | null
          id?: string
          job_id?: string
          message?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          assigned_to: string | null
          budget: number | null
          category: string
          created_at: string | null
          creator_id: string
          description: string | null
          due_date: string | null
          estimated_duration: number | null
          id: string
          images: string[] | null
          job_type: string
          karma_reward: number | null
          latitude: number | null
          location: string
          longitude: number | null
          requirements: string[] | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          budget?: number | null
          category: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          due_date?: string | null
          estimated_duration?: number | null
          id?: string
          images?: string[] | null
          job_type: string
          karma_reward?: number | null
          latitude?: number | null
          location: string
          longitude?: number | null
          requirements?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          budget?: number | null
          category?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          due_date?: string | null
          estimated_duration?: number | null
          id?: string
          images?: string[] | null
          job_type?: string
          karma_reward?: number | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          requirements?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      karma_transactions: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          points: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "karma_transactions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          job_id: string
          message_type: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          job_id: string
          message_type?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          job_id?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          first_name: string | null
          id: string
          is_verified: boolean | null
          karma_points: number | null
          last_active: string | null
          last_name: string | null
          location: string | null
          phone: string | null
          streak_days: number | null
          total_earned: number | null
          tutorial_completed: boolean | null
          tutorial_progress: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          is_verified?: boolean | null
          karma_points?: number | null
          last_active?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          streak_days?: number | null
          total_earned?: number | null
          tutorial_completed?: boolean | null
          tutorial_progress?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_verified?: boolean | null
          karma_points?: number | null
          last_active?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          streak_days?: number | null
          total_earned?: number | null
          tutorial_completed?: boolean | null
          tutorial_progress?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_karma: number | null
          created_at: string | null
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          status: string | null
        }
        Insert: {
          bonus_karma?: number | null
          created_at?: string | null
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          status?: string | null
        }
        Update: {
          bonus_karma?: number | null
          created_at?: string | null
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          status?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          job_id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          job_id: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      tutorial_progress: {
        Row: {
          category_id: string
          completed_at: string | null
          id: string
          lesson_id: string
          time_spent: number | null
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          category_id: string
          completed_at?: string | null
          id?: string
          lesson_id: string
          time_spent?: number | null
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          category_id?: string
          completed_at?: string | null
          id?: string
          lesson_id?: string
          time_spent?: number | null
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          dark_mode: boolean | null
          email_notifications: boolean | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_level: {
        Args: { user_id: string }
        Returns: number
      }
      update_user_streak: {
        Args: { user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
