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
    import { authStore } from "$lib/auth/store.svelte";

    const proyectoId = $derived(page.params.id);

    let resolucion = $state<Documento | null>(null);
    let fileLoad = $state<File | null>(null);

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

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!authStore.user?.id) return;

        if (!input.files || !input.files[0]) return;

        if (resolucion && resolucion.id) {
            console.log("edit");
            fileLoad = input.files[0];
            DocumentoStore.edit(resolucion.id, { replace: true }, fileLoad)
                .then((data) => {
                    resolucion = data;
                    toast.success("Resolucion subida con éxito");
                })
                .catch((error) => {
                    toast.error(
                        `Error al subir la resolucion: ${error.message}`,
                    );
                });
        } else {
            console.log("create");
            fileLoad = input.files[0];
            DocumentoStore.create(
                {
                    tipo: "RESOLUCION DE APROVACION",
                    docUrl: "",
                    proyectoId: proyectoId,
                    usuarioId: authStore.user.id,
                },
                fileLoad,
            )
                .then(() => {
                    getDocumento();
                    toast.success("Resolucion subida con éxito");
                })
                .catch((error) => {
                    toast.success(`Error al subir la resolucion ${error}`);
                });
        }
    }
</script>

<div class="flex justify-between items-end">
    <h1 class="font-semibold">Resolucion de Aprobación</h1>
    <!-- <Button variant="link" class="text-blue-600 py-0 border">
        <a href={carta?.docUrl} class="flex gap-1" target="_blank">
            <FileText />
            Plantilla - Carta de Aceptacion de Asesoramiento
        </a>
    </Button> -->
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

{#if resolucion && resolucion.pdfPath}
    <DocumentoPDF pdfPath={resolucion.pdfPath} />
{:else}
    <span class="opacity-50 italic text-sm mx-4">
        Aún no se ha subido la carta de aceptación.
    </span>
{/if}
