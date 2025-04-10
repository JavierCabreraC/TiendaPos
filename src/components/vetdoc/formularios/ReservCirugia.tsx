import React, { useState } from 'react';
import { MascotaCirugia } from '@/types/vetdoc';
import { Button, Input } from '@/components/ui/index.ui';
import { ApiService, API_CONFIG } from '@/services/index.services';


interface AgendarCirugiaFormProps {
    onSuccess: () => void;
}

interface ConsultaMascotaFormProps {
    onMascotaValida: (mascota: MascotaCirugia) => void;
}

const ConsultaMascotaForm: React.FC<ConsultaMascotaFormProps> = ({ onMascotaValida }) => {
    const [MascotaID, setMascotaID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const data = await ApiService.fetch<MascotaCirugia[]>(
                `${API_CONFIG.ENDPOINTS.DOC_SERVCIRU}/${MascotaID}`,
                { method: 'GET' }
            );
            
            if (data && data.length > 0) {
                onMascotaValida(data[0]);
            } else {
                setError('No se encontró la mascota');
            }
        } catch (error) {
            console.error('Error al consultar mascota:', error);
            setError('Error al consultar mascota');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">ID de la Mascota</label>
                    <Input
                        type="number"
                        value={MascotaID}
                        onChange={(e) => setMascotaID(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Consultando...' : 'Consultar'}
                </Button>
            </form>
        </div>
    );
};

const ResultadoConsulta: React.FC<{
    mascota: MascotaCirugia;
    onVolver: () => void;
    onAgendar: () => void;
}> = ({ mascota, onVolver, onAgendar }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Resultado de la consulta</h3>
                <div className="space-y-2">
                    <p><span className="font-medium">Nombre:</span> {mascota.Nombre}</p>
                    <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
                    <p><span className="font-medium">Edad:</span> {Math.floor(mascota.edad_meses / 12)} años y {mascota.edad_meses % 12} meses</p>
                    <p className={`font-medium ${mascota.puede_operar ? 'text-green-600' : 'text-red-600'}`}>
                        {mascota.puede_operar ? 'Apto para cirugía' : 'No apto para cirugía'}
                    </p>
                </div>
                <div className="pt-4">
                    {mascota.puede_operar ? (
                        <Button onClick={onAgendar} className="w-full">
                            Agendar Cirugía
                        </Button>
                    ) : (
                        <Button onClick={onVolver} variant="outline" className="w-full">
                            Volver
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const AgendarCirugiaForm: React.FC<AgendarCirugiaFormProps> = ({ onSuccess }) => {
    const [paso, setPaso] = useState<'consulta' | 'resultado' | 'formulario'>('consulta');
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState<MascotaCirugia | null>(null);
    const [formData, setFormData] = useState({
        CI: '',
        fecha: '',
        hora: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const fechaHora = `${formData.fecha} ${formData.hora}:00`;
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_RESERVACIRUGIA}`, {
                method: 'POST',
                body: JSON.stringify({
                    CI: parseInt(formData.CI),
                    FechaHoraReservada: fechaHora
                })
            });
            onSuccess();
        } catch (error) {
            console.error('Error al agendar cirugía:', error);
        }
    };

    if (paso === 'consulta') {
        return (
            <ConsultaMascotaForm 
                onMascotaValida={(mascota) => {
                    setMascotaSeleccionada(mascota);
                    setPaso('resultado');
                }} 
            />
        );
    }

    if (paso === 'resultado' && mascotaSeleccionada) {
        return (
            <ResultadoConsulta 
                mascota={mascotaSeleccionada}
                onVolver={() => {
                    setPaso('consulta');
                    setMascotaSeleccionada(null);
                }}
                onAgendar={() => setPaso('formulario')}
            />
        );
    }

    if (paso === 'formulario') {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">CI del Cliente</label>
                        <Input
                            type="number"
                            value={formData.CI}
                            onChange={(e) => setFormData({...formData, CI: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha</label>
                        <Input
                            type="date"
                            value={formData.fecha}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Hora</label>
                        <Input
                            type="time"
                            value={formData.hora}
                            onChange={(e) => setFormData({...formData, hora: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-x-4">
                        <Button type="submit" className="w-full">
                            Agendar Cirugía
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return null;
};
