import { useState } from "react";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { BitacoraReport, FiltrosServicio, ReporteDinamico, ServicioReport } from "@/types/admin";
import { generateBitacoraPDF, generateDynamicPDF, generateServiciosPDF } from "../../index.admincomp";



export const useReportHandlers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState<BitacoraReport[]>([]);
    const [serviciosData, setServiciosData] = useState<ServicioReport[]>([]);
    //const [vetServiciosData, setVetServiciosData] = useState<VetServicioReport[]>([]);

    const handleGenerateReport = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<BitacoraReport[]>(`${API_CONFIG.ENDPOINTS.ADM_REPORTBITACORA}/${ci}`);
            setReportData(data);
            console.log({reportData});
            await generateBitacoraPDF(data, ci);
        } catch (error) {
            console.error('Error al generar reporte:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateServiciosReport = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ServicioReport[]>(
                `${API_CONFIG.ENDPOINTS.ADM_REPORTSERVICIO}/${ci}`,
                { method: 'GET' }
            );
            console.log(serviciosData);
            setServiciosData(data);
            await generateServiciosPDF(data, ci);
        } catch (error) {
            console.error('Error al generar reporte de servicios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleGenerateVetServiciosReport = async (ci: string) => {
    //     try {
    //         setIsLoading(true);
    //         const data = await ApiService.fetch<VetServicioReport[]>(
    //             `${API_CONFIG.ENDPOINTS.ADM_REPORTVETSERV}/${ci}`,
    //             { method: 'GET' }
    //         );
    //         console.log(vetServiciosData);
    //         setVetServiciosData(data);
    //         await generateServiciosPDF(data, ci);
    //     } catch (error) {
    //         console.error('Error al generar reporte de servicios de veterinario:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleGenerateDynamicReport = async (filtros: FiltrosServicio) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ReporteDinamico>(
                `${API_CONFIG.ENDPOINTS.ADM_REPORTDINAMICO}`,
                {
                    method: 'POST',
                    body: JSON.stringify(filtros)
                }
            );
            await generateDynamicPDF(data, filtros);
        } catch (error) {
            console.error('Error al generar reporte dinámico:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleGenerateReport,
        handleGenerateServiciosReport,
        //handleGenerateVetServiciosReport,
        handleGenerateDynamicReport
    };
};
