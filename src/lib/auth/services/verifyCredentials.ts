import { URL_API } from "$lib/config";
import { deserializerAuthUser, type LoginResponse } from "../models";

interface LoginRequest {
    username: string;
    password: string;
}

export async function verifyCredentials(payload: LoginRequest): Promise<LoginResponse | null> {
    const url = `${URL_API}/general/usuarios/auth`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (response.status === 401 || response.status === 403) return null

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error desconocido del servidor")
        }

        const result = await response.json()

        return {
            accessToken: result?.accessToken ?? { token: "", tokenType: "" },
            detail: result?.detail ?? "",
            user: deserializerAuthUser(result?.user),
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido")
    }
}
