import type { Documento } from "./model"
import { createDocumento, type DocumentoCreate } from "./services/createDocumento"
import { editDocumento, type DocumentoUpdate } from "./services/editDocumento"
import { getCartaDeAceptacionByProyectoID } from "./services/getCartaAceptacion"
import { getDocumentosWithRevision } from "./services/getDocumentosRevision"
import { getPreviewPDF } from "./services/getPreviewPDF"
import { test } from "./services/test"


interface DocumentoStore {
    getPDF: (pdfPath: string) => Promise<string>
    getCarta: (proyectoId: string) => Promise<Documento | null>
    getDocumentosRevision: (proyectoId: string, tipo?: string) => Promise<Documento[]>
    create: (body: DocumentoCreate, file?: File) => Promise<Documento>
    edit: (id: string, data: DocumentoUpdate, file?: File) => Promise<Documento>
    test: (file: File) => Promise<void>
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
    async getDocumentosRevision(proyectoId, tipo) {
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

    async test(file) {
        await test(file)
    }
})