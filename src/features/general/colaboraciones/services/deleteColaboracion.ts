import { API_URL } from "../../../../api/config";

export async function deleteInvitationToColaboration(colaboracionId: string) {
    const url = `${API_URL}/general/colaboraciones/delete/${colaboracionId}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        const res = await response.json();
        return res
    } catch (error) {
        throw error;
    }
}