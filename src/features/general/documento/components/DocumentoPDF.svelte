<script lang="ts">
    import { DocumentoStore } from "../store.svelte";

    interface Prop {
        pdfPath: string;
    }

    let { pdfPath }: Prop = $props();
</script>

{#await DocumentoStore.getPDF(pdfPath)}
    <p>loading</p>
{:then url}
    <div class="border rounded-lg shadow-sm">
        <embed
            src={url}
            type="application/pdf"
            class="w-full h-[60rem] rounded-lg"
        />
    </div>
{:catch error}
    <p>Documento No encontrado</p>
{/await}
