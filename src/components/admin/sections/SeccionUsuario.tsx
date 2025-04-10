import { useState } from 'react';
import { ViewState } from '@/types/admin';
import { BitacoraList, ClienteList, CreateClienteForm, CrearPersonalForm, 
    PersonalList, UsuarioInactivoList, UsuarioList } from '@/components/admin/index.admincomp';


interface UsuarioSectionProps {
    view: ViewState;
}

export const UsuarioSection: React.FC<UsuarioSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);

    switch (view) {
        case 'create-cliente':
            return <CreateClienteForm />;

        case 'create-personal':
            return <CrearPersonalForm />;

        case 'list-personal':
            return <PersonalList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
        case 'list-cliente':
            return <ClienteList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
            
        case 'list-usuarios-activos':
            return <UsuarioList isLoading={ isLoading } setIsLoading={ setIsLoading } />;

        case 'list-usuarios-inactivos':
            return <UsuarioInactivoList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
    
        case 'list-logs':
            return <BitacoraList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
    
        // Implementar otros casos...
        default:
            return null;
    }
};
