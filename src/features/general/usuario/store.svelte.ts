import type { Usuario } from "./model"
import { getUsuarioById } from "./services/getUsuarioById"
import { getAllUsuarios } from "./services/getUsuarios"


interface UsuarioStore {
    get: (usuarioId: string) => Promise<Usuario | null>
    getAll: () => Promise<Usuario[]>
}

export const UsuarioStore = $state<UsuarioStore>({
    async get(usuarioId) {
        const data = await getUsuarioById(usuarioId)
        return data
    },

    async getAll() {
        const data = await getAllUsuarios()
        return data
    }
})