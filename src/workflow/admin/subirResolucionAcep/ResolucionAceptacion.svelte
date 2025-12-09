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
    import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
    import LoadingIcon from "$lib/components/custom/LoadingIcon.svelte";
    import { cn } from "$lib/utils";

    const proyectoId = $derived(page.params.id);

    let resolucion = $state<Documento | null>(null);
    let fileLoad = $state<File | null>(null);
    let resolucionPlantilla = $state<Documento | null>(null);
    let loadingPlantilla = $state(false);

    function getDocumento() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "RESOLUCION DE APROVACION",
        ).then((data) => {
            if (data.length > 0) resolucion = data[0];
        });
    }

    function getPlantilla() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "PLANTILLA - RESOLUCION",
        ).then((data) => {
            resolucionPlantilla = data[0] ?? null;
        });
    }

    onMount(() => {
        getDocumento();
        getPlantilla();
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

    function crearPlantilla() {
        loadingPlantilla = true;
        DocumentoStore.create({
            tipo: "PLANTILLA - RESOLUCION",
            docUrl: "",
            proyectoId: proyectoId ?? "",
            usuarioId: authStore.user?.id ?? "",
        })
            .then(() => {
                getPlantilla();
            })
            .catch((error) => {
                toast.success(
                    `Error al crear la plantilla de resolucion ${error}`,
                );
            })
            .finally(() => {
                loadingPlantilla = false;
            });
    }
</script>

<div class="flex justify-between items-end">
    <h1 class="font-semibold">Subir Resolucion de Aprobación</h1>
    <div>
        {#if resolucionPlantilla}
            <Button variant="link" class="text-blue-600 py-0 border">
                <a
                    href={resolucionPlantilla?.docUrl}
                    class="flex gap-1 items-center"
                    target="_blank"
                >
                    <FileText />
                    Plantilla - Resolucion
                </a>
            </Button>
            <Button variant="outline" class="text-blue-600 py-0 border hidden">
                <RefreshCcw />
            </Button>
        {:else}
            <Button
                variant="outline"
                disabled={loadingPlantilla}
                onclick={crearPlantilla}
            >
                <span
                    class={cn(
                        "flex items-center",
                        !loadingPlantilla ? "hidden" : "",
                    )}
                >
                    <LoadingIcon />
                </span>
                Crear Plantilla
            </Button>
        {/if}
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

{#if resolucion && resolucion.pdfPath}
    <DocumentoPDF pdfPath={resolucion.pdfPath} />
{:else}
    <span class="opacity-50 italic text-sm mx-4">
        Aún no se ha subido la carta de aceptación.
    </span>
{/if}
