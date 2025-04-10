import { UpdateModalProps } from "@/types/index.types";
import { Button, Input } from "@/components/ui/index.ui";


export const UpdateModal: React.FC<UpdateModalProps> = ({
    isOpen,
    onClose,
    type,
    updateForm,
    setUpdateForm,
    onSubmit
}) => {
    if (!isOpen || !type) return null;

    const renderFields = () => {
        switch (type) {
            case 'personal':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Nombre Completo"
                            value={updateForm.personalUpdate.NombreCompleto || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                personalUpdate: {
                                    ...updateForm.personalUpdate,
                                    NombreCompleto: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Teléfono"
                            value={updateForm.personalUpdate.Telefono || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                personalUpdate: {
                                    ...updateForm.personalUpdate,
                                    Telefono: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Dirección"
                            value={updateForm.personalUpdate.Direccion || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                personalUpdate: {
                                    ...updateForm.personalUpdate,
                                    Direccion: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="number"
                            placeholder="Cargo ID"
                            value={updateForm.personalUpdate.CargoID || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                personalUpdate: {
                                    ...updateForm.personalUpdate,
                                    CargoID: e.target.value
                                }
                            })}
                        />
                    </div>
                );
            case 'cliente':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Nombre Completo"
                            value={updateForm.clienteUpdate.NombreCompleto || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                clienteUpdate: {
                                    ...updateForm.clienteUpdate,
                                    NombreCompleto: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Teléfono"
                            value={updateForm.clienteUpdate.Telefono || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                clienteUpdate: {
                                    ...updateForm.clienteUpdate,
                                    Telefono: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Contacto"
                            value={updateForm.clienteUpdate.Contacto || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                clienteUpdate: {
                                    ...updateForm.clienteUpdate,
                                    Contacto: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Dirección"
                            value={updateForm.clienteUpdate.Direccion || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                clienteUpdate: {
                                    ...updateForm.clienteUpdate,
                                    Direccion: e.target.value
                                }
                            })}
                        />
                    </div>
                );
            case 'mascota':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Nombre"
                            value={updateForm.mascotaUpdate.Nombre || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                mascotaUpdate: {
                                    ...updateForm.mascotaUpdate,
                                    Nombre: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Sexo"
                            value={updateForm.mascotaUpdate.Sexo || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                mascotaUpdate: {
                                    ...updateForm.mascotaUpdate,
                                    Sexo: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Observaciones"
                            value={updateForm.mascotaUpdate.Observaciones || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                mascotaUpdate: {
                                    ...updateForm.mascotaUpdate,
                                    Observaciones: e.target.value
                                }
                            })}
                        />
                        <Input
                            type="number"
                            placeholder="Cliente ID"
                            value={updateForm.mascotaUpdate.ClienteID || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                mascotaUpdate: {
                                    ...updateForm.mascotaUpdate,
                                    ClienteID: e.target.value
                                }
                            })}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <h2 className="text-xl font-bold mb-4">
                    {type === 'personal' && 'Actualizar Personal'}
                    {type === 'cliente' && 'Actualizar Cliente'}
                    {type === 'mascota' && 'Actualizar Mascota'}
                </h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                    {renderFields()}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={onClose} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
