import React from 'react';
import { PawPrint, LogOut } from 'lucide-react';


interface ClientHeaderProps {
    onLogout: () => void;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({ onLogout }) => {
    return (
        <header className="bg-white shadow-md py-3 px-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 flex-shrink-0">
                    <span className="flex items-center">
                        <PawPrint className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                        <span className="hidden sm:inline">Portal de Cliente</span>
                        <span className="sm:hidden">Cliente</span>
                    </span>
                </h1>
                <button 
                    onClick={onLogout}
                    className="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md text-gray-700 
                             hover:bg-gray-100 flex items-center text-sm md:text-base transition-colors"
                >
                    <LogOut className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Cerrar Sesión</span>
                    <span className="sm:hidden">Salir</span>
                </button>
            </div>
        </header>
    );
};
