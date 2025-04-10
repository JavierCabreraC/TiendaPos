import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { UpdateModal } from '@/components/admin/index.admincomp';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import type { Personal, UpdateType, UpdateForms } from '@/types/admin';


interface StaffListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const PersonalList: React.FC<StaffListProps> = ({ isLoading, setIsLoading }) => {
    const [staffList, setStaffList] = useState<Personal[]>([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 },
        usuarioUpdate: { UsuarioID: 0 },
        reservacionUpdate: { ReservacionID: 0 }
    });

    const staffColumns: Column<Personal>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Nombre', header: 'Nombre' },
        { key: 'Telefono', header: 'Teléfono' },
        { key: 'Direccion', header: 'Dirección' },
        { key: 'Email', header: 'Email' },
        { key: 'Cargo', header: 'Cargo' },
        { key: 'Profesion', header: 'Profesión' },
        { 
            key: 'Fecha_De_Contratacion', 
            header: 'Fecha Contratación',
            render: (personal: Personal) => new Date(personal.Fecha_De_Contratacion).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Editar',
            render: (personal: Personal) => (
                <Button
                    onClick={() => handleEditStaff(personal)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderStaffMobileCard = (personal: Personal) => (
        <div key={personal.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{personal.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{personal.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Teléfono: </span>
                <span>{personal.Telefono}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dirección: </span>
                <span>{personal.Direccion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Email: </span>
                <span>{personal.Email}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cargo: </span>
                <span>{personal.Cargo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Profesión: </span>
                <span>{personal.Profesion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha Contratación: </span>
                <span>{new Date(personal.Fecha_De_Contratacion).toLocaleDateString()}</span>
            </div>
            <Button
                onClick={() => handleEditStaff(personal)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const loadStaffData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Personal[]>(`${API_CONFIG.ENDPOINTS.ADM_PERSONAL}`, {
                method: 'GET',
            });
            setStaffList(data);
        } catch (error) {
            console.error('Error al cargar personal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditStaff = (personal: Personal) => {
        setUpdateType('personal');
        setUpdateForm({
            ...updateForm,
            personalUpdate: {
                ID: personal.ID,
                NombreCompleto: personal.Nombre,
                Telefono: personal.Telefono,
                Direccion: personal.Direccion,
                // CargoID: personal.CargoID
            }
        });
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        if (!updateType) return;

        try {
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_PERSONAL, {
                method: 'PATCH',
                body: JSON.stringify(updateForm.personalUpdate)
            });

            setShowUpdateModal(false);
            await loadStaffData();
            
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    useEffect(() => {
        loadStaffData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Lista de Personal</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={staffList}
                    columns={staffColumns}
                    renderMobileCard={renderStaffMobileCard}
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
