import { jsPDF } from 'jspdf';
import { VetServicioReport } from '@/types/admin';


export const generateVetServiciosPDF = async (data: VetServicioReport[], ci: string) => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Reporte de Servicios de Veterinario', 20, 20);
    
    // Información del CI
    doc.setFontSize(12);
    doc.text(`Veterinario CI: ${ci}`, 20, 30);
    
    // Fecha de generación
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    // Datos
    const headers = [
        ['Servicio', 'Mascota', 'Raza', 'Dueño', 'Inicio', 'Fin']
    ];
    const rows = data.map(item => [
        item.TipoServicio,
        item['Nombre Mascota'],
        item.NombreRaza,
        item['Nombre Dueño'],
        new Date(item.FechaHoraInicio).toLocaleString(),
        new Date(item.FechaHoraFin).toLocaleString()
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50,
        theme: 'grid',
        styles: { fontSize: 8 }, // Reducimos el tamaño de la fuente para que quepa toda la información
        columnStyles: {
            0: { cellWidth: 25 }, // Servicio
            1: { cellWidth: 25 }, // Mascota
            2: { cellWidth: 25 }, // Raza
            3: { cellWidth: 35 }, // Dueño
            4: { cellWidth: 35 }, // Inicio
            5: { cellWidth: 35 }  // Fin
        }
    });

    doc.save(`reporte-servicios-vet-${ci}.pdf`);
};
