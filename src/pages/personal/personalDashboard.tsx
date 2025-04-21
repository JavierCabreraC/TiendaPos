import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ViewState } from '@/types/admin';
import { logout, useAuth } from '@/hooks/index.hooks';
import { AdminLayout } from '@/components/admin/index.admincomp';
import { CategoryList } from '@/components/personal/CategoryList';
import ProductList from '@/components/personal/ProductList';

const PersonalDashboard = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['almacenista']);
    const [currentView, setCurrentView] = useState<ViewState | null>(null);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    // Renderiza el contenido según la vista seleccionada
    const renderContent = () => {
        switch (currentView) {
            case 'categories':
                return <CategoryList />;
            case 'products':
                return <ProductList />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel de Personal</h1>
                        <p className="text-gray-600">Seleccione una opción del menú de la barra lateral para comenzar</p>
                    </div>
                );
        }
    };

    return (
        <AdminLayout 
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
            menuItems={[
                { id: 'categories', label: 'Categorías', icon: '📋' },
                { id: 'products', label: 'Productos', icon: '🛍️' }
            ]}
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default PersonalDashboard;
