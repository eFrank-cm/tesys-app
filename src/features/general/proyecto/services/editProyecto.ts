import { URL_API } from "$lib/config"
import { deserializerProyecto, type Proyecto } from "../model"

export interface ProyectoUpdate {
    titulo?: string
    resumen?: string
    keywords?: string[]
}

export async function editProyectoById(proyectoId: string, body: ProyectoUpdate): Promise<Proyecto> {
    const url = `${URL_API}/proyectos/${proyectoId}`

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        if (!response.ok) throw new Error(`Error al editar el proyecto con id ${proyectoId}`)

        const result = response.json()
        const data = deserializerProyecto(result)
        return data
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error de red desconocido')
    }

}