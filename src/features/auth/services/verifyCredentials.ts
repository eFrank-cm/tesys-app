import { API_URL } from "../../../api/config";
import { deserializerUsuario, type Usuario } from "../models";

interface LoginRequest {
    username: string
    password: string
}

interface LoginResponse {
    detail: string
    user: Usuario
    accessToken: {
        token: string
        tokenType: string
    }
}

export async function verifyCredentials(data: LoginRequest): Promise<LoginResponse | null> {
    const url = `${API_URL}/general/usuarios/auth`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            // el backend devuelve { detail: string } en error
            throw new Error(result.detail || "Error desconocido del servidor");
        }

        return {
            accessToken: result.accessToken,
            detail: result.detail,
            user: result.user,
        };

    } catch (error: any) {
        // Propagamos el error con su mensaje
        throw new Error(error.message || "Error de red");
    }
}

export async function verifyGoogleCredentials(token: string): Promise<LoginResponse | null> {
    const url = `${API_URL}/general/usuarios/api/auth/google`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
        if (!response.ok) {
            throw new Error("Error al verificar las credenciales de Google");
        }
        const result: LoginResponse = await response.json();

        return {
            accessToken: result.accessToken,
            detail: result.detail,
            user: deserializerUsuario(result.user),
        };

    } catch (error: any) {
        // Propagamos el error con su mensaje
        throw new Error(error.message || "Error de red");
    }

}
