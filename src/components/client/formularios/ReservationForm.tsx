import { useState } from 'react';
import { TimeSlotSelector } from './TimeSlotSelector';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { TimeSlot, ReservationRequest } from '@/types/index.types';


interface ReservationFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
    onSuccess,
    onCancel
}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [motivo, setMotivo] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot || !motivo) return;

        try {
            setSubmitting(true);

            const reservationData: ReservationRequest = {
                Motivo: motivo,
                FechaHoraReservada: `${selectedDate} ${selectedSlot.start}:00`,
            };

            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.CLI_RESERVA}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            onSuccess();
        } catch (error) {
            console.error('Error al crear reservación:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Fecha
                </label>
                <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            {selectedDate && (
                <TimeSlotSelector
                    selectedDate={selectedDate}
                    onSelectSlot={setSelectedSlot}
                    disabled={submitting}
                />
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Motivo de la consulta
                </label>
                <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    rows={3}
                    required
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={submitting || !selectedSlot || !motivo}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {submitting ? 'Reservando...' : 'Reservar'}
                </button>
            </div>
        </form>
    );
};
