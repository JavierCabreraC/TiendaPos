import { jsPDF } from 'jspdf';
import { ServicioReport } from '@/types/admin';


export const generateServiciosPDF = async (data: ServicioReport[], ci: string) => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Reporte de Servicios por Cliente', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Cliente CI: ${ci}`, 20, 30);
    
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    const headers = [['Tipo de Servicio', 'Total de Servicios']];
    const rows = data.map(item => [
        item.TipoServicio,
        item['Total Servicios'].toString()
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50,
        theme: 'grid'
    });

    doc.save(`reporte-servicios-${ci}.pdf`);
};
