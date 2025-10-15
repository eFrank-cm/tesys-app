import { deserializeUsuario, type UsuarioMinimal } from "../../general/usuario/model"

export interface Revision {
    id: string
    comentario: string
    estado: string
    createdAt: string
    updatedAt: string
    documentoId: string
    createdById: string
    createdBy?: UsuarioMinimal
}

export const getRevisionEmpty = (): Revision => ({
    id: '',
    comentario: '',
    estado: '',
    createdAt: '',
    updatedAt: '',
    createdById: '',
    documentoId: '',
})

export function deserializerRevision(data: any): Revision {
    const empty = getRevisionEmpty()
    return {
        id: data?.id ?? empty.id,
        comentario: data?.comentario ?? empty.comentario,
        estado: data?.estado ?? empty.estado,
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        createdById: data?.createdById ?? empty.createdById,
        documentoId: data?.documentoId ?? empty.documentoId,
        createdBy: data?.createdBy ? deserializeUsuario(data.createdBy) : undefined
    }
}


// OTRA MANERA DE DESERIALIZAR
// const safeString = (v: unknown): string => (v === null || v === undefined) ? '' : String(v)
// const safeDateString = (v: unknown): string => {
//     if (v === null || v === undefined || v === '') return new Date(0).toISOString()
//     if (v instanceof Date) return isNaN(v.getTime()) ? new Date(0).toISOString() : v.toISOString()
//     const d = new Date(String(v))
//     return isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString()
// }
// export const deserializeRevision = (raw?: Record<string, unknown>): Revision => {
//     if (!raw) return revisionEmpty()

//     return {
//         id: safeString(raw.id ?? raw._id ?? raw.uid),
//         comentario: safeString(raw.comentario ?? raw.comment ?? raw.descripcion),
//         estado: safeString(raw.estado ?? raw.status),
//         createdAt: safeDateString(raw.createdAt ?? raw.created_at ?? raw.created),
//         updatedAt: safeDateString(raw.updatedAt ?? raw.updated_at ?? raw.modified),
//         colaboracionId: safeString(raw.colaboracionId ?? raw.colaboracion_id ?? raw.colabId),
//         documentoId: safeString(raw.documentoId ?? raw.documento_id ?? raw.docId),
//     }
// }