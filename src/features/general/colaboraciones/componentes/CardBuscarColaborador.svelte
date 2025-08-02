<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import Plus from "@lucide/svelte/icons/plus";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import type { Usuario } from "../../../auth/models";
    import LabelUsuario from "../../../LabelUsuario.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import X from "@lucide/svelte/icons/x";
    import { onMount } from "svelte";
    import { auth } from "../../../auth/store.svelte";
    import { ColaboracionSt } from "../store.svelte";
    import type { Colaboracion } from "../model";
    import SelectTipoColaborador from "./SelectTipoColaborador.svelte";
    import { ProyectoSt } from "../../proyectos/store.svelte";

    interface Props {
        colaboraciones: Colaboracion[];
        proyectoId: string;
    }

    let { colaboraciones = $bindable(), proyectoId }: Props = $props();

    let searching = $state("");
    let userSelected = $state<Usuario | null>(null);
    let usuarios = $state<Usuario[]>([]);
    let tipoColaborador = $state("AUTOR");
    const options = [
        { value: "AUTOR", label: "Autor" },
        { value: "ASESOR", label: "Asesor" },
    ];

    onMount(async () => {
        const data = await auth.getUsers();

        usuarios = data.filter(
            (user) =>
                !colaboraciones.some(
                    (c) => c.usuario && c.usuario.id === user.id,
                ),
        );
    });

    let usuariosFiltered = $derived(
        usuarios.filter(
            (usuario) =>
                usuario.username
                    .toLowerCase()
                    .includes(searching.toLowerCase()) ||
                usuario.email.toLowerCase().includes(searching.toLowerCase()),
        ),
    );

    async function handleAgregar() {
        if (!userSelected) return;
        await ColaboracionSt.createInvitation(
            tipoColaborador,
            userSelected.id,
            proyectoId,
        );
        userSelected = null;
        searching = "";
        ProyectoSt.reset();
    }

    async function hanldleDelete(colaboracionId: string) {
        ColaboracionSt.deleteInvitacion(colaboracionId);
        ProyectoSt.reset();
    }
</script>

<Dialog.Root>
    <Dialog.Trigger
        class={buttonVariants({ variant: "outline", size: "icon" })}
    >
        <Plus />
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[40rem]">
        <Dialog.Header>
            <Dialog.Title>Colaboradores</Dialog.Title>
        </Dialog.Header>

        {#each colaboraciones as colab (colab.id)}
            <div
                class="flex justify-between items-center border rounded-md pr-2"
            >
                <LabelUsuario
                    username={colab.usuario?.username ?? ""}
                    email={colab.usuario?.email ?? ""}
                />
                <Badge variant="secondary">{colab.role}</Badge>
                <span class="text-xs text-primary">
                    {colab.estado === "PENDIENTE" ? "Pendiente" : ""}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    onclick={() => hanldleDelete(colab.id)}
                >
                    <Trash2 class="text-red-500" />
                </Button>
            </div>
        {/each}

        <h5 class="text-md text-primary font-semibold">Nuevo colaborador</h5>

        {#if userSelected}
            <div
                class="flex justify-between items-center border border-blue-600 rounded-md pr-2"
            >
                <LabelUsuario
                    username={userSelected.username}
                    email={userSelected.email}
                />

                <SelectTipoColaborador bind:value={tipoColaborador} {options} />

                <Button
                    variant="outline"
                    size="icon"
                    onclick={() => (userSelected = null)}
                >
                    <X class="text-red-500" />
                </Button>
            </div>
        {:else}
            <div class="grid gap-4">
                <Input
                    placeholder="Buscar nuevo colaborador"
                    bind:value={searching}
                />

                {#if searching !== ""}
                    <div
                        class="grid gap-2 p-2 max-h-80 overflow-y-scroll border rounded-md"
                    >
                        {#each usuariosFiltered as user (user.id)}
                            <button
                                class="p-0 disabled:bg-accent"
                                onclick={() => (userSelected = user)}
                            >
                                <LabelUsuario
                                    username={user.username}
                                    email={user.email}
                                />
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}

        <Dialog.Footer>
            <Button
                type="submit"
                disabled={!userSelected}
                onclick={handleAgregar}
            >
                Agregar
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
