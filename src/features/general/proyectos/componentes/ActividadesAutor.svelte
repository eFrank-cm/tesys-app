<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { Component } from "svelte";
    import InstSolicitarAsesor from "../../../planTesis/solicitarAsesoramiento/components/InstSolicitarAsesor.svelte";
    import Propuesta from "../../../planTesis/solicitarAsesoramiento/components/Propuesta.svelte";
    import InstRedactarPlanTesis from "../../../planTesis/RedactarPlanTesis/components/InstRedactarPlanTesis.svelte";
    import RealizarTramite from "../../../planTesis/RealizarTramite/components/RealizarTramite.svelte";
    import InstRealizarTramite from "../../../planTesis/RealizarTramite/components/InstRealizarTramite.svelte";
    import InstLevandarObs from "../../../planTesis/LevantarObsRevisores/components/InstLevandarObs.svelte";
    import RevisionRevisores from "../../../planTesis/LevantarObsRevisores/components/RevisionRevisores.svelte";
    import ResolucionAprob from "../../../planTesis/AprobacionPlanTesis/components/ResolucionAprob.svelte";
    import RedactarPlanTesis from "../../../planTesis/RedactarPlanTesis/components/RedactarPlanTesis.svelte";
    import InstAprovPlanTesis from "../../../planTesis/AprobacionPlanTesis/components/InstAprovPlanTesis.svelte";
    import RevisionAutor from "../../../planTesis/LevantarObsRevisores/components/RevisionAutor.svelte";

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
            playground: Propuesta,
        },
        {
            value: "redactar-plan-tesis",
            title: "2. Redactar Plan de Tesis",
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
        {/if}
    </div>
</div>
