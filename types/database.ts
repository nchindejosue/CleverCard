export interface Database {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string;
          name: string;
          address: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          created_at?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          user_id: string;
          school_id: string;
          name: string;
          email: string;
          phone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          school_id: string;
          name: string;
          email: string;
          phone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          school_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          created_at?: string;
        };
      };
      classes: {
        Row: {
          id: string;
          teacher_id: string;
          school_id: string;
          name: string;
          grade_level: string;
          academic_year: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          school_id: string;
          name: string;
          grade_level: string;
          academic_year: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          school_id?: string;
          name?: string;
          grade_level?: string;
          academic_year?: string;
          created_at?: string;
        };
      };
      pupils: {
        Row: {
          id: string;
          class_id: string;
          name: string;
          date_of_birth: string;
          gender: string;
          parent_contact: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          name: string;
          date_of_birth: string;
          gender: string;
          parent_contact: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          class_id?: string;
          name?: string;
          date_of_birth?: string;
          gender?: string;
          parent_contact?: string;
          created_at?: string;
        };
      };
      report_cards: {
        Row: {
          id: string;
          pupil_id: string;
          term: string;
          academic_year: string;
          overall_average: number;
          position: number;
          total_pupils: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          pupil_id: string;
          term: string;
          academic_year: string;
          overall_average: number;
          position: number;
          total_pupils: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          pupil_id?: string;
          term?: string;
          academic_year?: string;
          overall_average?: number;
          position?: number;
          total_pupils?: number;
          created_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          created_at?: string;
        };
      };
      scores: {
        Row: {
          id: string;
          report_card_id: string;
          subject_id: string;
          score: number;
          grade: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_card_id: string;
          subject_id: string;
          score: number;
          grade: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          report_card_id?: string;
          subject_id?: string;
          score?: number;
          grade?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}