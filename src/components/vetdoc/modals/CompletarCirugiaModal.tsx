import React, { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { CompletarCirugiaModalProps } from '@/types/vetdoc';
import { API_CONFIG, ApiService } from "@/services/index.services";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';


export const CompletarCirugiaModal: React.FC<CompletarCirugiaModalProps> = ({
    servicioId,
    servicioEspecificoId,
    isOpen,
    onClose,
    onSuccess
}) => {
    const [formData, setFormData] = useState({
        PesoSalida: '',
        TemperaturaSalida: '',
        Notas: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_CIRUGIAFIN}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ServicioID: servicioId,
                    CirugiaID: servicioEspecificoId,
                    PesoSalida: parseFloat(formData.PesoSalida),
                    TemperaturaSalida: parseFloat(formData.TemperaturaSalida),
                    Notas: formData.Notas
                })
            });

            await onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al completar cirugía:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Completar Cirugía</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold">Datos de Salida</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Peso de Salida (kg)
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="999.99"
                                    value={formData.PesoSalida}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        PesoSalida: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Temperatura de Salida (°C)
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="30"
                                    max="45"
                                    value={formData.TemperaturaSalida}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        TemperaturaSalida: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Notas Finales
                            </label>
                            <textarea
                                className="w-full border rounded-md p-2 min-h-[100px]"
                                value={formData.Notas}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    Notas: e.target.value
                                }))}
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Completar Cirugía
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
