import { createContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { AuthContextType, RegisterData } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier la session actuelle
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
            }
            setLoading(false);
        });

        // Écouter les changements d'auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        signIn: async (email: string, password: string) => {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
        },
        signUp: async (userData: RegisterData) => {
            const { error: signUpError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                    },
                },
            });
            if (signUpError) throw signUpError;

            // Si l'inscription réussit et qu'il y a des clés API, les stocker
            if (userData.apiKeys) {
                const { error: apiKeysError } = await supabase
                    .from('api_keys')
                    .insert(Object.entries(userData.apiKeys).map(([provider, key]) => ({
                        user_id: user?.id,
                        provider,
                        key_encrypted: key,
                    })));

                if (apiKeysError) throw apiKeysError;
            }
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}