import type { Revision } from "./model"
import { createRevision, type RevisionCreate } from "./services/createRevision"
import { deleteRevisionById } from "./services/deleteRevision"
import { editRevisionById, type RevisionUpdate } from "./services/editRevision"


interface RevisionStore {
    create: (body: RevisionCreate) => Promise<Revision>
    edit: (id: string, body: RevisionUpdate) => Promise<Revision>
    delete: (id: string) => Promise<void>

}

export const RevisionStore = $state<RevisionStore>({
    async create(body) {
        const data = await createRevision(body)
        return data
    },

    async edit(id, body) {
        const data = await editRevisionById(id, body)
        return data
    },

    async delete(id) {
        await deleteRevisionById(id)
    },
})