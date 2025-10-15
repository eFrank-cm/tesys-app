import { deserializerRevision, type Revision } from "../../planTesis/revision/model"
import { deserializeUsuario, type UsuarioMinimal } from "../usuario/model"

export interface Documento {
    id: string
    nombre: string
    pdfPath: string
    tipo: string
    docUrl: string
    createdAt: string
    updatedAt: string
    createdById: string
    createdBy?: UsuarioMinimal
    revision?: Revision
}

export function getEmptyDocumento(): Documento {
    return {
        id: '',
        nombre: '',
        pdfPath: '',
        tipo: '',
        docUrl: '',
        createdAt: '',
        updatedAt: '',
        createdById: ''
    }
}

export function deserializerDocumento(data: any): Documento {
    const empty = getEmptyDocumento()
    return {
        id: data?.id ?? empty.id,
        nombre: data?.nombre ?? empty.nombre,
        pdfPath: data?.pdfPath ?? empty.pdfPath,
        tipo: data?.tipo ?? empty.tipo,
        docUrl: data?.docUrl ?? empty.docUrl,
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        createdById: data?.createdById ?? empty.createdById,
        createdBy: data?.createdBy ? deserializeUsuario(data.createdBy) : undefined,
        revision: data?.revision ? deserializerRevision(data.revision) : undefined
    }
}