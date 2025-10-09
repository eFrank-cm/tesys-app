import { URL_API } from "$lib/config";

export async function getPreviewPDF(pdfPath: string) {
    const url = `${URL_API}/general/documentos/pdf/${pdfPath}`

    try {
        const response = await fetch(url)
        if (!response.ok || response.status === 404) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        return url
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido")
    }
}