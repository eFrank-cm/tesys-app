<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import AlignStartVertical from "@lucide/svelte/icons/align-start-vertical";
    import Paperclip from "@lucide/svelte/icons/paperclip";
    import UsersRound from "@lucide/svelte/icons/users-round";
    import Bolt from "@lucide/svelte/icons/bolt";
    import CircleDot from "@lucide/svelte/icons/circle-dot";
    import Newspaper from "@lucide/svelte/icons/newspaper";
    import Actividades from "./Actividades.svelte";
</script>

<h1 class="text-2xl font-semibold">Nombre del Proyecto</h1>
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
        <Tabs.Content value="actividades"><Actividades /></Tabs.Content>
        <Tabs.Content value="resumen">resumen</Tabs.Content>
        <Tabs.Content value="documentos">documentos</Tabs.Content>
        <Tabs.Content value="colaboradores">colaboradores</Tabs.Content>
        <Tabs.Content value="asuntos">asuntos</Tabs.Content>
        <Tabs.Content value="ajustes">ajustes</Tabs.Content>
    </Tabs.Root>
</div>
