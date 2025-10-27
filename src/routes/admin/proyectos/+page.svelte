<script lang="ts">
    import { onMount } from "svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import * as Table from "$lib/components/ui/table/index.js";
    import { goto } from "$app/navigation";
    import { ColaboracionStore } from "../../../features/general/colaboracion/store.svelte";
    import type { Colaboracion } from "../../../features/general/colaboracion/model";
    import CardInvitacion from "../../../features/general/colaboracion/componentes/CardInvitacion.svelte";
    import type { Proyecto } from "../../../features/general/proyecto/model";
    import { ProyectoStore } from "../../../features/general/proyecto/store.svelte";

    let proyectos = $state<Proyecto[]>([]);

    function selectColaboracion(colaboracion: Colaboracion) {
        if (!colaboracion.proyecto) return;
        goto(`admin/proyectos/${colaboracion.proyecto.id}`);
    }

    function getProyectos() {
        if (!authStore.user) return;
        ProyectoStore.getAll().then((data) => {
            proyectos = data;
        });
    }

    onMount(() => {
        getProyectos();
    });
</script>

<!-- TITULO Y DIALOG NUEVO PROYECTO -->
<div class="flex justify-between">
    <h1 class="font-bold text-2xl">PROYECTOS</h1>
</div>

<hr class="my-2" />

<!-- TABLA DE PROYECTOS -->
<Table.Root>
    <Table.Caption></Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Nro</Table.Head>
            <Table.Head>Titulo</Table.Head>
            <Table.Head>Tipo</Table.Head>
            <Table.Head>Colaboradores</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each proyectos as proyecto, index (proyecto.id)}
            <Table.Row
                class="hover:cursor-pointer"
                onclick={() => goto(`proyectos/${proyecto.id}`)}
            >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{proyecto.titulo}</Table.Cell>
                <Table.Cell>{proyecto.tipo}</Table.Cell>
                <Table.Cell>{proyecto.colaboradores.length}</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
