export interface Propuesta {
    id: string
    createdAtISO: string
    updatedAtISO: string
    titulo: string
    resumen: string
}

export function getEmptyPropuesta(): Propuesta {
    return {
        id: '',
        createdAtISO: "",
        updatedAtISO: "",
        titulo: "",
        resumen: ""
    }
}

export function deserializerPropuesta(data: any): Propuesta {
    const empty = getEmptyPropuesta()
    return {
        id: data?.id ?? empty.id,
        createdAtISO: data?.createdAt ?? empty.createdAtISO,
        updatedAtISO: data?.updatedAt ?? empty.updatedAtISO,
        titulo: data?.titulo ?? empty.titulo,
        resumen: data?.resumen ?? empty.resumen
    }
}