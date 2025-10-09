export interface Documento {
    id: string
    nombre: string
    pdfPath: string
    tipo: string
    docUrl: string
    createdAt: string
    updatedAt: string
}

export function getEmptyDocumento(): Documento {
    return {
        id: '',
        nombre: '',
        pdfPath: '',
        tipo: '',
        docUrl: '',
        createdAt: '',
        updatedAt: ''
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
        updatedAt: data?.updatedAt ?? empty.updatedAt
    }
}