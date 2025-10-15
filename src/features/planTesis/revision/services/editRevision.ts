import { decamelize } from "$lib";
import { URL_API } from "$lib/config";
import { deserializerRevision } from "../model";

export interface RevisionUpdate {
    comentario: string
}

export async function editRevisionById(revisionId: string, payload: RevisionUpdate) {
    const url = `${URL_API}/plan-tesis/revisiones/${revisionId}`
    try {
        const res = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(decamelize(payload))
        });

        if (!res.ok) {
            const body = await res.text();
            throw new Error(`Failed to update revision (${res.status}): ${body}`);
        }

        const result = await res.json();
        const data = deserializerRevision(result)
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}