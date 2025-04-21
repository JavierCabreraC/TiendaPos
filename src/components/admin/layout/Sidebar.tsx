import { useState } from 'react';
import { ViewState } from '@/types/admin';
import { Users, FileText, ChevronDown } from 'lucide-react';

interface MenuItem {
    id: ViewState;
    label: string;
    icon: string;
}

interface SidebarProps {
    currentView: ViewState | null;
    setCurrentView: (view: ViewState | null) => void;
    menuItems?: MenuItem[];
}

interface MenuSection {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, menuItems }) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const defaultMenuItems: MenuSection[] = [
        {
            title: 'Usuarios',
            icon: <Users className="w-5 h-5" />,
            items: [
                { id: 'create-personal', label: 'Registrar Personal', icon: '👤' },
                { id: 'list-personal', label: 'Listar Personal', icon: '📋' },
                { id: 'create-cliente', label: 'Registrar Cliente', icon: '👥' },
                { id: 'list-cliente', label: 'Listar Clientes', icon: '📋' }
            ]
        },
        {
            title: 'Reportes',
            icon: <FileText className="w-5 h-5" />,
            items: [
                { id: 'report-clientes', label: 'Reporte de Clientes', icon: '📊' },
                { id: 'report-personal', label: 'Reporte de Personal', icon: '📊' },
                { id: 'report-ventas', label: 'Reporte de Ventas', icon: '📊' }
            ]
        }
    ];

    // Si se proporcionan menuItems personalizados, los usamos
    const sections = menuItems ? [{
        title: 'Menú Principal',
        icon: <FileText className="w-5 h-5" />,
        items: menuItems
    }] : defaultMenuItems;

    // Manejar el click en una sección
    const handleSectionClick = (sectionTitle: string) => {
        setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
    };

    return (
        <div className="w-64 bg-white shadow-md">
            <nav className="mt-5 px-2">
                {sections.map((section) => (
                    <div key={section.title} className="mb-4">
                        <button
                            onClick={() => handleSectionClick(section.title)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            {section.icon}
                            <span className="mx-4 font-medium">{section.title}</span>
                            <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${
                                expandedSection === section.title ? 'transform rotate-180' : ''
                            }`} />
                        </button>
                        {expandedSection === section.title && (
                            <div className="mt-2 space-y-1">
                                {section.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentView(item.id)}
                                        className={`flex items-center w-full px-4 py-2 text-sm ${
                                            currentView === item.id
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        } rounded-md`}
                                    >
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};
