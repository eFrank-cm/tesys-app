<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import AlignStartVertical from "@lucide/svelte/icons/align-start-vertical";
    import Paperclip from "@lucide/svelte/icons/paperclip";
    import UsersRound from "@lucide/svelte/icons/users-round";
    import Bolt from "@lucide/svelte/icons/bolt";
    import CircleDot from "@lucide/svelte/icons/circle-dot";
    import Newspaper from "@lucide/svelte/icons/newspaper";
    import ArrowBigLeft from "@lucide/svelte/icons/arrow-big-left";
    import ActividadesAutor from "./ActividadesAutor.svelte";
    import { ProyectoSt } from "../store.svelte";
    import { auth } from "../../../auth/store.svelte";
    import ActividadesAsesor from "./ActividadesAsesor.svelte";
    import ActividadesRevisor from "./ActividadesRevisor.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { goto } from "$app/navigation";

    let rol = $derived(
        ProyectoSt.current?.colaboraciones.find(
            (col) => auth.user?.id === col.usuario?.id,
        )?.role,
    );
</script>

<div class="flex gap-2">
    <Button onclick={() => goto("/proyectos")} size='compact' variant='secondary'>
        <ArrowBigLeft />
    </Button>
    <h1 class="text-xl font-semibold">{ProyectoSt.current?.titulo}</h1>
</div>
<div class="my-4"></div>
<div class="flex w-full">
    <Tabs.Root value="actividades" class="w-full">
        <Tabs.List class="flex gap-4">
            <Tabs.Trigger value="actividades" class="px-4">
                <AlignStartVertical />
                Actividades
            </Tabs.Trigger>
            <Tabs.Trigger value="resumen" class="px-4">
                <Newspaper />
                Resumen
            </Tabs.Trigger>
            <Tabs.Trigger value="documentos" class="px-4">
                <Paperclip />
                Archivos
            </Tabs.Trigger>
            <Tabs.Trigger value="colaboradores" class="px-4">
                <UsersRound />
                Colaboradores
            </Tabs.Trigger>
            <Tabs.Trigger value="asuntos" class="px-4">
                <CircleDot />
                Asuntos
            </Tabs.Trigger>
            <Tabs.Trigger value="ajustes" class="px-4">
                <Bolt />
                Ajustes
            </Tabs.Trigger>
        </Tabs.List>
        <hr class="mb-2" />
        <Tabs.Content value="actividades">
            {#if rol === "PROPIETARIO" || rol === "AUTOR"}
                <ActividadesAutor />
            {:else if rol === "ASESOR"}
                <ActividadesAsesor />
            {:else if rol === "REVISOR"}
                <ActividadesRevisor />
            {/if}
        </Tabs.Content>
        <Tabs.Content value="resumen">resumen</Tabs.Content>
        <Tabs.Content value="documentos">documentos</Tabs.Content>
        <Tabs.Content value="colaboradores">colaboradores</Tabs.Content>
        <Tabs.Content value="asuntos">asuntos</Tabs.Content>
        <Tabs.Content value="ajustes">ajustes</Tabs.Content>
    </Tabs.Root>
</div>
