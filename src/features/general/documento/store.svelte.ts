import type { Documento } from "./model"
import { createDocumento, type DocumentoCreate } from "./services/createDocumento"
import { deleteDocumentoById } from "./services/deleteById"
import { editDocumento, type DocumentoUpdate } from "./services/editDocumento"
import { getCartaDeAceptacionByProyectoID } from "./services/getCartaAceptacion"
import { getDocumentoRevisionById } from "./services/getDocumentoRevisiones"
import { getDocumentosWithRevision } from "./services/getDocumentosRevision"
import { getPreviewPDF } from "./services/getPreviewPDF"

interface DocumentoStore {
    getPDF: (pdfPath: string) => Promise<string>
    getCarta: (proyectoId: string) => Promise<Documento | null>
    getDocumentosWithRevision: (proyectoId: string, tipo?: string) => Promise<Documento[]>
    create: (body: DocumentoCreate, file?: File) => Promise<Documento>
    edit: (id: string, body: DocumentoUpdate, file?: File) => Promise<Documento>
    delete: (documentoId: string) => Promise<void>
    get: (documentoId: string) => Promise<Documento | null>
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
    async getDocumentosWithRevision(proyectoId, tipo) {
        const data = getDocumentosWithRevision(proyectoId, tipo)
        return data
    },

    async create(body, file) {
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
    }
})