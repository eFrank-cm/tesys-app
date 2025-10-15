<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import FileChartColumn from "@lucide/svelte/icons/file-chart-column";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import FilePlus2 from "@lucide/svelte/icons/file-plus-2";
    import Trash from "@lucide/svelte/icons/trash";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import { authStore } from "$lib/auth/store.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { formatDateToISO } from "$lib";
    import { goto } from "$app/navigation";

    const proyectoId = page.params.id;
    let planes = $state<Documento[]>([]);
    let fileLoad = $state<File | null>(null);

    function getPlanesDeTesis() {
        DocumentoStore.getDocumentosRevision(proyectoId, "PLAN DE TESIS").then(
            (data) => {
                planes = data;
                console.log(data);
            },
        );
    }

    onMount(() => getPlanesDeTesis());

    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0] && authStore.user) {
            fileLoad = input.files[0];
            DocumentoStore.create(
                {
                    tipo: "PLAN DE TESIS",
                    docUrl: "",
                    usuarioId: authStore.user.id,
                    proyectoId: proyectoId,
                },
                fileLoad,
            ).then(() => getPlanesDeTesis());
        }
    }
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Redactar Plan de Tesis</h3>
        <div class="flex items-center gap-4">
            <Label
                for="file-input"
                class={buttonVariants({ variant: "outline" })}
            >
                <FilePlus2 />
                Subir archivo
            </Label>
            <Input
                id="file-input"
                type="file"
                class="hidden"
                accept="application/pdf"
                onchange={handleChange}
            />
        </div>
    </div>

    <p class="text-sm">
        Sube tu plan de tesis y espera la revisión del asesor para enviar una
        nueva versión si es necesario.
    </p>

    <!-- PLANES -->
    <div class="grid gap-8">
        {#each planes as plan}
            <div class="flex items-start gap-2">
                {#if plan.createdBy}
                    <UserBagde
                        username={plan.createdBy.username}
                        email={plan.createdBy.email}
                        variant="icon"
                    />
                {/if}

                <div class="border rounded-lg w-full">
                    <div class="flex justify-between items-center bg-accent">
                        <div class="flex items-center justify-between">
                            <a href={`/pdf/${plan.pdfPath}`} target="_blank">
                                <Button variant="link">
                                    <FileText />
                                    Plan de Tesis
                                </Button>
                            </a>

                            <span class="text-xs opacity-50">
                                Creado {formatDateToISO(plan.createdAt)}
                            </span>
                        </div>
                        <div class="px-2">
                            {#if !plan.revision}
                                <Button variant="link">
                                    <Trash />
                                    Eliminar
                                </Button>
                            {/if}
                        </div>
                    </div>

                    {#if plan.revision}
                        <div class="border-t px-4 py-2">
                            <div>
                                <Badge>Asesor</Badge>
                                {#if plan.revision.createdBy}
                                    <UserBagde
                                        username={plan.revision.createdBy
                                            .username}
                                        email={plan.revision.createdBy.email}
                                        variant="text"
                                    />
                                {/if}
                            </div>
                            <p class="text-sm my-2">
                                {plan.revision.comentario}
                            </p>
                            <span class="text-xs opacity-50">
                                {formatDateToISO(plan.revision.updatedAt)}
                            </span>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
