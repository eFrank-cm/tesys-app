export interface Propuesta {
    id: string
    createdAt: string
    updatedAt: string
    titulo: string
    resumen: string
}

export function getEmptyPropuesta(): Propuesta {
    return {
        id: '',
        createdAt: "",
        updatedAt: "",
        titulo: "",
        resumen: ""
    }
}

export function deserializerPropuesta(data: any): Propuesta {
    const empty = getEmptyPropuesta()
    return {
        id: data?.id ?? empty.id,
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        titulo: data?.titulo ?? empty.titulo,
        resumen: data?.resumen ?? empty.resumen
    }
}