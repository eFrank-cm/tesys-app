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

        DocumentoStore.getDocAprobadoAsesor(proyectoId).then((data) => {
            console.log("hola");
            if (data) {
                console.log("aprobado");
                console.log(data);
                planes.push(data);
            } else {
                console.log("no hay documentos aprobado");
            }
        });
    }

    onMount(() => getPlanesDeTesis());

    let planesOrdenados = $derived.by(() =>
        [...planes].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        ),
    );
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Revisar Plan de Tesis</h3>
    </div>

    <!-- PLANES SUBIDOS -->
    <div class="flex flex-col gap-8">
        {#each planesOrdenados as plan, index}
            <RevisionPlan
                {plan}
                able={index === 0 ? true : false}
                {proyectoId}
            />
        {/each}
    </div>
</div>
