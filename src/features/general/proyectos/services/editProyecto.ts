import { API_URL } from "../../../../api/config"
import { deserializerProyecto } from "../model"

export interface ProyectoUpdate {
    titulo?: string
    resumen?: string
    keywords?: string[]
}

export async function editProyectoById(proyectoId: string, body: ProyectoUpdate) {
    const url = `${API_URL}/general/proyectos/patch/${proyectoId}`

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        if (!response.ok) return null

        const dataResponse = response.json()
        const data = deserializerProyecto(dataResponse)
        return data
    }
    catch (error) {
        throw error
    }

}