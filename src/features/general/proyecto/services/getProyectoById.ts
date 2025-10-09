import { URL_API } from "$lib/config";
import { deserializerProyecto, type Proyecto } from "../model";

export async function getProyectoById(proyectoId: string): Promise<Proyecto | null> {
    const url = `${URL_API}/general/proyectos/${proyectoId}`

    try {
        const response = await fetch(url)
        if (response.status === 404) return null

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
        }
        const result = await response.json()
        const data = deserializerProyecto(result)
        return data
    } catch (err) {
        console.error(err)
        throw new Error("Error al obtener los proyectos del usuario")
    }

}
