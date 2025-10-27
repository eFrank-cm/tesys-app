import type { Tramite } from "./model"
import { createTramite, type TramiteCreate } from "./services/createTramite"
import { deleteTramiteById } from "./services/deleteTramiteById"
import { editTramiteById, type TramiteUpdate } from "./services/editTramiteById"
import { getTramiteById } from "./services/getTramiteById"
import { getTramitesByProyecto } from "./services/getTramitesByProyecto"

interface TramiteStore {
    get: (tramiteId: string) => Promise<Tramite | null>
    getByProyecto: (proyectoId: string, tipo?: string) => Promise<Tramite[]>
    create: (payload: TramiteCreate) => Promise<Tramite>
    edit: (tramiteId: string, payload: TramiteUpdate) => Promise<Tramite>
    delete: (tramiteId: string) => Promise<void>
}

export const TramiteStore = $state<TramiteStore>({
    async get(tramiteId) {
        const data = await getTramiteById(tramiteId)
        return data
    },

    async getByProyecto(proyectoId, tipo) {
        const data = await getTramitesByProyecto(proyectoId, tipo)
        return data
    },

    async create(payload) {
        const data = await createTramite(payload)
        return data
    },

    async edit(tramiteId, payload) {
        const data = await editTramiteById(tramiteId, payload)
        return data
    },

    async delete(tramiteId) {
        await deleteTramiteById(tramiteId)
    },
})