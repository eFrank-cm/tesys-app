import { decamelize } from "$lib";
import { URL_API } from "$lib/config";
import { deserializerProyecto, type Proyecto } from "../model";

export interface ProyectoCreate {
    titulo: string,
    tipo: string
    usuarioId: string,
}

export async function createProyecto(payload: ProyectoCreate): Promise<Proyecto> {
    const url = `${URL_API}/general/proyectos`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decamelize(payload)),
        })

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)

        const result = await response.json();
        const data = deserializerProyecto(result)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido")
    }
}