import React, { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { DetalleReciboPreview, TipoServicio } from '@/types/admin';
import { calcularPrecioServicio, VariacionComplejidad, VariacionTamaño } from '@/utils/index.utils';


interface ReciboPreviewProps {
    detalles: DetalleReciboPreview[];
    onDetalleChange: (index: number, detalle: DetalleReciboPreview) => void;
    onVolver: () => void;
    onReciboCreado: (reciboId: number) => void; // Modificado para recibir el ID
    onPagar?: (reciboId: number) => void;
    reciboId?: number;
}

export const ReciboPreview: React.FC<ReciboPreviewProps> = ({
    detalles,
    onDetalleChange,
    onVolver,
    onReciboCreado,
    onPagar,
    reciboId
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const total = detalles.reduce((sum, detalle) => sum + detalle.PrecioUnitario, 0);

    const handleVariacionChange = (
        index: number, 
        detalle: DetalleReciboPreview, 
        tipo: 'tamaño' | 'complejidad',
        valor: VariacionTamaño | VariacionComplejidad
    ) => {
        const nuevoPrecio = calcularPrecioServicio(
            detalle.Detalle as TipoServicio,
            tipo === 'tamaño' ? { tamaño: valor as VariacionTamaño } : { complejidad: valor as VariacionComplejidad }
        );
        
        onDetalleChange(index, {
            ...detalle,
            PrecioUnitario: nuevoPrecio
        });
    };

    const handleGuardarRecibo = async () => {
        try {
            setIsLoading(true);
            
            const reciboData = {
                Cliente: detalles[0].NombreCliente,
                Total: total,
                Detalles: detalles.map(detalle => ({
                    Detalle: detalle.Detalle,
                    ServicioID: detalle.ServicioID,
                    Cantidad: 1,
                    PrecioUnitario: detalle.PrecioUnitario,
                    Subtotal: detalle.PrecioUnitario
                }))
            };

            const response = await ApiService.fetch<{ Respuesta: string; ReciboID: number }>(
                API_CONFIG.ENDPOINTS.ADM_CREARRECIBO,
                {
                    method: 'POST',
                    body: JSON.stringify(reciboData)
                }
            );

            onReciboCreado(response.ReciboID);
        } catch (error) {
            console.error('Error al crear recibo:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        } finally {
            setIsLoading(false);
        }
    };

    const renderVariaciones = (detalle: DetalleReciboPreview, index: number) => {
        if (detalle.Detalle === 'Peluqueria') {
            return (
                <select
                    className="ml-2 text-sm border rounded"
                    onChange={(e) => handleVariacionChange(
                        index, 
                        detalle, 
                        'tamaño', 
                        e.target.value as VariacionTamaño
                    )}
                >
                    <option value="tamañoPequeño">Pequeño</option>
                    <option value="tamañoMediano">Mediano</option>
                    <option value="tamañoGrande">Grande</option>
                </select>
            );
        }

        if (detalle.Detalle === 'Cirugia') {
            return (
                <select
                    className="ml-2 text-sm border rounded"
                    onChange={(e) => handleVariacionChange(
                        index, 
                        detalle, 
                        'complejidad', 
                        e.target.value as VariacionComplejidad
                    )}
                >
                    <option value="complejidadBaja">Complejidad Baja</option>
                    <option value="complejidadMedia">Complejidad Media</option>
                    <option value="complejidadAlta">Complejidad Alta</option>
                </select>
            );
        }

        return null;
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Vista Previa del Recibo</h3>
                <div className="space-x-2">
                    <Button
                        onClick={onVolver}
                        variant="outline"
                        disabled={isLoading}
                    >
                        ← Volver
                    </Button>
                    <Button
                        onClick={handleGuardarRecibo}
                        disabled={isLoading || detalles.length === 0}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Recibo'}
                    </Button>
                    {reciboId && onPagar && (
                        <Button
                            onClick={() => onPagar(reciboId)}
                            className="bg-green-500 hover:bg-green-600"
                            disabled={isLoading}
                        >
                            Proceder al Pago
                        </Button>
                    )}
                </div>
            </div>    
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left">Servicio ID</th>
                            <th className="px-4 py-2 text-left">Detalle</th>
                            <th className="px-4 py-2 text-left">Variación</th>
                            <th className="px-4 py-2 text-left">Precio</th>
                            <th className="px-4 py-2 text-left">Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map((detalle, index) => (
                            <tr key={detalle.ServicioID} className="border-t">
                                <td className="px-4 py-2">{detalle.ServicioID}</td>
                                <td className="px-4 py-2">{detalle.Detalle}</td>
                                <td className="px-4 py-2">
                                    {renderVariaciones(detalle, index)}
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        type="number"
                                        value={detalle.PrecioUnitario}
                                        onChange={(e) => onDetalleChange(index, {
                                            ...detalle,
                                            PrecioUnitario: parseFloat(e.target.value) || 0
                                        })}
                                        className="w-32"
                                        min="0"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-2">{detalle.NombreCliente}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t font-medium">
                            <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                            <td className="px-4 py-2">Bs. {total.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
