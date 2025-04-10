import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { UpdateModal } from '@/components/admin/index.admincomp';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
import type { Mascota, UpdateType, UpdateForms } from '@/types/admin';


interface MascotaListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const MascotaList: React.FC<MascotaListProps> = ({ isLoading, setIsLoading }) => {
    const [mascotaList, setMascotaList] = useState<Mascota[]>([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 },
        usuarioUpdate: { UsuarioID: 0 },
        reservacionUpdate: { ReservacionID: 0 }
    });

    const mascotaColumns: Column<Mascota>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Nombre', header: 'Nombre' },
        { key: 'Sexo', header: 'Sexo' },
        { key: 'Especie', header: 'Especie' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Observaciones', header: 'Observaciones' },
        { key: 'DueñoID', header: 'ID Dueño' },
        { 
            key: 'Fecha_De_Nacimiento', 
            header: 'Fecha de Nacimiento',
            render: (mascota: Mascota) => new Date(mascota.Fecha_De_Nacimiento).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Editar',
            render: (mascota: Mascota) => (
                <Button
                    onClick={() => handleEditMascota(mascota)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderMascotaMobileCard = (mascota: Mascota) => (
        <div key={mascota.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{mascota.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{mascota.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Sexo: </span>
                <span>{mascota.Sexo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Especie: </span>
                <span>{mascota.Especie}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Raza: </span>
                <span>{mascota.Raza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Observaciones: </span>
                <span>{mascota.Observaciones}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dueño ID: </span>
                <span>{mascota.DueñoID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha de Nacimiento: </span>
                <span>{new Date(mascota.Fecha_De_Nacimiento).toLocaleDateString()}</span>
            </div>
            <Button
                onClick={() => handleEditMascota(mascota)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const loadMascotaData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Mascota[]>(`${API_CONFIG.ENDPOINTS.ADM_MASCOTAS}`, {
                method: 'GET',
            });
            setMascotaList(data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditMascota = (mascota: Mascota) => {
        setUpdateType('mascota');
        setUpdateForm({
            ...updateForm,
            mascotaUpdate: {
                ID: mascota.ID,
                Nombre: mascota.Nombre,
                Sexo: mascota.Sexo,
                Observaciones: mascota.Observaciones,
                ClienteID: mascota.DueñoID
            }
        });
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        if (!updateType) return;

        try {
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_MASCOTAS, {
                method: 'PATCH',
                body: JSON.stringify(updateForm.mascotaUpdate)
            });

            setShowUpdateModal(false);
            await loadMascotaData();
            
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    useEffect(() => {
        loadMascotaData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Lista de Mascotas</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={mascotaList}
                    columns={mascotaColumns}
                    renderMobileCard={renderMascotaMobileCard}
                />
            )}
            <UpdateModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                type={updateType}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                onSubmit={handleUpdate}
                setShowPersonalModal={() => {}}
                setShowClienteModal={() => {}}
                setShowMascotaModal={() => {}}
            />
        </div>
    );
};

