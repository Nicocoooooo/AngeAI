// src/types/index.ts

import { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser;


export interface Message {
    id: string;
    conversation_id: string;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
}

export interface Conversation {
    id: string;
    title: string;
    model: string;
    created_at: string;
    updated_at: string;
}

export interface ApiKey {
    id: string;
    provider: 'claude' | 'openai' | 'mistral' | 'gemini';
    key_encrypted: string;
    created_at: string;
}