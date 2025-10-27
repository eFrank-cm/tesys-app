import type { Colaboracion } from "./model";
import { createInvitacion, type ColaboracionCreate } from "./services/createInvitacion";
import { deleteColaboracion } from "./services/deleteColaboracion";
import { getColaboracionesByProyectoId } from "./services/getColaboracionesByProyecto";
import { getColaboracionesByUsuarioId } from "./services/getColaboracionesByUsuario";
import { respondInvitation, type ColaboracionRespond } from "./services/respondInvitacion";

interface ColaboracionStore {
    getByUsuarioId: (usuarioId: string) => Promise<Colaboracion[]>
    getByProyectoId: (proyectoId: string) => Promise<Colaboracion[]>
    invitar: (body: ColaboracionCreate) => Promise<Colaboracion>
    responderInvitation: (colaboracionId: string, body: ColaboracionRespond) => Promise<Colaboracion>
    delete: (id: string) => Promise<void>
    getAll(): Promise<Colaboracion[]>
}

export const ColaboracionStore = $state<ColaboracionStore>({
    async getByUsuarioId(usuarioId) {
        const data = await getColaboracionesByUsuarioId(usuarioId)
        return data
    },
    async getByProyectoId(proyectoId) {
        const data = await getColaboracionesByProyectoId(proyectoId)
        return data
    },
    async invitar(body) {
        const data = await createInvitacion(body)
        return data
    },
    async responderInvitation(colaboracionId, body) {
        const data = await respondInvitation(colaboracionId, body)
        return data
    },
    async delete(id) {
        await deleteColaboracion(id)
    },

    async getAll() {
        const data: Colaboracion[] = []
        return data
    }
})