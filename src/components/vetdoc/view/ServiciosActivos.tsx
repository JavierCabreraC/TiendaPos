import { Button } from "@/components/ui/index.ui";
import { ServiciosActivos } from "../ServiciosActivos";


interface ServiciosActivosViewProps {
    onNewService: () => void;
}

export const ServiciosActivosView: React.FC<ServiciosActivosViewProps> = ({
    onNewService
}) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Servicios Activos</h2>
                <div className="flex gap-4 mb-6">
                    <Button 
                        variant="outline" 
                        onClick={onNewService}
                    >
                        Nuevo Servicio
                    </Button>
                </div>
            </div>
            <ServiciosActivos />
        </div>
    );
};
