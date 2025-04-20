import { ViewState } from '@/types/admin';
import { TiendaReportForm } from '../report/formularios/TiendaReportForm';

interface ReporteSectionProps {
    view: ViewState;
}

export const ReporteSection: React.FC<ReporteSectionProps> = ({ view }) => {
    const renderReporteView = () => {
        switch (view) {
            case 'report-clientes':
            case 'report-personal':
            case 'report-ventas':
                return (
                    <div className="space-y-6">
                        <TiendaReportForm view={view} />
                    </div>
                );

            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-600">Seleccione un tipo de reporte</p>
                    </div>
                );
        }
    };

    return (
        <div className="p-6">
            {renderReporteView()}
        </div>
    );
};
