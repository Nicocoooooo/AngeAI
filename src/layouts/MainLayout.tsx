import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar sera ajouté ici */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;