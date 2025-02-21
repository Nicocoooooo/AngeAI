import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <h1 className="text-2xl font-bold text-primary">AngeAI</h1>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;