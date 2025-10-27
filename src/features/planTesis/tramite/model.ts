export interface Tramite {
    id: string
    expediente: string
    tipo: string
    estado: string
    createdAt: string
    updatedAt: string
    proyectoId: string
}

export function getTramiteEmpty(): Tramite {
    return {
        id: '',
        expediente: '',
        estado: '',
        tipo: '',
        createdAt: '',
        updatedAt: '',
        proyectoId: '',
    }
}

export function deserializerTramite(data: any): Tramite {
    const empty = getTramiteEmpty()
    return {
        id: data.id ?? empty.id,
        expediente: data.expediente ?? empty.expediente,
        estado: data.estado ?? empty.estado,
        tipo: data.tipo ?? empty.tipo,
        createdAt: data.createdAt ?? empty.createdAt,
        updatedAt: data.updatedAt ?? empty.updatedAt,
        proyectoId: data.proyectoId ?? empty.proyectoId,
    }
}