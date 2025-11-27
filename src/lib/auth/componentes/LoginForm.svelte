<script lang="ts">
    import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { authStore } from "../store.svelte";
    import LoginGoogle from "./LoginGoogle.svelte";
    import { goto } from "$app/navigation";

    const id = $props.id();

    let username = $state("");
    let password = $state("");

    async function handleLogin(event: Event) {
        event.preventDefault();
        const path = await authStore.login(username, password);
        if (path) goto(path);
    }
</script>

<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title class="text-xl flex gap-1 justify-center items-center">
            <a href="##" class="flex flex-col items-center gap-2 font-medium">
                <div class="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEndIcon class="size-6" />
                </div>
            </a>
            Tesys
        </Card.Title>
        <Card.Description class="text-center">
            Ingrese sus credenciales para iniciar sesión.
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <form onsubmit={handleLogin}>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="username-{id}">Usuario</Label>
                    <Input
                        id="username-{id}"
                        type="text"
                        placeholder="Correo electronico institucional"
                        bind:value={username}
                        required
                    />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password-{id}">Contraseña</Label>
                    </div>
                    <Input
                        id="password-{id}"
                        type="password"
                        bind:value={password}
                        required
                    />
                </div>
                <Button type="submit" class="w-full bg-[#9b192d]">
                    {authStore.loading ? "Ingresando..." : "Iniciar sesion"}
                </Button>
                <LoginGoogle />

                {#if authStore.error}
                    <p class="text-red-500 text-sm">{authStore.error}</p>
                {/if}
            </div>
        </form>
    </Card.Content>
</Card.Root>
