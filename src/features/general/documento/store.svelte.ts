import type { Documento } from "./model"
import { createDocumento, type DocumentoCreate } from "./services/createDocumento"
import { deleteDocumentoById } from "./services/deleteById"
import { editDocumento, type DocumentoUpdate } from "./services/editDocumento"
import { getByProyectoIdAndTipo } from "./services/getByProyectoIdAndTipo"
import { getByProyectoIdAndTipoList } from "./services/getByProyectoIdAndTipoList"
import { getCartaDeAceptacionByProyectoID } from "./services/getCartaAceptacion"
import { getDocAprobadoPorAsesor } from "./services/getDocAprobadoPorAsesor"
import { getDocumentoRevisionById } from "./services/getDocumentoRevisiones"
import { getDocumentosWithRevision } from "./services/getDocumentosRevision"
import { getPreviewPDF } from "./services/getPreviewPDF"

interface DocumentoStore {
    getPDF: (pdfPath: string) => Promise<string>
    getCarta: (proyectoId: string) => Promise<Documento | null>
    getDocumentosWithRevision: (proyectoId: string, tipo?: string, creatorId?: string) => Promise<Documento[]>
    create: (body: DocumentoCreate, file?: File) => Promise<Documento>
    edit: (id: string, body: DocumentoUpdate, file?: File) => Promise<Documento>
    delete: (documentoId: string) => Promise<void>
    get: (documentoId: string) => Promise<Documento | null>
    getDocAprobadoAsesor: (proyectoId: string) => Promise<Documento | null>
    getByProyectoTipo: (proyectoId: string, tipo: string) => Promise<Documento | null>
    getByProyectoTipoList: (proyectoId: string, tipo: string) => Promise<Documento[]>
}

export const DocumentoStore = $state<DocumentoStore>({
    async getPDF(pdfPath) {
        const data = await getPreviewPDF(pdfPath)
        return data
    },

    async getCarta(proyectoId) {
        const data = await getCartaDeAceptacionByProyectoID(proyectoId)
        return data
    },
    async getDocumentosWithRevision(proyectoId, tipo, creatorId) {
        const data = getDocumentosWithRevision(proyectoId, tipo, creatorId)
        return data
    },

    async create(body, file) {
        console.log("store documento")
        console.log(body)
        const data = await createDocumento(body, file)
        return data
    },

    async edit(id, body, file) {
        const data = await editDocumento(id, body, file)
        return data
    },

    async get(documentoId) {
        const data = await getDocumentoRevisionById(documentoId)
        return data
    },

    async delete(documentoId) {
        await deleteDocumentoById(documentoId)
    },

    async getDocAprobadoAsesor(proyectoId) {
        const data = await getDocAprobadoPorAsesor(proyectoId)
        return data
    },

    async getByProyectoTipo(proyectoId, tipo) {
        const data = await getByProyectoIdAndTipo(proyectoId, tipo)
        return data
    },

    async getByProyectoTipoList(proyectoId, tipo) {
        const data = await getByProyectoIdAndTipoList(proyectoId, tipo)
        return data
    },
})