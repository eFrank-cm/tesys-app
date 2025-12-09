import { URL_API } from "$lib/config";

export async function deleteTramiteById(tramiteId: string): Promise<void> {
    const url = `${URL_API}/tramites/${tramiteId}`

    try {
        const response = await fetch(url, {
            method: "DELETE"
        })
        if (response.status === 404) throw new Error("Trámite no encontrado");
        if (!response.ok) throw new Error("Error al eliminar el trámite");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido al eliminar el trámite");
    }

}