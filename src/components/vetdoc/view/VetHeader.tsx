import { Button } from "@/components/ui/index.ui";
import { LogOut, Stethoscope } from "lucide-react";


export const VetHeader: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    <span className="flex items-center">
                        <Stethoscope className="mr-2" />
                        Dashboard - Médico Veterinario
                    </span>
                </h1>
                <Button variant="outline" onClick={onLogout}>
                    <LogOut className="mr-2" size={16} />
                    Cerrar Sesión
                </Button>
            </div>
        </header>
    );
};
