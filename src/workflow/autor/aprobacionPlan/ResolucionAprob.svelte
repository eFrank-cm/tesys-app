<script lang="ts">
    import DocumentoPDF from "../../../features/general/documento/components/DocumentoPDF.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import type { Documento } from "../../../features/general/documento/model";

    const proyectoId = $derived(page.params.id);

    let resolucion = $state<Documento | null>(null);

    function getDocumento() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "RESOLUCION DE APROVACION",
        ).then((data) => {
            if (data.length > 0) resolucion = data[0];
        });
    }

    onMount(() => {
        getDocumento();
    });
</script>

<div>
    <h3 class="text-lg font-semibold">Aprobacion de Plan de Tesis</h3>
</div>

<br />

{#if resolucion && resolucion.pdfPath}
    <div
        class="bg-green-200 rounded-lg border text-green-600 border-green-600 px-4 py-2 flex items-center gap-2 my-2"
    >
        Felicidades!!... Tu Plan de Tesis fue APROBADO.
    </div>
    <DocumentoPDF pdfPath={resolucion.pdfPath} />
{:else}
    <p class="text-sm my-1 text-balance">
        A la espera de la resolución de aprobación del plan de tesis.
    </p>
{/if}
