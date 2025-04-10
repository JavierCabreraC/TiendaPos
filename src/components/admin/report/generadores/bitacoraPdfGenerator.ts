import { jsPDF } from 'jspdf';
import { BitacoraReport } from "@/types/admin";


export const generateBitacoraPDF = async (data: BitacoraReport[], ci: string) => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Reporte de Bitácora', 20, 20);
    
    // Información del CI
    doc.setFontSize(12);
    doc.text(`Cliente CI: ${ci}`, 20, 30);
    
    // Fecha de generación
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    // Datos
    const headers = [['Fecha y Hora', 'Dirección IP', 'Acción']];
    const rows = data.map(item => [
        new Date(item.FechaHora).toLocaleString(),
        item.IPDir,
        item.Accion
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50, // ajustamos startY para dar espacio al nuevo texto
        theme: 'grid'
    });

    doc.save(`reporte-bitacora-${ci}.pdf`); // incluimos el CI en el nombre del archivo
};
