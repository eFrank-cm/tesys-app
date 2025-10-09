import { URL_API } from "$lib/config";


export async function deleteProyecto(proyectoId: string): Promise<void> {
    const url = `${URL_API}/general/proyectos/${proyectoId}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (response.status === 404) throw new Error("Proyecto no encontrado");
        if (!response.ok) throw new Error("Error al eliminar el proyecto");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido al eliminar el proyecto");
    }
}