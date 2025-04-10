import React from 'react';
import { Button } from '@/components/ui/index.ui';
import { ClipboardList, LogOut } from 'lucide-react';
import { AdminHeaderProps } from '@/types/index.types';


export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
    return (
        <header className="bg-gray-100 border-b border-gray-200 py-3 px-8">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 flex-shrink-0">
                    <span className="flex items-center">
                        <ClipboardList className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                        <span className="hidden sm:inline">Panel de Administración</span>
                        <span className="sm:hidden">Admin</span>
                    </span>
                </h1>
                <Button 
                    variant="outline" 
                    onClick={onLogout}
                    className="text-sm px-3 py-1 h-auto md:text-base md:px-4 md:py-2"
                >
                    <LogOut className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Cerrar Sesión</span>
                    <span className="sm:hidden">Salir</span>
                </Button>
            </div>
        </header>
    );
};
