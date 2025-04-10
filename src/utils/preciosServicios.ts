import type { TipoServicio } from '@/types/admin';


export const PRECIOS_BASE: Record<TipoServicio, number> = {
    'Consulta': 50.00,
    'Peluqueria': 80.00,
    'Internacion': 200.00,
    'Cirugia': 350.00
};

// Tipos para las variaciones
export type VariacionTamaño = 'tamañoPequeño' | 'tamañoMediano' | 'tamañoGrande';
export type VariacionComplejidad = 'complejidadBaja' | 'complejidadMedia' | 'complejidadAlta';

export const VARIACIONES_PRECIO = {
    'Peluqueria': {
        'tamañoPequeño': 1.0,    // precio base
        'tamañoMediano': 1.2,    // +20%
        'tamañoGrande': 1.5     // +50%
    },
    'Cirugia': {
        'complejidadBaja': 1.0,
        'complejidadMedia': 1.3,
        'complejidadAlta': 1.8
    }
} as const;

// Función auxiliar para calcular precio
export const calcularPrecioServicio = (
    tipoServicio: TipoServicio,
    variaciones?: {
        tamaño?: VariacionTamaño;
        complejidad?: VariacionComplejidad;
    }
): number => {
    const precioBase = PRECIOS_BASE[tipoServicio];
    
    if (tipoServicio === 'Peluqueria' && variaciones?.tamaño) {
        return precioBase * VARIACIONES_PRECIO.Peluqueria[variaciones.tamaño];
    }
    
    if (tipoServicio === 'Cirugia' && variaciones?.complejidad) {
        return precioBase * VARIACIONES_PRECIO.Cirugia[variaciones.complejidad];
    }
    
    return precioBase;
};
