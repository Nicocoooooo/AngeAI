import React from 'react';
import { useAuth } from '../contexts/AuthContext';

type MainLayoutProps = {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
};

export const MainLayout = ({ children, sidebar }: MainLayoutProps) => {
    const { user } = useAuth();

    return (
        <div className="h-screen flex overflow-hidden bg-background">
            {/* Sidebar */}
            {sidebar && (
                <aside className="w-64 bg-background-dark border-r border-gray-200">
                    {sidebar}
                </aside>
            )}

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <header className="h-14 border-b border-gray-200 flex items-center px-4">
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold">Ange</h1>
                        </div>
                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">{user.email}</span>
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};