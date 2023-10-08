export type Json =
  | { [key: string]: Json | undefined }
  | Json[]
  | boolean
  | null
  | number
  | string;

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      profiles: {
        Insert: {
          avatar_url?: null | string;
          full_name?: null | string;
          id: string;
          updated_at?: null | string;
          username?: null | string;
        };
        Relationships: [
          {
            columns: ['id'];
            foreignKeyName: 'profiles_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          avatar_url: null | string;
          full_name: null | string;
          id: string;
          updated_at: null | string;
          username: null | string;
        };
        Update: {
          avatar_url?: null | string;
          full_name?: null | string;
          id?: string;
          updated_at?: null | string;
          username?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
