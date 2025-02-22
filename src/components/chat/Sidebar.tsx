import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquarePlus, Star, Clock, Settings, LogOut, User, ChevronDown } from 'lucide-react';

interface Conversation {
    id: string;
    title: string;
    project?: string;
    timestamp: string;
}

const Sidebar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Exemple de conversations récentes
    const [conversations] = useState<Conversation[]>([
        // Nous les chargerons depuis Supabase plus tard
    ]);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
            {/* Header avec logo */}
            <div className="p-4 border-b border-border">
                <h1 className="text-xl font-semibold">AngeAI</h1>
            </div>

            {/* Actions principales */}
            <div className="p-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-accent rounded-lg">
                    <MessageSquarePlus size={16} />
                    Nouvelle conversation
                </button>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto">
                {/* Favoris */}
                <div className="px-2 py-3">
                    <h2 className="px-3 text-sm font-medium mb-2 flex items-center gap-2">
                        <Star size={16} className="text-primary" />
                        Favoris
                    </h2>
                    {/* Liste des favoris */}
                </div>

                {/* Récents */}
                <div className="px-2 py-3">
                    <h2 className="px-3 text-sm font-medium mb-2 flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        Récents
                    </h2>
                    <div className="space-y-1">
                        {conversations.map((conv) => (
                            <Link
                                key={conv.id}
                                to={`/chat/${conv.id}`}
                                className="flex flex-col px-3 py-2 text-sm hover:bg-accent rounded-lg"
                            >
                                <span className="font-medium truncate">{conv.title}</span>
                                {conv.project && (
                                    <span className="text-xs text-muted-foreground truncate">
                                        {conv.project}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* User section */}
            <div className="border-t border-border p-2">
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-accent rounded-lg"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                {user?.email?.[0].toUpperCase()}
                            </div>
                            <div className="text-sm font-medium truncate">
                                {user?.email}
                            </div>
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground" />
                    </button>

                    {/* Menu utilisateur */}
                    {isUserMenuOpen && (
                        <div className="absolute bottom-full left-2 right-2 mb-2 bg-popover border border-border rounded-lg shadow-lg">
                            <div className="p-1">
                                <Link
                                    to="/settings"
                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
                                >
                                    <Settings size={16} />
                                    Paramètres
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-lg"
                                >
                                    <User size={16} />
                                    Profil
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-accent rounded-lg"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;