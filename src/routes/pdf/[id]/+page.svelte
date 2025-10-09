<script lang="ts">
    import { page } from "$app/state";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";

    const pdfPDF = page.params.id;
</script>

{#await DocumentoStore.getPDF(pdfPDF)}
    <p>loading</p>
{:then url}
    <iframe src={url} class="w-screen h-screen border-0" title="pdf"></iframe>
{:catch error}
    <p>Documento No encontrado</p>
{/await}
