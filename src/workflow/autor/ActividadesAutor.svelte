<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
    import MoveRight from "@lucide/svelte/icons/move-right";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { Component } from "svelte";
    import InstRedactarPlanTesis from "./redactarPlanTesis/InstRedactarPlanTesis.svelte";
    import RedactarPlanTesis from "./redactarPlanTesis/RedactarPlanTesis.svelte";
    import InstRealizarTramite from "./realizarTramite/InstRealizarTramite.svelte";
    import RealizarTramite from "./realizarTramite/RealizarTramite.svelte";
    import InstLevandarObs from "./levantarObservaciones/InstLevandarObs.svelte";
    import RevisionAutor from "./levantarObservaciones/RevisionAutor.svelte";
    import InstAprovPlanTesis from "./aprobacionPlan/InstAprovPlanTesis.svelte";
    import ResolucionAprob from "./aprobacionPlan/ResolucionAprob.svelte";
    import InstSolicitarAsesor from "./SolicitarAsesoramiento/InstSolicitarAsesor.svelte";
    import SolicitarAsesoramiento from "./SolicitarAsesoramiento/SolicitarAsesoramiento.svelte";

    interface Activity {
        value: string;
        title: string;
        instructions: Component;
        playground: Component;
    }

    const activities: Activity[] = [
        {
            value: "solicitar-asesoramiento",
            title: "1. Solicitar asesoramiento",
            instructions: InstSolicitarAsesor,
            playground: SolicitarAsesoramiento,
        },
        {
            value: "revisar-plan-tesis",
            title: "2. Revisar Plan de Tesis",
            instructions: InstRedactarPlanTesis,
            playground: RedactarPlanTesis,
        },
        {
            value: "realizar-tramite",
            title: "3. Realizar Tramite",
            instructions: InstRealizarTramite,
            playground: RealizarTramite,
        },
        {
            value: "levantar-observaciones",
            title: "4. Levantar observacion de revisores",
            instructions: InstLevandarObs,
            playground: RevisionAutor,
        },
        {
            value: "aprobacion",
            title: "5. Aprobacion de Plan de Tesis",
            instructions: InstAprovPlanTesis,
            playground: ResolucionAprob,
        },
    ];

    let ActSelected = $state<Activity | null>(null);

    function handleShowTarea(value: string) {
        const tmp = activities.find((act) => act.value === value);
        if (!tmp) return;
        ActSelected = tmp;
    }

    function seCompletoActividad() {
        
    }

    function nextStep() {
        if (!ActSelected) return;
        const index = activities.findIndex(
            (act) => act.value === ActSelected?.value,
        );

        if (index === -1 || index >= activities.length) return;

        ActSelected = activities[index + 1];
    }
</script>

<div class="flex gap-8">
    <div class="w-5/12 border-r pr-8">
        <Accordion.Root
            type="multiple"
            value={["item-1"]}
            class="flex flex-col gap-2"
        >
            {#each activities as act (act.value)}
                <Accordion.Item value={act.value}>
                    <Accordion.Trigger>
                        <div class="flex justify-between items-center w-full">
                            {act.title}
                            <Button
                                size="compact"
                                variant={ActSelected?.value === act.value
                                    ? "default"
                                    : "secondary"}
                                onclick={(e: MouseEvent) => {
                                    e.stopPropagation();
                                    handleShowTarea(act.value);
                                }}
                            >
                                <ChevronsRight />
                            </Button>
                        </div>
                    </Accordion.Trigger>

                    <Accordion.Content class="flex flex-col gap-4 pl-4">
                        <act.instructions />
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </div>

    <div class="w-7/12">
        {#if ActSelected}
            <ActSelected.playground />

            {#if ActSelected.value !== activities.at(-1)?.value}
                <div class="w-full flex justify-end my-4">
                    <Button onclick={nextStep} variant="link">
                        Continuar
                        <MoveRight />
                    </Button>
                </div>
            {/if}
        {/if}
    </div>
</div>
