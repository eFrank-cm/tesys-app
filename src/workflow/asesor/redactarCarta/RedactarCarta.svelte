<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import Plus from "@lucide/svelte/icons/plus";
    import DocumentoPDF from "../../../features/general/documento/components/DocumentoPDF.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { toast } from "svelte-sonner";

    const proyectoId = page.params.id;

    let carta = $state<Documento | null>(null);
    let fileLoad = $state<File | null>(null);

    onMount(() => {
        DocumentoStore.getCarta(proyectoId).then((data) => {
            carta = data;
        });
    });

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0] && carta && carta.id) {
            fileLoad = input.files[0];
            DocumentoStore.edit(carta.id, { replace: true }, fileLoad)
                .then((data) => {
                    carta = data;
                    toast.success("Carta de aceptación subida con éxito");
                })
                .catch((error) => {
                    toast.error(
                        `Error al subir la carta de aceptación: ${error.message}`,
                    );
                });
        }
    }
</script>

<div class="flex justify-between items-end">
    <Button variant="link" class="text-blue-600 py-0 border">
        <a href={carta?.docUrl} class="flex gap-1" target="_blank">
            <FileText />
            Plantilla - Carta de Aceptacion de Asesoramiento
        </a>
    </Button>
    <Label for="fileInput" class={buttonVariants({ variant: "default" })}>
        <Plus />
        Subir
    </Label>
    <Input
        id="fileInput"
        type="file"
        class="hidden"
        accept="application/pdf"
        onchange={handleChange}
    />
</div>
<br />

{#if carta && carta.pdfPath}
    <DocumentoPDF pdfPath={carta.pdfPath} />
{:else}
    <span class="opacity-50 italic text-sm mx-4">
        Aún no se ha subido la carta de aceptación.
    </span>
{/if}
