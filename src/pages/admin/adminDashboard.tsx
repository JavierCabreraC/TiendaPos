import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ViewState } from '@/types/admin';
import { logout, useAuth } from '@/hooks/index.hooks';
import { AdminLayout, UsuarioSection, ReporteSection } from '@/components/admin/index.admincomp';



const AdminDashboard = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['admin']);
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
        if (!currentView) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
                    <p className="text-gray-600">Seleccione una opción del menú de la barra lateral para comenzar</p>
                </div>
            );
        }

        // Sección de Usuarios (Clientes y Personal)
        if (currentView.includes('personal') || currentView.includes('cliente') || 
            currentView.includes('usuarios')) {
            return <UsuarioSection view={currentView} />;
        }

        // Sección de Reportes
        if (currentView.includes('report-')) {
            return <ReporteSection view={currentView} />;
        }
    };

    return (
        <AdminLayout 
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default AdminDashboard;
