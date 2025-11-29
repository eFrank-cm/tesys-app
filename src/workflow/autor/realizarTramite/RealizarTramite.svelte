<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as InputOTP from "$lib/components/ui/input-otp/index.js";
    import XIcon from "@lucide/svelte/icons/x";
    import Label from "$lib/components/ui/label/label.svelte";
    import Pencil from "@lucide/svelte/icons/pencil";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import Check from "@lucide/svelte/icons/check";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import FileText from "@lucide/svelte/icons/file-text";
    import { TramiteStore } from "../../../features/planTesis/tramite/store.svelte";
    import { page } from "$app/state";
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";
    import { getTramiteEmpty } from "../../../features/planTesis/tramite/model";

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
    <h3 class="text-lg font-semibold">Realizar Tramite</h3>

    <p class="text-sm my-1">
        Realice el tramite en la plataforma PLADDES siguiendo los pasos
        descritos en la parte inferior.
    </p>

    <div class="flex flex-col gap-2">
        <div class="w-full h-[36rem]">
            <iframe
                src="https://tramite.unsaac.edu.pe/tramite/virtual"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                title="PLADDES"
                class="w-full h-full border rounded-lg"
            ></iframe>
        </div>

        <div class="">
            <Tabs.Root value="interesado">
                <Tabs.List class="w-full">
                    <Tabs.Trigger value="interesado">
                        DATOS DEL INTERESADO
                    </Tabs.Trigger>
                    <Tabs.Trigger value="peticion">
                        DATOS DE LA PETICION
                    </Tabs.Trigger>
                    <Tabs.Trigger value="archivo">ARCHIVO DIGITAL</Tabs.Trigger>
                    <Tabs.Trigger value="confirmar">
                        CONFIRMAR DATOS
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="interesado">
                    <p class="text-sm px-4">
                        Digita tu <strong>codigo de estudiante</strong> y haga
                        clic en <strong>Buscar</strong>.
                    </p>
                </Tabs.Content>
                <Tabs.Content value="peticion">
                    <ul class="ml-10 list-decimal text-balance text-sm px-4">
                        <li>
                            Selecciona la categoria <strong
                                >FACULTADES (ESTUDIANTES)</strong
                            >
                        </li>
                        <li>
                            Marque la casilla de <strong
                                >NOMBRAMIENTO DE ASESOR E INSCRIPCIÓN DE TEMA DE
                                TESIS O TRABAJO DE INVESTIGACIÓN</strong
                            >
                        </li>
                    </ul>
                </Tabs.Content>
                <Tabs.Content value="archivo">
                    <div class="text-sm px-4">
                        Suba los siguientes archivos:
                        <div>
                            <Button variant="link">
                                <FileText />
                                Boucher de Pago
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Copia de DNI
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Ficha de Seguimiento
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Carta de aceptación
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Plan de Tesis
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Informe Turnitin
                            </Button>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="confirmar">
                    <div class="text-xs flex items-center gap-1 px-4">
                        Haga clic en <strong>Guardar</strong> y registe el
                        numero de
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
                </Tabs.Content>
            </Tabs.Root>
        </div>
        {#if tramite.estado === "VALIDADO"}
            <div
                class="bg-green-200 rounded-lg border text-green-600 border-green-600 px-4 py-2 flex items-center gap-2"
            >
                <FileCheck />
                <p>Tramite validado</p>
            </div>
        {:else if tramite.expediente !== ""}
            <p class="italic opacity-50 text-sm">
                Esperando validacion del tramite
            </p>
        {/if}
    </div>
</div>
