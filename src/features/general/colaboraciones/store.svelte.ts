import { ProyectoSt } from "../proyectos/store.svelte";
import type { Colaboracion } from "./model";
import { createColaboracionLikeInvitacion } from "./services/createColaboracion";
import { deleteInvitationToColaboration } from "./services/deleteColaboracion";
import { getColaboracionesByUsuarioId } from "./services/getColaboraciones";

interface ColaboracionSt {
    colaboraciones: Colaboracion[],
    load: (usuarioId: string) => Promise<void>
    reset: () => void
    createInvitation: (role: string, usuarioId: string, proyectoId: string) => Promise<void>
    deleteInvitacion: (colaboracionId: string) => Promise<void>
}

export const ColaboracionSt = $state<ColaboracionSt>({
    colaboraciones: [],
    load: async (usuarioId) => {
        const data = await getColaboracionesByUsuarioId(usuarioId)
        ColaboracionSt.colaboraciones = data
    },
    reset: () => {
        ColaboracionSt.colaboraciones = []
    },

    async createInvitation(role, usuarioId, proyectoId) {
        await createColaboracionLikeInvitacion({
            role, usuario_id: usuarioId, proyecto_id: proyectoId
        })
        await ProyectoSt.refresh()
    },

    async deleteInvitacion(colaboracionId) {
        await deleteInvitationToColaboration(colaboracionId)
        await ProyectoSt.refresh()
    },
})