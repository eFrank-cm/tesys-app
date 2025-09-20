<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
    import MailX from "@lucide/svelte/icons/mail-x";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import CircleX from "@lucide/svelte/icons/circle-x";
    import FileText from "@lucide/svelte/icons/file-text";
    import { auth } from "../../../auth/store.svelte";
    import type { Usuario } from "../../../auth/models";
    import { onMount } from "svelte";
    import { ColaboracionSt } from "../../../general/colaboraciones/store.svelte";
    import { getEmptyPropuesta } from "../models";
    import { formatDateToISO } from "$lib";
    import type { Colaboracion } from "../../../general/colaboraciones/model";

    let colaboracion = $state<Colaboracion | null>(null);
    let propuesta = $state(getEmptyPropuesta());
    let selectedAsesor = $derived(colaboracion?.usuario ?? null);
    let aptosAsesor: Usuario[] = $state([]);
    let disabled = $state(false);

    function cargarSolicitud(colab: Colaboracion) {
        colaboracion = colab;
        if (!colaboracion.propuesta) return;
        propuesta = colaboracion.propuesta;
        disabled = true;
    }

    async function clearFormulario() {
        colaboracion = null;
        propuesta = getEmptyPropuesta();
        selectedAsesor = null;
        disabled = false;
        aptosAsesor = await auth.getUsers(true);
    }

    async function enviarInvitacion() {
        if (!selectedAsesor) return;
        const newColab = await ColaboracionSt.invitarAsesor(
            propuesta.titulo,
            propuesta.resumen,
            selectedAsesor.id,
        );

        console.log(newColab, "nuevo");

        if (!newColab) return;
        cargarSolicitud(newColab);
    }

    async function handleCancel() {
        if (!colaboracion) return;
        await ColaboracionSt.cancelarInvitacion(colaboracion.id);
        clearFormulario();
    }

    $effect(() => {
        console.log(colaboracion, "cambio");
    });

    onMount(async () => {
        const colab = await ColaboracionSt.getSolicitudProyectoActual();
        if (colab) cargarSolicitud(colab);
        else clearFormulario();
    });
</script>

<div class="w-full p-5 border rounded-lg shadow-sm grid gap-5">
    <div class="grid gap-4">
        <h3 class="text-lg font-semibold">Solicitud de asesoramiento</h3>

        <div class="flex items-center gap-2 border-b pb-2">
            <span class="opacity-60">Para</span>
            <ComboPersonas
                personas={aptosAsesor}
                bind:value={selectedAsesor}
                {disabled}
            />
        </div>

        <div class="flex items-start gap-2 border-b pb-1">
            <textarea
                rows={1}
                class="outline-0 font-semibold w-full placeholder:font-normal"
                placeholder="Titulo"
                bind:value={propuesta.titulo}
                {disabled}
            ></textarea>
        </div>

        <textarea
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
            bind:value={propuesta.resumen}
            {disabled}
        ></textarea>

        {#if colaboracion}
            {#if colaboracion.estado === "PENDIENTE"}
                <div class="flex items-center justify-center gap-4">
                    <Badge
                        >Enviado {formatDateToISO(
                            propuesta.createdAtISO,
                        )}</Badge
                    >
                    <Button
                        variant="destructive"
                        size="compact"
                        onclick={handleCancel}
                    >
                        <MailX />
                    </Button>
                </div>
            {:else if colaboracion.estado === "ACEPTADO"}
                <div
                    class="flex items-center justify-center text-sm text-green-600 gap-1"
                >
                    <CircleCheck /> Aceptado el {formatDateToISO(
                        colaboracion.updatedAtISO,
                    )}
                </div>
            {:else if colaboracion.estado === "RECHAZADO"}
                <div class="flex items-center justify-center gap-4">
                    <div
                        class="flex items-center justify-center text-sm text-red-600 gap-1"
                    >
                        <CircleX /> Rechazado el {formatDateToISO(
                            colaboracion.updatedAtISO,
                        )}
                    </div>
                    <Button
                        variant="destructive"
                        size="compact"
                        onclick={handleCancel}
                    >
                        <MailX />
                    </Button>
                </div>
            {/if}
        {:else}
            <div class="flex items-center justify-center">
                <Button onclick={enviarInvitacion}>Enviar</Button>
            </div>
        {/if}
    </div>
</div>

{#if colaboracion?.estado === "ACEPTADO"}
    <div class="w-full my-4 p-4 border rounded-lg shadow-sm">
        <div class="flex gap-8 items-center">
            <span class="font-semibold">Carta de aceptacion:</span>
            <div>
                <p class="text-sm opacity-50">
                    A la espera de la <span class="font-semibold"
                        >Carta de Aceptacion</span
                    >.
                </p>
            </div>

            <!-- <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <Button variant="link">
                        <FileText />
                        Carta de Aceptacion
                    </Button>
                    <span class="text-xs opacity-50">
                        Creado 25 Jun 2025 - 03:43 p.m.
                    </span>
                </div>
            </div> -->
        </div>
    </div>
{/if}
