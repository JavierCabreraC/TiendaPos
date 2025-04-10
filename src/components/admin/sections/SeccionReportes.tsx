import 'jspdf-autotable';
import { ViewState } from '@/types/admin';
import { BitacoraReportForm, ServicioReportForm, useReportHandlers } from "../index.admincomp";


interface ReporteSectionProps {
    view: ViewState;
}

export const ReporteSection: React.FC<ReporteSectionProps> = ({ view }) => {
    const {
        isLoading,
        handleGenerateReport,
        handleGenerateServiciosReport,
        handleGenerateVetServiciosReport,
        handleGenerateDynamicReport
    } = useReportHandlers();

    const renderReporteView = () => {
        switch (view) {
            case 'report-bitacora':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Reporte de Bitácora</h2>
                        <p className="text-gray-600">
                            Genere un reporte detallado de las acciones realizadas por un usuario específico.
                        </p>
                        <BitacoraReportForm 
                            onSubmit={handleGenerateReport}
                            isLoading={isLoading}
                        />
                    </div>
                );

            case 'report-servicios':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Reporte de Servicios por Cliente</h2>
                        <p className="text-gray-600">
                            Visualice todos los servicios solicitados por un cliente específico.
                        </p>
                        <BitacoraReportForm 
                            onSubmit={handleGenerateServiciosReport}
                            isLoading={isLoading}
                        />
                    </div>
                );

            case 'report-vet-servicios':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Reporte de Servicios de Veterinario</h2>
                        <p className="text-gray-600">
                            Consulte los servicios realizados por un veterinario específico.
                        </p>
                        <BitacoraReportForm 
                            onSubmit={handleGenerateVetServiciosReport}
                            isLoading={isLoading}
                        />
                    </div>
                );

            case 'report-dinamico':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Reporte Dinámico de Servicios</h2>
                        <p className="text-gray-600">
                            Genere reportes personalizados aplicando diferentes filtros y agrupaciones.
                        </p>
                        <ServicioReportForm 
                            onSubmit={handleGenerateDynamicReport}
                            isLoading={isLoading}
                        />
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <h2 className="text-xl text-gray-600">
                            Seleccione un tipo de reporte para comenzar
                        </h2>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {renderReporteView()}
        </div>
    );
};
