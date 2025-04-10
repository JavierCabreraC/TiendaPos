import React, { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { Agrupacion, CampoOrdenamiento, FiltrosServicio, TipoServicio } from '@/types/admin';


interface ServicioReportFormProps {
    onSubmit: (filters: FiltrosServicio) => Promise<void>;
    isLoading: boolean;
}

const tiposServicio: TipoServicio[] = ['Consulta', 'Peluqueria', 'Internacion', 'Cirugia'];
const agrupaciones: Agrupacion[] = ['veterinario', 'tipoServicio'];

export const ServicioReportForm: React.FC<ServicioReportFormProps> = ({ onSubmit, isLoading }) => {
    const [filtros, setFiltros] = useState<FiltrosServicio>({
        fechaInicio: undefined,
        fechaFin: undefined,
        tipoServicio: [],
        agruparPor: [],
        ordenarPor: {
            campo: 'fecha',
            direccion: 'DESC'
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(filtros);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fecha Inicio
                    </label>
                    <Input
                        type="date"
                        onChange={(e) => setFiltros({
                            ...filtros,
                            fechaInicio: e.target.value ? new Date(e.target.value) : undefined
                        })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fecha Fin
                    </label>
                    <Input
                        type="date"
                        onChange={(e) => setFiltros({
                            ...filtros,
                            fechaFin: e.target.value ? new Date(e.target.value) : undefined
                        })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Tipos de Servicio
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {tiposServicio.map((tipo) => (
                        <div key={tipo} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`tipo-${tipo}`}
                                className="rounded border-gray-300"
                                checked={filtros.tipoServicio?.includes(tipo)}
                                onChange={(e) => {
                                    setFiltros({
                                        ...filtros,
                                        tipoServicio: e.target.checked 
                                            ? [...(filtros.tipoServicio || []), tipo]
                                            : filtros.tipoServicio?.filter(t => t !== tipo) || []
                                    });
                                }}
                            />
                            <label htmlFor={`tipo-${tipo}`} className="ml-2">{tipo}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Agrupar Por
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {agrupaciones.map((agrupacion) => (
                        <div key={agrupacion} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`agrupar-${agrupacion}`}
                                className="rounded border-gray-300"
                                checked={filtros.agruparPor?.includes(agrupacion)}
                                onChange={(e) => {
                                    setFiltros({
                                        ...filtros,
                                        agruparPor: e.target.checked 
                                            ? [...(filtros.agruparPor || []), agrupacion]
                                            : filtros.agruparPor?.filter(a => a !== agrupacion) || []
                                    });
                                }}
                            />
                            <label htmlFor={`agrupar-${agrupacion}`} className="ml-2">
                                {agrupacion === 'tipoServicio' ? 'Tipo de Servicio' : 
                                 agrupacion.charAt(0).toUpperCase() + agrupacion.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Ordenar Por
                </label>
                <select
                    className="w-full border rounded-md p-2"
                    value={`${filtros.ordenarPor.campo}-${filtros.ordenarPor.direccion}`}
                    onChange={(e) => {
                        const [campo, direccion] = e.target.value.split('-') as [CampoOrdenamiento, 'ASC' | 'DESC'];
                        setFiltros({
                            ...filtros,
                            ordenarPor: { campo, direccion }
                        });
                    }}
                >
                    <option value="fecha-DESC">Fecha (Más reciente)</option>
                    <option value="fecha-ASC">Fecha (Más antiguo)</option>
                    <option value="cantidad-DESC">Cantidad (Mayor a menor)</option>
                    <option value="cantidad-ASC">Cantidad (Menor a mayor)</option>
                </select>
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generando...' : 'Generar Reporte'}
            </Button>
        </form>
    );
};
