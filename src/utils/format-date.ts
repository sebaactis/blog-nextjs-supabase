import { format } from 'date-fns'

export function formatearFecha(fecha: string) {
    const fechaObj = new Date(fecha)
    return format(fechaObj, 'dd/MM/yyyy')
}
