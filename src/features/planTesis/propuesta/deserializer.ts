import type { Propuesta } from "./type";

export function deserializerPropuesta(data: any): Propuesta {
    return {
        id: data.id,
        titulo: data.titulo,
        resumen: data.resumen,
        keywords: data.keywords,
        createAt: data.createAt,
        updateAt: data.updateAt
    }
}