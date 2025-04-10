import { AutoTableSettings } from "@/types/admin";


declare module 'jspdf' {
    interface jsPDF {
        lastAutoTable: {
            finalY: number;
        };
        autoTable: (options: AutoTableSettings) => jsPDF;
    }
}

export interface PdfGeneratorOptions {
    fontSize?: number;
    theme?: string;
    columnStyles?: Record<string, unknown>;
}
