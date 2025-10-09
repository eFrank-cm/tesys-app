import { URL_API } from "$lib/config"
import { deserializerProyecto, type Proyecto } from "../model"


export async function getProyectos(): Promise<Proyecto[]> {
    const url = `${URL_API}/general/proyectos`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
        }
        const result = await response.json()
        const data = result.map((item: any) => deserializerProyecto(item))
        return data
    }
    catch (error) {
        throw error
    }
}