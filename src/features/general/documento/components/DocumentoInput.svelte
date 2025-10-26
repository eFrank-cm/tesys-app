<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button/index";
    import { Label } from "$lib/components/ui/label/index";
    import FileUp from "@lucide/svelte/icons/file-up";
    import FileText from "@lucide/svelte/icons/file-text";
    import { Input } from "$lib/components/ui/input/index";
    import type { Documento } from "../model";
    import { Button } from "$lib/components/ui/button/index";
    import { DocumentoStore } from "../store.svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import { toast } from "svelte-sonner";
    import { error } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import Page from "../../../../routes/+page.svelte";
    import X from "@lucide/svelte/icons/x";
    import { formatDateToISO } from "$lib";

    interface Prop {
        label: string;
        proyectoId: string;
        tipo: string;
        readonly?: boolean;
    }

    let { label, proyectoId, tipo, readonly = false }: Prop = $props();
    let doc = $state<Documento | null>(null);
    let fileLoad = $state<File | null>(null);

    function getDocumento() {
        DocumentoStore.getDocumentosWithRevision(proyectoId, tipo).then(
            (data) => {
                if (data.length === 0) {
                    doc = null;
                } else if (data.length === 1) {
                    doc = data[0];
                } else {
                    toast.warning(`${tipo}: ${data.length}`);
                }
            },
        );
    }

    onMount(() => getDocumento());

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0] && authStore.user) {
            fileLoad = input.files[0];
            DocumentoStore.create(
                {
                    tipo: tipo,
                    docUrl: "",
                    usuarioId: authStore.user.id,
                    proyectoId: proyectoId,
                },
                fileLoad,
            )
                .then(() => {
                    getDocumento();
                    toast.success("Creado Correctamente");
                })
                .catch((error) => {
                    toast.error(`${error}`);
                });
        }
    }

    function onDelete() {
        if (doc) DocumentoStore.delete(doc.id).then(() => getDocumento());
    }
</script>

<div class="flex items-center gap-4">
    {#if doc}
        <div class="flex items-center">
            {#if !readonly}
                <button
                    class="hover:cursor-pointer text-red-500"
                    onclick={onDelete}
                >
                    <X class="h-4" />
                </button>
            {/if}

            <a href={`/pdf/${doc.pdfPath}`} target="_blank">
                <Button variant="link">
                    <FileText />
                    {label}
                </Button>
            </a>
            <span class="text-xs opacity-50">
                {formatDateToISO(doc.createdAt)}
            </span>
        </div>
    {:else if readonly}
        <p class="text-sm opacity-50 my-2">
            - Esperando {label}...
        </p>
    {:else}
        <Label
            for="file-input"
            class={buttonVariants({
                variant: "outline",
            })}
        >
            <FileUp />
            Subir {label}
        </Label>
        <Input
            id="file-input"
            type="file"
            class="hidden"
            accept="application/pdf"
            onchange={handleChange}
        />
    {/if}
</div>
