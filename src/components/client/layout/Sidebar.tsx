import { useState } from "react";
import { ViewStateCliente } from "@/types/client";
import { Briefcase, Calendar, ChevronDown, PawPrint } from "lucide-react";


interface SidebarProps {
    currentView: ViewStateCliente | null;
    setCurrentView: (view: ViewStateCliente | null) => void;
}

interface MenuItem {
    label: string;
    value: ViewStateCliente;
}

interface MenuSection {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const menuItems: MenuSection[] = [
        {
            title: 'Mascotas',
            icon: <PawPrint className="w-5 h-5" />,
            items: [
                { label: 'Mis Mascotas', value: 'list-mascotas' }
            ]
        },
        {
            title: 'Reservaciones',
            icon: <Calendar className="w-5 h-5" />,
            items: [
                { label: 'Agendar Reservación', value: 'create-reservacion' },
                { label: 'Listar Reservaciones', value: 'list-reservaciones' }
            ]
        },
        {
            title: 'Servicios',
            icon: <Briefcase className="w-5 h-5" />,
            items: [
                { label: 'Historial de Reservaciones', value: 'history-reservaciones' },
                { label: 'Historial de Servicios', value: 'history-servicios' },
                { label: 'Historial de Recibos', value: 'history-recibos' }
            ]
        }
    ];

    const handleSectionClick = (sectionTitle: string) => {
        setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
    };

    return (
        <aside className="w-64 bg-blue-800 text-white h-[calc(100vh-64px)]">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-6">Actividades</h2>
                <nav>
                    {menuItems.map((section) => (
                        <div key={section.title} className="mb-2">
                            <button
                                onClick={() => handleSectionClick(section.title)}
                                className={`flex items-center w-full px-2 py-2 rounded transition-colors hover:bg-blue-700/50 ${
                                    expandedSection === section.title ? 'bg-blue-700/50' : ''
                                }`}
                            >
                                {section.icon}
                                <span className="ml-2 font-semibold">{section.title}</span>
                                <ChevronDown 
                                    className={`ml-auto w-4 h-4 transition-transform ${
                                        expandedSection === section.title ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            
                            <div
                                className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                                    expandedSection === section.title 
                                        ? 'max-h-96 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                {section.items.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setCurrentView(item.value)}
                                        className={`w-full text-left px-9 py-2 rounded transition-colors ${
                                            currentView === item.value
                                                ? 'bg-blue-700 text-white'
                                                : 'hover:bg-blue-700/50 text-gray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
