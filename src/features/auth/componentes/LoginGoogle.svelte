<script lang="ts">
    /// <reference types="google.accounts" />
    import { onMount } from "svelte";
    import { API_URL } from "../../../api/config";
    import { auth } from "../store.svelte";

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    onMount(() => {
        if (typeof window === "undefined" || !window.google) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("google-button")!,
            {
                type: "standard",
                theme: "outline",
                size: "large",
            },
        );
    });

    function handleCredentialResponse(
        response: google.accounts.id.CredentialResponse,
    ) {
        auth.login("", "", response.credential)
            .then(() => {
                // console.log("Login exitoso con Google");
                // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con Google:", error);
                // Aquí podrías manejar el error, mostrar un mensaje, etc.
            });

        // fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ token: idToken }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("Login correcto:", data);
        //         // Aquí podrías guardar el JWT, redirigir, etc.
        //     })
        //     .catch((err) => {
        //         console.error("Error de login:", err);
        //     });
    }
</script>

<div id="google-button"></div>
