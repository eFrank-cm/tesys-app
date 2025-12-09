import { URL_API } from "$lib/config";
import { deserializeUsuario, type Usuario } from "../model";

export async function getAllUsuarios(): Promise<Usuario[]> {
    const url = `${URL_API}/usuarios`

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const result = await response.json()
        const data = result.map((item: any) => deserializeUsuario(item))
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido");
    }
}