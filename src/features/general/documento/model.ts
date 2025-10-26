import { deserializerRevision, type Revision } from "../../planTesis/revision/model"
import { deserializeUsuario, type UsuarioMinimal } from "../usuario/model"

export interface Documento {
    id: string
    pdfPath: string
    tipo: string
    docUrl: string
    createdAt: string
    updatedAt: string
    createdById: string
    proyectoId: string
    revisiones: Revision[]
    createdBy?: UsuarioMinimal
}

export function getEmptyDocumento(): Documento {
    return {
        id: '',
        pdfPath: '',
        tipo: '',
        docUrl: '',
        createdAt: '',
        updatedAt: '',
        createdById: '',
        proyectoId: '',
        revisiones: []
    }
}

export function deserializerDocumento(data: any): Documento {
    const empty = getEmptyDocumento()
    return {
        id: data?.id ?? empty.id,
        pdfPath: data?.pdfPath ?? empty.pdfPath,
        tipo: data?.tipo ?? empty.tipo,
        docUrl: data?.docUrl ?? empty.docUrl,
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        createdById: data?.createdById ?? empty.createdById,
        proyectoId: data?.proyectoId ?? empty.proyectoId,
        revisiones: data?.revisiones ? data.revisiones.map((e: any) => deserializerRevision(e)) : empty.revisiones,
        createdBy: data?.createdBy ? deserializeUsuario(data.createdBy) : undefined,
    }
}