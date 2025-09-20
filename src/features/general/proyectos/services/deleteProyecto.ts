import { API_URL } from "../../../../api/config";

export async function deleteProyecto(proyectoId: string) {
    const url = `${API_URL}/general/proyectos/${proyectoId}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        const res = await response.json();
        return res
    } catch (error) {
        throw error;
    }
}