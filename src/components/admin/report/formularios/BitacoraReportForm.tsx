import { useState } from "react";
import { Button, Input } from "@/components/ui/index.ui";


interface BitacoraReportFormProps {
    onSubmit: (ci: string) => Promise<void>;
    isLoading: boolean;
}

export const BitacoraReportForm: React.FC<BitacoraReportFormProps> = ({ onSubmit, isLoading }) => {
    const [ci, setCI] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(ci);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Número de Carnet
                </label>
                <Input
                    type="text"
                    value={ci}
                    onChange={(e) => setCI(e.target.value)}
                    placeholder="Ingrese número de carnet activo"
                    required
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generando...' : 'Generar Reporte'}
            </Button>
        </form>
    );
};
