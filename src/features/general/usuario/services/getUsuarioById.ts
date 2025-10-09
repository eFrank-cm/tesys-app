import { URL_API } from "$lib/config";
import { deserializeUsuario, type Usuario } from "../model";

export async function getUsuarioById(usuarioId: string): Promise<Usuario | null> {
    const url = `${URL_API}/general/usuarios/${usuarioId}`

    try {
        const response = await fetch(url)
        if (response.status === 404) return null
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const result = await response.json()
        const data = deserializeUsuario(result)
        return data

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error de red desconocido')
    }
}