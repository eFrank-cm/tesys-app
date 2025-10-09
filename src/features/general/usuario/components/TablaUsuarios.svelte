<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import type { Usuario } from "../model";

    interface Prop {
        usuarios: Usuario[];
    }

    let { usuarios }: Prop = $props();
</script>

<Table.Root>
    <Table.Caption>Tabla de Usuarios</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Nro</Table.Head>
            <Table.Head>Nombre</Table.Head>
            <Table.Head>Username</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Apto Asesor</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each usuarios as usuario, index (usuario.id)}
            <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{usuario.nombres}</Table.Cell>
                <Table.Cell>{usuario.username}</Table.Cell>
                <Table.Cell>{usuario.email}</Table.Cell>
                <Table.Cell>{usuario.aptoAsesor}</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
