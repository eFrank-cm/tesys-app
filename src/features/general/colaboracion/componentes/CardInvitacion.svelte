<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import type { Colaboracion } from "../model";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import {
        getEmptyPropuesta,
        type Propuesta,
    } from "../../../planTesis/propuesta/model";
    import PropuestaProyecto from "../../../planTesis/propuesta/componentes/PropuestaProyecto.svelte";
    import { onMount } from "svelte";
    import { PropuestaStore } from "../../../planTesis/propuesta/store.svelte";
    import { ColaboracionStore } from "../store.svelte";
    import { DocumentoStore } from "../../documento/store.svelte";
    import { authStore } from "$lib/auth/store.svelte";

    interface Prop {
        invitacion?: Colaboracion | null;
        callbackOnAcepted?: () => void;
        callbackOnDeny?: () => void;
    }

    let {
        invitacion = null,
        callbackOnAcepted = () => {},
        callbackOnDeny = () => {},
    }: Prop = $props();

    let propuesta = $state<Propuesta>(getEmptyPropuesta());
    let open = $state(false);

    onMount(() => {
        if (invitacion)
            PropuestaStore.getByProyecto(invitacion.proyectoId).then((data) => {
                if (data) propuesta = data;
            });
    });

    function responder(respuesta: "ACEPTADO" | "RECHAZADO") {
        if (invitacion)
            ColaboracionStore.responderInvitation(invitacion.id, {
                respuesta,
            }).then(() => {
                open = false;
            });

        if (invitacion?.role === "ASESOR") {
            DocumentoStore.create({
                tipo: "PLANTILLA - CARTA DE ACEPTACION",
                docUrl: "",
                proyectoId: invitacion?.proyectoId ?? "",
                usuarioId: authStore.user?.id ?? "",
            });
        } else if (invitacion?.role === "REVISOR") {
            DocumentoStore.create({
                tipo: "PLANTILLA - FORMATO DE EVALUACION",
                docUrl: "",
                proyectoId: invitacion?.proyectoId ?? "",
                usuarioId: authStore.user?.id ?? "",
            });

            DocumentoStore.create({
                tipo: "PLANTILLA - INFORME PROVEIDO",
                docUrl: "",
                proyectoId: invitacion?.proyectoId ?? "",
                usuarioId: authStore.user?.id ?? "",
            });
        }
    }
</script>

{#if invitacion}
    <button onclick={() => (open = true)}>
        <div class="flex">
            <div
                class="border rounded-lg p-2 flex gap-2 shadow-sm hover:bg-accent hover:cursor-pointer"
            >
                <div>
                    {#if invitacion.creator}
                        <UserBagde
                            username={invitacion.creator.username}
                            email={invitacion.creator.email}
                        />
                    {/if}

                    <p class="text-sm px-1 mt-2">
                        Te invita a ser <span class="font-semibold"
                            >{invitacion.role}</span
                        > de su proyecto
                    </p>
                </div>
            </div>
        </div>
    </button>
    <Dialog.Root bind:open>
        <Dialog.Trigger />
        <Dialog.Content class="min-w-[50rem]">
            <Dialog.Header>
                <Dialog.Title>Invitacion</Dialog.Title>
                <Dialog.Description>
                    Propuesta del proyecto a colaborar como <span
                        class="font-semibold">{invitacion.role}</span
                    >
                </Dialog.Description>
            </Dialog.Header>
            <PropuestaProyecto onlyRead={true} {propuesta} />
            <Dialog.Footer>
                <div class="flex gap-2 items-center justify-center w-full">
                    <Button
                        variant="destructive"
                        onclick={() => {
                            responder("RECHAZADO");
                            callbackOnDeny();
                            invitacion = null;
                        }}>Denegar</Button
                    >
                    <Button
                        class="bg-green-600 hover:bg-green-700"
                        onclick={() => {
                            responder("ACEPTADO");
                            callbackOnAcepted();
                        }}>Aceptar</Button
                    >
                </div>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
{/if}
