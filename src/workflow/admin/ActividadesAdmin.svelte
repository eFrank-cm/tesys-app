<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { Component } from "svelte";
    import InstValidarExpediente from "./validarExpediente/InstValidarExpediente.svelte";
    import ValidarExpediente from "./validarExpediente/ValidarExpediente.svelte";
    import InstResolucionAceptacion from "./subirResolucionAcep/InstResolucionAceptacion.svelte";
    import ResolucionAceptacion from "./subirResolucionAcep/ResolucionAceptacion.svelte";
    import InstAsignarRevisores from "./AsignarRevisores/InstAsignarRevisores.svelte";
    import AsignarRevisores from "./AsignarRevisores/AsignarRevisores.svelte";

    interface Activity {
        value: string;
        title: string;
        instructions: Component;
        playground: Component;
    }

    const activities: Activity[] = [
        {
            value: "validar-expediente",
            title: "1. Validar Expediente",
            instructions: InstValidarExpediente,
            playground: ValidarExpediente,
        },
        {
            value: "revisores-plan-tesis",
            title: "2. Nombrar Revisores de Plan de Tesis",
            instructions: InstAsignarRevisores,
            playground: AsignarRevisores,
        },
        {
            value: "subir-resolucion-aceptacion",
            title: "3. Subir Resolcuion de Aceptación",
            instructions: InstResolucionAceptacion,
            playground: ResolucionAceptacion,
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
