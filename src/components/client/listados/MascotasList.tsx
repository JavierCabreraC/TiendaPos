import React, {useState} from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { HistorialReceta, HistorialVacuna, MascotaCli } from '@/types/client';
import { generateHistorialPDF, generateVacunasPDF } from '@/utils/index.utils';
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Syringe} from "lucide-react";


interface MascotasListProps {
    mascotas: MascotaCli[];
    itemsPerPage?: number;
}

export const MascotasList: React.FC<MascotasListProps> = ({
        mascotas, itemsPerPage = 4 }) => {

    const [currentPage, setCurrentPage] = useState(1);

    // Cálculos para la paginación
    const totalPages = Math.ceil(mascotas.length / itemsPerPage);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = mascotas.slice(firstItemIndex, lastItemIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Componente para los botones de paginación
    const PaginationButton: React.FC<{
        onClick: () => void;
        disabled: boolean;
        children: React.ReactNode;
    }> = ({ onClick, disabled, children }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center justify-center px-3 py-2 border rounded-md
                ${disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600'}
            `}
        >
            {children}
        </button>
    );

    // Componente de paginación
    const Pagination = () => (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <PaginationButton
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                <ChevronsLeft className="h-4 w-4" />
            </PaginationButton>

            <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </PaginationButton>

            <span className="px-4 py-2 text-sm text-gray-700">
                Página {currentPage} de {totalPages}
            </span>

            <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </PaginationButton>

            <PaginationButton
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                <ChevronsRight className="h-4 w-4" />
            </PaginationButton>
        </div>
    );

    const handleGenerateHistorial = async (mascotaId: number, nombreMascota: string) => {
        try {
            const response = await ApiService.fetch<HistorialReceta[]>(
                `${API_CONFIG.ENDPOINTS.CLI_HISRECETAS}/${mascotaId}`,
                { method: 'GET' }
            );
            
            if (response && response.length > 0) {
                await generateHistorialPDF(response, nombreMascota);
            } else {
                alert('No hay historial disponible para esta mascota');
            }
        } catch (error) {
            console.error('Error al generar historial:', error);
            alert('Error al generar el historial');
        }
    };

    const handleGenerateVacunas = async (mascotaId: number, nombreMascota: string) => {
        try {
            const response = await ApiService.fetch<HistorialVacuna[]>(
                `${API_CONFIG.ENDPOINTS.CLI_HISVACUNAS}/${mascotaId}`,
                { method: 'GET' }
            );
            
            if (response && response.length > 0) {
                await generateVacunasPDF(response, nombreMascota);
            } else {
                alert('No hay historial de vacunación disponible para esta mascota');
            }
        } catch (error) {
            console.error('Error al generar historial de vacunación:', error);
            alert('Error al generar el historial de vacunación');
        }
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (mascota: MascotaCli) => (
        <div key={mascota.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Nombre: </span>
                <span className="text-gray-600">{mascota.Nombre}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Sexo: </span>
                <span className="text-gray-600">{mascota.Sexo}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Edad: </span>
                <span className="text-gray-600">{`${mascota.Años} años, ${mascota.Meses} meses`}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Especie: </span>
                <span className="text-gray-600">{mascota.Especie}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Raza: </span>
                <span className="text-gray-600">{mascota.Raza}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                    onClick={() => handleGenerateHistorial(mascota.ID, mascota.Nombre)}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <FileText className="h-4 w-4 mr-2" />
                    Recetas
                </button>
                <button
                    onClick={() => handleGenerateVacunas(mascota.ID, mascota.Nombre)}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Syringe className="h-4 w-4 mr-2" />
                    Vacunas
                </button>
            </div>
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Sexo
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Edad
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Especie
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Raza
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Historial
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map((mascota) => (
                        <tr 
                            key={mascota.ID}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Nombre}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Sexo}</td>
                            <td className="p-3 text-center border-b border-gray-200">{`${mascota.Años} años, ${mascota.Meses} meses`}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Especie}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Raza}</td>
                            <td className="p-3 text-center border-b border-gray-200">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleGenerateHistorial(mascota.ID, mascota.Nombre)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Recetas & Análisis
                                    </button>
                                    <button
                                        onClick={() => handleGenerateVacunas(mascota.ID, mascota.Nombre)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <Syringe className="h-4 w-4 mr-2" />
                                        Vacunas
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {mascotas.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No tienes mascotas registradas
                </div>
            ) : (
                <>
                    {/* Vista móvil */}
                    <div className="md:hidden">
                        {currentItems.map(mascota => renderMobileCard(mascota))}
                        <Pagination />
                    </div>

                    {/* Vista desktop */}
                    <div className="hidden md:block">
                        {renderDesktopTable()}
                        <Pagination />
                    </div>
                </>
            )}
        </div>
    );
};
