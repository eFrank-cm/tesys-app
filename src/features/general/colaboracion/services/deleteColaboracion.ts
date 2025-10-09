import { URL_API } from "$lib/config";


export async function deleteColaboracion(colaboracionId: string): Promise<void> {
    const url = `${URL_API}/general/colaboraciones/${colaboracionId}`

    try {
        const response = await fetch(url, { method: "DELETE" })
        if (response.status === 404) throw new Error("Colaboración no encontrada")
        if (!response.ok) throw new Error("Error al eliminar la colaboración")
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido')
    }
}