<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { Component } from "svelte";
    import InstResisarPlanRevisor from "./revisarPlanTesis/InstResisarPlanRevisor.svelte";
    import RevisionRevisores from "./revisarPlanTesis/RevisionRevisores.svelte";

    interface Activity {
        value: string;
        title: string;
        instructions: Component;
        playground: Component;
    }

    const activities: Activity[] = [
        {
            value: "revisar-plan-tesis",
            title: "1. Revisar Plan de Tesis",
            instructions: InstResisarPlanRevisor,
            playground: RevisionRevisores,
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
