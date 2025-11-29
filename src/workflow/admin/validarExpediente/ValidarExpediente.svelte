<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as InputOTP from "$lib/components/ui/input-otp/index.js";
    import XIcon from "@lucide/svelte/icons/x";
    import Label from "$lib/components/ui/label/label.svelte";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Check from "@lucide/svelte/icons/check";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import FileText from "@lucide/svelte/icons/file-text";
    import { TramiteStore } from "../../../features/planTesis/tramite/store.svelte";
    import { page } from "$app/state";
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";
    import {
        getTramiteEmpty,
        type Tramite,
    } from "../../../features/planTesis/tramite/model";

    let proyectoId = $derived(page.params.id);
    let disabled = $state(true);
    let tramite = $state(getTramiteEmpty());

    function getTramite() {
        TramiteStore.getByProyecto(proyectoId, "TRAMITE 1").then((data) => {
            if (data.length === 1) {
                tramite = data[0];
            }
        });
    }

    onMount(() => {
        getTramite();
    });

    $effect(() => {
        console.log("tramite cambiado:", tramite);
    });

    function onSave() {
        console.log("onsave");
        if (tramite.id === "") {
            console.log("crear");
            TramiteStore.create({
                expediente: tramite.expediente,
                tipo: "TRAMITE 1",
                estado: "SIN VALIDAR",
                proyectoId: proyectoId,
            })
                .then(() => {
                    toast.success("Tramite registrado con éxito.");
                    getTramite();
                    disabled = true;
                })
                .catch((error) => {
                    toast.error(
                        `Error al registrar el tramite: ${error.message}`,
                    );
                });
        } else {
            console.log("editar");
            TramiteStore.edit(tramite.id, { ...tramite })
                .then(() => {
                    toast.success("Tramite actualizado con éxito.");
                    getTramite();
                    disabled = true;
                })
                .catch((error) => {
                    toast.error(
                        `Error al actualizar el tramite: ${error.message}`,
                    );
                });
        }
    }
</script>

<div class="">
    <h3 class="text-lg font-semibold">Validar Expediente</h3>

    <p class="text-sm my-1">
        Validar el nro de expediente del tramite realizado por los autores.
    </p>

    <div class="flex flex-col gap-2">
        <div class="text-sm flex items-center justify-between gap-1 px-4">
            <div class="flex gap-2">
                <Label>Expediente:</Label>
                <InputOTP.Root
                    maxlength={6}
                    bind:value={tramite.expediente}
                    {disabled}
                >
                    {#snippet children({ cells })}
                        <InputOTP.Group>
                            {#each cells.slice(0, 6) as cell}
                                <InputOTP.Slot {cell} />
                            {/each}
                        </InputOTP.Group>
                    {/snippet}
                </InputOTP.Root>

                <div class="flex items-center">
                    <select
                        bind:value={tramite.estado}
                        {disabled}
                        class="ml-2 border rounded px-2 py-1 text-sm"
                    >
                        <option value="SIN VALIDAR">SIN VALIDAR</option>
                        <option value="VALIDADO">VALIDADO</option>
                    </select>
                </div>

                <div>
                    {#if disabled}
                        <Button
                            variant="outline"
                            class="border-0 opacity-50"
                            size="icon"
                            onclick={() => (disabled = false)}
                        >
                            <Pencil size={5} />
                        </Button>
                    {:else}
                        <Button
                            variant="outline"
                            class="border-0 text-green-600"
                            size="icon"
                            onclick={() => {
                                onSave();
                                disabled = true;
                            }}
                        >
                            <Check size={5} />
                        </Button>
                        <Button
                            variant="outline"
                            class="border-0 text-red-600"
                            size="icon"
                            onclick={() => {
                                getTramite();
                                disabled = true;
                            }}
                        >
                            <XIcon size={5} />
                        </Button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
