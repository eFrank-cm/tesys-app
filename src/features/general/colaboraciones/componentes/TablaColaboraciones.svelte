<script lang="ts">
    import { goto } from "$app/navigation";
    import * as Table from "$lib/components/ui/table/index.js";
    import { onMount } from "svelte";
    import { ColaboracionSt } from "../store.svelte";
    import { auth } from "../../../auth/store.svelte";

    onMount(() => {
        if (auth.user?.id) ColaboracionSt.load(auth.user?.id);
    });
</script>

<Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[100px]">Nro</Table.Head>
            <Table.Head>Titulo</Table.Head>
            <Table.Head>Rol</Table.Head>
            <Table.Head></Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each ColaboracionSt.colaboraciones as colaboracion, index (colaboracion.id)}
            <Table.Row
                onclick={() => goto(`/proyecto/${colaboracion.proyecto.id}`)}
                class="hover:cursor-pointer"
            >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{colaboracion.proyecto.titulo}</Table.Cell>
                <Table.Cell>{colaboracion.role}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
