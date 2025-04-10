import { ViewStateCliente } from "@/types/client";
import { ClientHeader, Sidebar } from "../index.clientcomp";


interface ClientLayoutProps {
    children: React.ReactNode;
    currentView: ViewStateCliente | null;
    setCurrentView: (view: ViewStateCliente | null) => void;
    onLogout: () => void;
}

export const AdminLayout: React.FC<ClientLayoutProps> = ({
    children,
    currentView,
    setCurrentView,
    onLogout
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <ClientHeader onLogout={onLogout} />
            <div className="flex flex-1">
                <Sidebar 
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                />
                <main className="flex-1 bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};