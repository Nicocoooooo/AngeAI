import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
    const { signOut } = useAuth();

    return (
        <div className="h-full flex flex-col">
            {/* En-tête de la sidebar */}
            <div className="h-14 border-b border-gray-200 flex items-center px-4">
                <button
                    className="btn-primary w-full"
                    onClick={() => {/* TODO: Nouvelle conversation */ }}
                >
                    Nouvelle conversation
                </button>
            </div>

            {/* Liste des conversations */}
            <div className="flex-1 overflow-y-auto p-2">
                {/* TODO: Liste des conversations */}
            </div>

            {/* Footer avec bouton de déconnexion */}
            <div className="border-t border-gray-200 p-4">
                <button
                    className="btn-secondary w-full"
                    onClick={() => signOut()}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
};