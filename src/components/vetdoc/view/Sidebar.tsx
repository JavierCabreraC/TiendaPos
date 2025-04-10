import { Button } from '@/components/ui/button';
import { MainView, ServiceType } from '@/types/vetdoc';
import { Plus, Clipboard, CheckCircle2, History, FileCheck, FileText, 
    ClipboardList, Syringe, CalendarClock, Scissors} from 'lucide-react';


interface NavButtonProps {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, text, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center px-4 py-2 rounded-lg
            transition-colors duration-150 ease-in-out
            ${active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'}
        `}
    >
        {icon}
        <span className="ml-3">{text}</span>
    </button>
);

interface SidebarProps {
    mainView: MainView;
    selectedService: ServiceType | null;
    onViewChange: (view: MainView) => void;
    onServiceClear: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    mainView,
    selectedService,
    onViewChange,
    onServiceClear,
}) => {
    return (
        <aside className="w-75 bg-white shadow-lg border-r border-gray-400">
            <nav className="p-4">
                <div className="space-y-2">
                    <NavButton
                        icon={<Plus size={20} />}
                        text="Nuevo Servicio"
                        active={mainView === 'nuevo'}
                        onClick={() => {
                            onViewChange('nuevo');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<Clipboard size={20} />}
                        text="Servicios Activos"
                        active={mainView === 'activos'}
                        onClick={() => {
                            onViewChange('activos');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<CheckCircle2 size={20} />}
                        text="Servicios Completados"
                        active={mainView === 'completados'}
                        onClick={() => {
                            onViewChange('completados');
                        }}
                    />
                    <NavButton
                        icon={<History size={20} />}
                        text="Historial Clínico"
                        active={mainView === 'historial'}
                        onClick={() => {
                            onViewChange('historial');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<FileText size={20} />}
                        text="Recetas"
                        active={mainView === 'recetas'}
                        onClick={() => {
                            onViewChange('recetas');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<ClipboardList size={20} />}
                        text="Análisis"
                        active={mainView === 'analisis'}
                        onClick={() => {
                            onViewChange('analisis');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<Scissors size={20} />}
                        text="Agendar Cirugía"
                        active={mainView === 'agendarCirugia'}
                        onClick={() => {
                            onViewChange('agendarCirugia');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<Syringe size={20} />}
                        text="Gestión de Vacunas"
                        active={mainView === 'vacunas'}
                        onClick={() => {
                            onViewChange('vacunas');
                            onServiceClear();
                        }}
                    />
                    <NavButton
                        icon={<CalendarClock size={20} />}
                        text="Historial Vacunaciones"
                        active={mainView === 'historialVacunas'}
                        onClick={() => {
                            onViewChange('historialVacunas');
                            onServiceClear();
                        }}
                    />
                </div>

                {mainView === 'nuevo' && selectedService && (
                    <div className="mt-8 pt-4 border-t">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Servicio Seleccionado
                        </h3>
                        <Button 
                            variant="ghost" 
                            className="w-full justify-start text-blue-600"
                            onClick={onServiceClear}
                        >
                            <FileCheck size={16} className="mr-2" />
                            Volver a Servicios
                        </Button>
                    </div>
                )}
            </nav>
        </aside>
    );
};
