import { deserializerColaboracion, type Colaboracion } from "../colaboraciones/model"

export interface Proyecto {
    id: string,
    titulo: string
    resumen: string
    keywords: string[]
    createdAtISO: string // ISO
    updatedAtISO: string // ISO
    colaboraciones: Colaboracion[]
}

export function getEmptyProyecto(): Proyecto {
    return {
        id: "",
        titulo: "",
        resumen: "",
        keywords: [],
        createdAtISO: '',
        updatedAtISO: '',
        colaboraciones: []
    }
}

export function deserializerProyecto(data: any): Proyecto {
    const empty = getEmptyProyecto()
    return {
        id: data?.id ?? empty.id,
        titulo: data?.titulo ?? empty.titulo,
        resumen: data?.resumen ?? empty.resumen,
        keywords: data?.keywords ?? empty.keywords,
        createdAtISO: data?.createdAt ?? empty.createdAtISO,
        updatedAtISO: data?.updatedAt ?? empty.updatedAtISO,
        colaboraciones: data?.colaboraciones
            ? data.colaboraciones.map((e: any) => deserializerColaboracion(e))
            : empty.colaboraciones
    }
}