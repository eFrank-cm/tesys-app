<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import Plus from "@lucide/svelte/icons/plus";
    import RefreshCCW from "@lucide/svelte/icons/refresh-ccw";
    import DocumentoPDF from "../../../features/general/documento/components/DocumentoPDF.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { toast } from "svelte-sonner";
    import { authStore } from "$lib/auth/store.svelte";

    const proyectoId = page.params.id;

    let carta = $state<Documento | null>(null);
    let cartaPlantilla = $state<Documento | null>(null);
    let fileLoad = $state<File | null>(null);

    onMount(() => {
        refresh();
    });

    function refresh() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "PLANTILLA - CARTA DE ACEPTACION",
        ).then((data) => {
            cartaPlantilla = data[0] ?? null;
        });

        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "CARTA DE ACEPTACION",
        ).then((data) => {
            carta = data[0] ?? null;
            console.log(data);
        });
    }

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            fileLoad = input.files[0];
            DocumentoStore.create(
                {
                    tipo: "CARTA DE ACEPTACION",
                    docUrl: "",
                    proyectoId: proyectoId,
                    usuarioId: authStore.user?.id ?? "",
                },
                input.files[0],
            )
                .then((data) => {
                    refresh();
                })
                .catch((error) => {
                    toast.error(
                        `Error al subir la carta de aceptación: ${error.message}`,
                    );
                });
        }
    }
</script>

<div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold">Revisar Plan de Tesis</h3>
</div>

<div class="flex justify-between items-end">
    <div>
        <Button variant="link" class="text-blue-600 py-0 border">
            <a
                href={cartaPlantilla?.docUrl}
                class="flex gap-1 items-center"
                target="_blank"
            >
                <FileText />
                Carta de Aceptacion
            </a>
        </Button>
        <Button variant="outline" class="text-blue-600 py-0 border hidden">
            <RefreshCCW />
        </Button>
    </div>

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
