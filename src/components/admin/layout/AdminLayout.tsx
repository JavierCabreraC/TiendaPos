import { Sidebar } from './Sidebar';
import { ViewState } from '@/types/admin';
import { AdminHeader } from './Header';

interface MenuItem {
    id: ViewState;
    label: string;
    icon: string;
}

interface AdminLayoutProps {
    children: React.ReactNode;
    currentView: ViewState | null;
    setCurrentView: (view: ViewState | null) => void;
    onLogout: () => void;
    menuItems?: MenuItem[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    currentView,
    setCurrentView,
    onLogout,
    menuItems
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <AdminHeader onLogout={onLogout} />
            <div className="flex flex-1">
                <Sidebar 
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    menuItems={menuItems}
                />
                <main className="flex-1 bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
