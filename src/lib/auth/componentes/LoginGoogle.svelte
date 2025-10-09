<script lang="ts">
    /// <reference types="google.accounts" />
    import { onMount } from "svelte";
    import { authStore } from "../store.svelte";

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
        authStore
            .login("", "", response.credential)
            .then(() => {})
            .catch((error) => {
                console.error("Error al iniciar sesión con Google:", error);
            });
    }
</script>

<div id="google-button"></div>
