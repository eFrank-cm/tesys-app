import { API_URL } from "../../../api/config";
import { deserializerUsuario } from "../models";

export async function getUsuarios() {
    const url = `${API_URL}/general/usuarios`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Error del servidor: ${res.status} - ${errorText}`)
        }
        const dataResponse: { length: number, data: any[] } = await res.json()
        const data = dataResponse.data.map(e => deserializerUsuario(e))
        return data
    }
    catch (error) {
        throw new Error('Error al obtener los usuarios')
    }
}

export async function getUsuariosAptosAsesor() {
    const url = `${API_URL}/general/usuarios?apto_asesor=true`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Error del servidor: ${res.status} -  ${errorText}`)
        }

        const dataResponse: { length: number, data: any[] } = await res.json()
        const data = dataResponse.data.map(e => deserializerUsuario(e))
        return data
    }
    catch (error) {
        throw new Error('Error al obtener los usuarios')
    }

}