<script lang="ts">
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import type { Colaboracion } from "../model";
    import BuscarUsuario from "../../usuario/components/BuscarUsuario.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button/index";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import RefreshCW from "@lucide/svelte/icons/refresh-cw";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { ColaboracionStore } from "../store.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";

    interface Prop {
        colaboraciones: Colaboracion[];
        proyectoId: string;
        currentUserId: string;
        className?: string;
    }

    let {
        colaboraciones,
        proyectoId,
        currentUserId,
        className = "",
    }: Prop = $props();

    let colabsNoRechazadas = $derived(
        colaboraciones.filter((colab) => colab.estado !== "RECHAZADO"),
    );

    async function refresh() {
        ColaboracionStore.getByProyectoId(proyectoId).then(
            (data) => (colaboraciones = data),
        );
    }
</script>

<div class={className}>
    <div class="flex justify-between mb-2">
        <h1 class="text-xl font-semibold">Administrar colaboradores</h1>
        <div class="flex gap-2">
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger
                        class={buttonVariants({
                            variant: "secondary",
                            size: "icon",
                        })}
                        onclick={refresh}
                    >
                        <RefreshCW />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Actualizar</p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
            <BuscarUsuario
                omitirIds={[currentUserId]}
                disabledIds={colaboraciones.map((col) => {
                    if (col.estado !== "RECHAZADO") return col.usuarioId;
                    return "";
                })}
                callback={(userSelected, rolSelected) => {
                    ColaboracionStore.invitar({
                        usuarioFrom: currentUserId,
                        usuarioTo: userSelected.id,
                        proyectoId: proyectoId,
                        role: rolSelected,
                    }).then(() => {
                        ColaboracionStore.getByProyectoId(proyectoId).then(
                            (data) => (colaboraciones = data),
                        );
                    });
                }}
            />
        </div>
    </div>

    <div class="border rounded-lg grid">
        <div class="p-4 bg-accent text-sm">
            Gestiona los colaboradores de tu proyecto: invita, administra roles
            y mantén el control del equipo.
        </div>
        <hr />

        <div class="p-4 grid gap-2">
            {#each colabsNoRechazadas as colab}
                <div
                    class="grid grid-cols-4 gap-4 justify-between items-center"
                >
                    {#if colab.usuario}
                        <div class="flex col-span-2 gap-2 items-center">
                            <UserBagde
                                username={colab.usuario.username}
                                email={colab.usuario.email}
                            />
                        </div>
                    {/if}
                    <Badge variant="secondary">{colab.role}</Badge>
                    <span class="flex justify-end items-center">
                        {#if colab.estado === "PENDIENTE"}
                            <span class="text-xs italic mx-2">
                                Invitacion pendiente
                            </span>
                        {/if}
                        {#if colab.role !== "PROPIETARIO"}
                            <Button
                                variant="destructive"
                                size="icon"
                                onclick={() => {
                                    if (!confirm("Seguro que desea eliminar"))
                                        return;
                                    ColaboracionStore.delete(colab.id).then(
                                        () => refresh().then(),
                                    );
                                }}
                            >
                                <Trash2 />
                            </Button>
                        {/if}
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>
