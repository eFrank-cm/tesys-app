import { URL_API } from "$lib/config";
import { deserializerAuthUser, type LoginResponse } from "../models";

interface GoogleLoginRequest {
    token: string;
}

export async function verifyGoogleCredentials(payload: GoogleLoginRequest): Promise<LoginResponse | null> {
    const url = `${URL_API}/general/usuarios/api/auth/google`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (response.status === 401) return null

        if (!response.ok) throw new Error("Error al verificar las credenciales de Google")
        const result = await response.json()

        return {
            accessToken: result?.accessToken ?? { token: '', tokenType: '' },
            detail: result?.detail ?? '',
            user: deserializerAuthUser(result?.user),
        }

    } catch (error: any) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido")
    }

}
