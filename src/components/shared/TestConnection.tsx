// src/components/shared/TestConnection.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';

export const TestConnection = () => {
    const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const { error } = await supabase
                    .from('conversations')
                    .select('count')
                    .limit(1);

                if (error) throw error;
                setStatus('connected');
            } catch (error) {
                console.error('Error:', error);
                setStatus('error');
            }
        };

        testConnection();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Status Supabase :</h2>
            <p className={`mt-2 ${status === 'connected' ? 'text-green-600' :
                    status === 'error' ? 'text-red-600' :
                        'text-yellow-600'
                }`}>
                {status === 'connected' ? '✅ Connecté' :
                    status === 'error' ? '❌ Erreur de connexion' :
                        '⌛ Chargement...'}
            </p>
        </div>
    );
};