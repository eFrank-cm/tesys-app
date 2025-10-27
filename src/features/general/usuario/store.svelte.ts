import type { Usuario } from "./model"
import { editUsuarioById, type UsuarioUpdate } from "./services/editUsuario"
import { getUsuarioById } from "./services/getUsuarioById"
import { getAllUsuarios } from "./services/getUsuarios"


interface UsuarioStore {
    get: (usuarioId: string) => Promise<Usuario | null>
    getAll: () => Promise<Usuario[]>
    edit: (usuarioId: string, payload: UsuarioUpdate) => Promise<Usuario>
}

export const UsuarioStore = $state<UsuarioStore>({
    async get(usuarioId) {
        const data = await getUsuarioById(usuarioId)
        return data
    },

    async getAll() {
        const data = await getAllUsuarios()
        return data
    },

    async edit(usuarioId, payload) {
        const data = await editUsuarioById(usuarioId, payload)
        return data
    },
})