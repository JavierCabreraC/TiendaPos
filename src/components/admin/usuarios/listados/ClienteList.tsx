import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { UpdateModal } from '@/components/admin/index.admincomp';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { Cliente, UpdateType, UpdateForms } from '@/types/admin';

interface ClientListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const ClienteList: React.FC<ClientListProps> = ({ isLoading, setIsLoading }) => {
    const [clientList, setClientList] = useState<Cliente[]>([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 },
        usuarioUpdate: { UsuarioID: 0 },
        reservacionUpdate: { ReservacionID: 0 }
    });

    const clientColumns: Column<Cliente>[] = [
        { key: 'id', header: 'ID' },
        { key: 'nombre_completo', header: 'Nombre Completo' },
        { key: 'numero_ci', header: 'Número CI' },
        { key: 'telefono', header: 'Teléfono' },
        { key: 'direccion', header: 'Dirección' },
        { key: 'email', header: 'Email' },
        { 
            key: 'puntos_acumulados', 
            header: 'Puntos',
            render: (cliente: Cliente) => cliente.puntos_acumulados || '0'
        },
        {
            key: 'actions',
            header: 'Editar',
            render: (cliente: Cliente) => (
                <Button
                    onClick={() => handleEditCliente(cliente)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderClientMobileCard = (cliente: Cliente) => (
        <div key={cliente.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{cliente.id}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{cliente.nombre_completo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">CI: </span>
                <span>{cliente.numero_ci}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Teléfono: </span>
                <span>{cliente.telefono}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dirección: </span>
                <span>{cliente.direccion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Email: </span>
                <span>{cliente.email}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Puntos: </span>
                <span>{cliente.puntos_acumulados || '0'}</span>
            </div>
            <Button
                onClick={() => handleEditCliente(cliente)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const loadClienteData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Cliente[]>(`${API_CONFIG.ENDPOINTS.ADM_CLIENTES}`, {
                method: 'GET',
            });
            setClientList(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCliente = (cliente: Cliente) => {
        setUpdateType('cliente');
        setUpdateForm({
            ...updateForm,
            clienteUpdate: { 
                ClienteID: cliente.id,
                NombreCompleto: cliente.nombre_completo,
                Telefono: cliente.telefono,
                Direccion: cliente.direccion
            }
        });
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        if (!updateType) return;

        try {
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_CLIENTES, {
                method: 'PATCH',
                body: JSON.stringify(updateForm.clienteUpdate)
            });

            setShowUpdateModal(false);
            await loadClienteData();
            
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    useEffect(() => {
        loadClienteData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Lista de Clientes</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={clientList}
                    columns={clientColumns}
                    renderMobileCard={renderClientMobileCard}
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
