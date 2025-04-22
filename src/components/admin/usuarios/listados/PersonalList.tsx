import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import { UpdateModal } from '@/components/admin/index.admincomp';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
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
        { key: 'id', header: 'ID' },
        { key: 'nombre_completo', header: 'Nombre Completo' },
        { key: 'numero_ci', header: 'Número CI' },
        { key: 'telefono', header: 'Teléfono' },
        { key: 'direccion', header: 'Dirección' },
        { key: 'email', header: 'Email' },
        { 
            key: 'fecha_contratacion', 
            header: 'Fecha Contratación',
            render: (personal: Personal) => new Date(personal.fecha_contratacion).toLocaleDateString()
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
        <div key={personal.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{personal.id}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{personal.nombre_completo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">CI: </span>
                <span>{personal.numero_ci}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Teléfono: </span>
                <span>{personal.telefono}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dirección: </span>
                <span>{personal.direccion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Email: </span>
                <span>{personal.email}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha Contratación: </span>
                <span>{new Date(personal.fecha_contratacion).toLocaleDateString()}</span>
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
                ID: personal.id,
                NombreCompleto: personal.nombre_completo,
                Telefono: personal.telefono,
                Direccion: personal.direccion
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
