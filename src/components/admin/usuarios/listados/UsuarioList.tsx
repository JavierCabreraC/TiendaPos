import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import type { Usuario } from '@/types/admin';
import { Button, Column, DataTable } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
// import { Column, DataTable } from '@/components/ui/DataTable';


interface UsuarioListProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const UsuarioList: React.FC<UsuarioListProps> = ({ isLoading, setIsLoading }) => {
    const [userList, setUserList] = useState<Usuario[]>([]);

    const userColumns: Column<Usuario>[] = [
        { key: 'id', header: 'ID' },
        { key: 'rol', header: 'Rol' },
        { key: 'estado', header: 'Estado' },
        { 
            key: 'fecha_creacion', 
            header: 'Fecha Creación',
            render: (usuario: Usuario) => usuario.fecha_creacion ? new Date(usuario.fecha_creacion).toLocaleDateString() : 'No especificada'
        },
        {
            key: 'actions',
            header: 'Inhabilitar',
            render: (usuario: Usuario) => (
                <Button
                    onClick={() => handleEditUsuario(usuario)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderUserMobileCard = (usuario: Usuario) => (
        <div key={usuario.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{usuario.id}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Rol: </span>
                <span>{usuario.rol}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span>{usuario.estado}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha Creación: </span>
                <span>{usuario.fecha_creacion ? new Date(usuario.fecha_creacion).toLocaleDateString() : 'No especificada'}</span>
            </div>
            <Button
                onClick={() => handleEditUsuario(usuario)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Inhabilitar
            </Button>
        </div>
    );

    const loadUsuarioData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Usuario[]>(`${API_CONFIG.ENDPOINTS.ADM_USERS}`, {
                method: 'GET',
            });
            setUserList(data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditUsuario = async (usuario: Usuario) => {
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_USERS, {
                method: 'PATCH',
                body: JSON.stringify({ id: usuario.id })
            });
            await loadUsuarioData();
        } catch (error) {
            console.error('Error al inhabilitar usuario:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsuarioData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    Cargando...
                </div>
            ) : (
                <DataTable
                    data={userList}
                    columns={userColumns}
                    renderMobileCard={renderUserMobileCard}
                />
            )}
        </div>
    );
};
