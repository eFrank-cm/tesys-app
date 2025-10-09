import type { Propuesta } from "./model";
import { createPropuesta, type PropuestaCreate } from "./services/createPropuesta";
import { deletePropuesta } from "./services/deletePropuesta";
import { editPropuestaById, type PropuestaUpdate } from "./services/editPropuesta";
import { getPropuestaByProyectoId } from "./services/getPropuestaByProyecto";

interface PropuestaStore {
    getByProyecto: (proyectoId: string) => Promise<Propuesta | null>
    create: (body: PropuestaCreate) => Promise<Propuesta>
    edit: (propuestaId: string, body: PropuestaUpdate) => Promise<Propuesta>
    delete: (id: string) => Promise<void>
}

export const PropuestaStore = $state<PropuestaStore>({
    async getByProyecto(proyectoId) {
        const data = await getPropuestaByProyectoId(proyectoId)
        return data
    },

    async create(body) {
        const data = await createPropuesta(body)
        return data
    },

    async edit(propuestaId, body) {
        const data = await editPropuestaById(propuestaId, body)
        return data
    },

    async delete(id) {
        await deletePropuesta(id)
    }
})