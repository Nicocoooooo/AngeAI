// src/types/supabase.ts
export type Database = {
    public: {
        Tables: {
            api_keys: {
                Row: {
                    id: string;
                    user_id: string;
                    provider: string;
                    key_encrypted: string;
                    created_at: string;
                };
            };
            conversations: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string;
                    model: string;
                    created_at: string;
                    updated_at: string;
                };
            };
            messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    content: string;
                    role: string;
                    created_at: string;
                };
            };
        };
    };
};