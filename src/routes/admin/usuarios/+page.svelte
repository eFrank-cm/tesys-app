<script lang="ts">
    import { onMount } from "svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import * as Table from "$lib/components/ui/table/index.js";
    import type { Usuario } from "../../../features/general/usuario/model";
    import { UsuarioStore } from "../../../features/general/usuario/store.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { toast } from "svelte-sonner";
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import BadgeCheck from "@lucide/svelte/icons/badge-check";

    let usuarios = $state<Usuario[]>([]);
    let userSelected = $state<Usuario | null>(null);
    let open = $state(false);

    function selectUser(user: Usuario) {
        userSelected = { ...user };
        open = true;
    }

    function getUsuarios() {
        if (!authStore.user) return;
        UsuarioStore.getAll().then((data) => {
            if (data) {
                console.log(data);
                usuarios = data.filter((u) => u.tipo !== "ADMIN");
            }
        });
    }

    onMount(() => {
        getUsuarios();
    });

    $effect(() => {
        console.log(usuarios);
    });

    function onSave() {
        if (!userSelected) return;
        const fechaNacimiento =
            userSelected.fechaNacimiento === ""
                ? undefined
                : userSelected.fechaNacimiento;
        UsuarioStore.edit(userSelected.id, {
            ...userSelected,
            fechaNacimiento: fechaNacimiento,
        })
            .then(() => {
                toast.success("Usuario actualizado con éxito");
                getUsuarios();
            })
            .catch((error) => {
                toast.error(`Error al actualizar el usuario: ${error.message}`);
            });
    }
</script>

<!-- TITULO Y DIALOG NUEVO PROYECTO -->
<div class="flex justify-between">
    <h1 class="font-bold text-2xl">Usuarios</h1>
</div>

<hr class="my-2" />

<!-- TABLA DE PROYECTOS -->
<Table.Root>
    <Table.Caption></Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Nro</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Username</Table.Head>
            <Table.Head>Nombre</Table.Head>
            <Table.Head>Tipo</Table.Head>
            <Table.Head>Apto asesor</Table.Head>
            <Table.Head>Apto revisor</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each usuarios as user, index (user.id)}
            <Table.Row
                class="hover:cursor-pointer"
                onclick={() => selectUser(user)}
            >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>
                    {`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}
                </Table.Cell>
                <Table.Cell>{user.tipo}</Table.Cell>

                <Table.Cell class="text-center">
                    {#if user.aptoAsesor}
                        <BadgeCheck class="mx-auto text-green-500" />
                    {:else}
                        <span class="text-muted-foreground">—</span>
                    {/if}
                </Table.Cell>

                <Table.Cell class="text-center">
                    {#if user.aptoRevisor}
                        <BadgeCheck class="mx-auto text-green-500" />
                    {:else}
                        <span class="text-muted-foreground">—</span>
                    {/if}
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

{#if userSelected}
    <Dialog.Root bind:open>
        <Dialog.Trigger />
        <Dialog.Content class="sm:max-w-[32rem]">
            <Dialog.Header>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description>
                    Make changes to your profile here. Click save when you're
                    done.
                </Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="name" class="text-right">Email</Label>
                    <Input bind:value={userSelected.email} class="col-span-2" />
                </div>

                <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="username" class="text-right">Username</Label>
                    <Input
                        bind:value={userSelected.username}
                        class="col-span-2"
                    />
                </div>

                <!-- NOMBRES -->
                <div class="grid gap-2">
                    <Label for="username" class="text-right"
                        >Apellidos y Nombres</Label
                    >
                    <div class="grid grid-cols-3 gap-2">
                        <Input
                            bind:value={userSelected.nombres}
                            class="w-full"
                            placeholder="Nombres"
                        />
                        <Input
                            bind:value={userSelected.apellidoPaterno}
                            class="w-full"
                            placeholder="Apellido Paterno"
                        />
                        <Input
                            bind:value={userSelected.apellidoMaterno}
                            class="w-full"
                            placeholder="Apellido Materno"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-3">
                    <div class="grid gap-2">
                        <Label class="text-right">Fecha de Nacimiento</Label>
                        <Input
                            type="date"
                            bind:value={userSelected.fechaNacimiento}
                        />
                    </div>

                    <div class="grid justify-center">
                        <RadioGroup.Root bind:value={userSelected.genero}>
                            <div class="flex gap-1">
                                <RadioGroup.Item value="M" id="M" />
                                <label for="M">Masculino</label>
                            </div>

                            <div class="flex gap-1">
                                <RadioGroup.Item value="F" id="F" />
                                <label for="F">Femenino</label>
                            </div>
                        </RadioGroup.Root>
                    </div>
                    <div class="grid gap-2">
                        <Label class="text-right">Nro Celular</Label>
                        <Input bind:value={userSelected.celular} />
                    </div>
                </div>

                <div class="grid grid-cols-2">
                    <div class="flex gap-1 justify-center">
                        <Label for="apto-asesor" class="text-right">
                            Apto Asesor
                        </Label>
                        <input
                            id="apto-asesor"
                            type="checkbox"
                            bind:checked={userSelected.aptoAsesor}
                            class="col-span-3"
                        />
                    </div>
                    <div class="flex gap-1 justify-center">
                        <Label for="apto-revisor" class="text-right">
                            Apto Revisor
                        </Label>
                        <input
                            id="apto-revisor"
                            type="checkbox"
                            bind:checked={userSelected.aptoRevisor}
                            class="col-span-3"
                        />
                    </div>
                </div>
            </div>
            <Dialog.Footer>
                <Button onclick={onSave}>Guardar</Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
{/if}
