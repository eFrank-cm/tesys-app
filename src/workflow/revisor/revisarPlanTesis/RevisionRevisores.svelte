<script lang="ts">
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import { page } from "$app/state";
    import type { Documento } from "../../../features/general/documento/model";
    import { onMount } from "svelte";
    import RevisionPlan from "./RevisionPlan.svelte";

    const proyectoId = page.params.id;
    let planes = $state<Documento[]>([]);

    function getPlanesDeTesis() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "PLAN DE TESIS PARA REVISOR",
        ).then((data) => {
            planes = data;
            console.log(`data documento con revision`);
            console.log(data);
        });
    }

    onMount(() => getPlanesDeTesis());
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Redactar Plan de Tesis</h3>
    </div>

    <p class="text-sm">
        Espera que suban un plan de tesis para comenzar con la revisión.
    </p>

    <!-- PLANES -->
    <div class="flex flex-col-reverse gap-8">
        {#each planes as plan, index}
            <RevisionPlan
                {plan}
                able={index + 1 === planes.length ? true : false}
            />
        {/each}
    </div>
</div>
