import { format } from 'date-fns'

export function formatearFecha(fecha: string | undefined) {
    if (fecha === undefined) return
    const fechaObj = new Date(fecha)
    return format(fechaObj, 'dd/MM/yyyy')
}
