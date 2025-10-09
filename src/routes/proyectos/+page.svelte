<script lang="ts">
    import { onMount } from "svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import type { Colaboracion } from "../../features/general/colaboracion/model";
    import { ColaboracionStore } from "../../features/general/colaboracion/store.svelte";
    import CardInvitacion from "../../features/general/colaboracion/componentes/CardInvitacion.svelte";
    import * as Table from "$lib/components/ui/table/index.js";
    import { goto } from "$app/navigation";
    import Plus from "@lucide/svelte/icons/plus";
    import Button from "$lib/components/ui/button/button.svelte";

    let colaboraciones = $state<Colaboracion[]>([]);

    let invitaciones = $derived(
        colaboraciones.filter((colab) => colab.estado === "PENDIENTE"),
    );

    let colaboracionesAceptadas = $derived(
        colaboraciones.filter((colab) => colab.estado === "ACEPTADO"),
    );

    function selectColaboracion(colaboracion: Colaboracion) {
        if (!colaboracion.proyecto) return;
        goto(`/proyecto/${colaboracion.proyecto.id}`);
    }

    function getColaboraciones() {
        if (!authStore.user) return;
        ColaboracionStore.getByUsuarioId(authStore.user.id).then((data) => {
            if (data) {
                console.log(data);
                colaboraciones = data;
            }
        });
    }

    onMount(() => {
        getColaboraciones();
    });
</script>

<div class="mb-4">
    {#each invitaciones as invitacion (invitacion.id)}
        <CardInvitacion
            {invitacion}
            callbackOnAcepted={() => {
                goto(`/proyecto/${invitacion.proyectoId}`);
            }}
        />
    {/each}
</div>

<!-- TITULO Y DIALOG NUEVO PROYECTO -->
<div class="flex justify-between">
    <h1 class="font-bold text-2xl">PROYECTOS</h1>
    <Button onclick={() => goto("/proyecto/nuevo")}>
        <Plus />
        Nuevos
    </Button>
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
            <Table.Head>Rol</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each colaboracionesAceptadas as colab, index (colab.id)}
            {#if colab.proyecto}
                <Table.Row
                    onclick={() => selectColaboracion(colab)}
                    class="hover:cursor-pointer"
                >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{colab.proyecto.titulo}</Table.Cell>
                    <Table.Cell>{colab.proyecto.tipo}</Table.Cell>
                    <Table.Cell>{colab.role}</Table.Cell>
                </Table.Row>
            {/if}
        {/each}
    </Table.Body>
</Table.Root>
