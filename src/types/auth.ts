import { User } from '@supabase/supabase-js';

export interface APIKeys {
    claude?: string;
    chatgpt?: string;
    mistral?: string;
    gemini?: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    apiKeys?: APIKeys;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (userData: RegisterData) => Promise<void>;
    signOut: () => Promise<void>;
}