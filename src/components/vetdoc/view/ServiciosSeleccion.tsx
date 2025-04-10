import { useState } from "react";
import { Button } from "@/components/ui/index.ui";
import { ConsultasCompletadasList } from "./ConsultasCompletadas";
import { ServiciosCompletadosList } from "./ServiciosCompletadosList";
import { AnalisisForm, InternacionForm, RecetaForm } from "../index.docvetcomp";
import { ConsultaCompletada, ServiceType, ServicioCompletado } from "@/types/vetdoc";
import { Activity, BedDouble, Scissors, Syringe, TestTube, BookPlus } from "lucide-react";


interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
    >
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

interface ServicioSelectionProps {
    onServiceSelect: (service: ServiceType) => void;
}

export const ServicioSelection: React.FC<ServicioSelectionProps> = ({ onServiceSelect }) => {
    const [showConsultas, setShowConsultas] = useState<boolean>(false);
    const [selectedConsulta, setSelectedConsulta] = useState<ConsultaCompletada | null>(null);
    const [showServiciosCompletados, setShowServiciosCompletados] = useState<boolean>(false);
    const [selectedServicio, setSelectedServicio] = useState<ServicioCompletado | null>(null);
    const [showServiciosReceta, setShowServiciosReceta] = useState<boolean>(false);
    const [selectedServicioReceta, setSelectedServicioReceta] = useState<ServicioCompletado | null>(null);

    if (showConsultas) {
        if (selectedConsulta) {
            return (
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Registro de Internación</h2>
                        <Button 
                            variant="outline" 
                            onClick={() => setSelectedConsulta(null)}
                        >
                            Volver a Consultas
                        </Button>
                    </div>
                    <InternacionForm
                        consulta={selectedConsulta}
                        onSuccess={() => {
                            setShowConsultas(false);
                            setSelectedConsulta(null);
                            onServiceSelect('internacion');
                        }}
                        onCancel={() => setSelectedConsulta(null)}
                    />
                </div>
            );
        }

        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Consultas Completadas</h2>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowConsultas(false)}
                    >
                        Volver
                    </Button>
                </div>
                <ConsultasCompletadasList
                    onConsultaSelect={setSelectedConsulta}
                />
            </div>
        );
    }

    // Vista para análisis
    if (showServiciosCompletados) {
        if (selectedServicio) {
            if (selectedServicio.Servicio !== 'Consulta' && selectedServicio.Servicio !== 'Internacion') {
                setSelectedServicio(null);
                return null;
            }

            return (
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Registro de Análisis</h2>
                        <Button 
                            variant="outline" 
                            onClick={() => setSelectedServicio(null)}
                        >
                            Volver a Servicios
                        </Button>
                    </div>
                    <AnalisisForm
                        servicio={selectedServicio}
                        onSuccess={() => {
                            setShowServiciosCompletados(false);
                            setSelectedServicio(null);
                            onServiceSelect('analisis');
                        }}
                        onCancel={() => setSelectedServicio(null)}
                    />
                </div>
            );
        }

        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Servicios Completados</h2>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowServiciosCompletados(false)}
                    >
                        Volver
                    </Button>
                </div>
                <ServiciosCompletadosList
                    onServicioSelect={setSelectedServicio}
                />
            </div>
        );
    }

    if (showServiciosReceta) {
        if (selectedServicioReceta) {
            if (selectedServicioReceta.Servicio !== 'Consulta' && selectedServicioReceta.Servicio !== 'Internacion') {
                setSelectedServicioReceta(null);
                return null;
            }

            return (
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Registro de Receta</h2>
                        <Button 
                            variant="outline" 
                            onClick={() => setSelectedServicioReceta(null)}
                        >
                            Volver a Servicios
                        </Button>
                    </div>
                    <RecetaForm
                        servicio={selectedServicioReceta}
                        onSuccess={() => {
                            setShowServiciosReceta(false);
                            setSelectedServicioReceta(null);
                            onServiceSelect('receta');
                        }}
                        onCancel={() => setSelectedServicioReceta(null)}
                    />
                </div>
            );
        }

        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Servicios Completados</h2>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowServiciosReceta(false)}
                    >
                        Volver
                    </Button>
                </div>
                <ServiciosCompletadosList
                    onServicioSelect={setSelectedServicioReceta}
                />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Nuevo Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard
                    icon={<Scissors size={40} />}
                    title="Peluquería"
                    description="Registro de servicio de peluquería"
                    onClick={() => onServiceSelect('peluqueria')}
                />
                <ServiceCard
                    icon={<Activity size={40} />}
                    title="Consulta Médica"
                    description="Registro de consulta veterinaria"
                    onClick={() => onServiceSelect('consulta')}
                />
                <ServiceCard
                    icon={<BedDouble size={40} />}
                    title="Internación"
                    description="Registro de internación"
                    onClick={() => setShowConsultas(true)}
                />
                <ServiceCard
                    icon={<Syringe size={40} />}
                    title="Cirugía"
                    description="Registro de cirugía"
                    onClick={() => onServiceSelect('cirugia')}
                />
                <ServiceCard
                    icon={<TestTube size={40} />}
                    title="Análisis Clínico"
                    description="Registro de análisis clínico"
                    onClick={() => setShowServiciosCompletados(true)}
                />
                <ServiceCard
                    icon={<BookPlus size={40} />}
                    title="Recetas"
                    description="Registro de recetas médicas"
                    onClick={() => setShowServiciosReceta(true)}
                />
                <ServiceCard
                    icon={<Syringe size={40} />}
                    title="Vacunación"
                    description="Registro de vacunación de mascota"
                    onClick={() => onServiceSelect('vacunacion')}
                />
                {/* ... otros servicios ... */}
            </div>
        </div>
    );
};
