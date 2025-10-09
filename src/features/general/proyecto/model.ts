import { deserializerColaboracion, type Colaboracion } from "../colaboracion/model"

export interface Proyecto {
    id: string,
    createdAt: string
    updatedAt: string
    titulo: string
    tipo: string
    colaboradores: Colaboracion[]
}

export function getEmptyProyecto(): Proyecto {
    return {
        id: "",
        titulo: "",
        tipo: "",
        createdAt: '',
        updatedAt: '',
        colaboradores: []
    }
}

export function deserializerProyecto(data: any): Proyecto {
    const empty = getEmptyProyecto()
    return {
        id: data?.id ?? empty.id,
        titulo: data?.titulo ?? empty.titulo,
        tipo: data?.tipo ?? empty.tipo,
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        colaboradores: data?.colaboradores
            ? data.colaboradores.map((e: any) => deserializerColaboracion(e))
            : empty.colaboradores
    }
}