<script>
    import LoginForm from "../../features/auth/componentes/LoginForm.svelte";
    import { goto } from "$app/navigation";
    import { auth } from "../../features/auth/store.svelte";

    $effect(() => {
        if (auth.token) {
            goto("/");
        }
    });
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
    <LoginForm />
</div>
