import { useState } from "react";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { CompletarServicioModalProps, FinalizarConsulta } from "@/types/vetdoc";
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/index.ui";


export const CompletarConsultaModal: React.FC<CompletarServicioModalProps> = ({ 
    servicioId, 
    servicioEspecificoId,
    isOpen, 
    onClose,
    onSuccess 
}) => {
    const [formData, setFormData] = useState({
        Diagnostico: '',
        Tratamiento: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const finalizarData: FinalizarConsulta = {
                ServicioID: servicioId,
                ConsultaID: servicioEspecificoId,
                Diagnostico: formData.Diagnostico,
                Tratamiento: formData.Tratamiento
            };

            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_SERVCONS}`, {
                method: 'PATCH',
                body: JSON.stringify(finalizarData)
            });

            await onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al completar consulta:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Completar Consulta Médica</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Diagnóstico
                        </label>
                        <textarea
                            className="w-full border rounded-md p-2 min-h-[100px]"
                            value={formData.Diagnostico}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                Diagnostico: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tratamiento
                        </label>
                        <textarea
                            className="w-full border rounded-md p-2 min-h-[100px]"
                            value={formData.Tratamiento}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                Tratamiento: e.target.value
                            }))}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Completar Consulta
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
