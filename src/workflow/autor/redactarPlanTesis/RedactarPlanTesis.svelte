<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import FilePlus2 from "@lucide/svelte/icons/file-plus-2";
    import UserCheck from "@lucide/svelte/icons/user-check";
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
    import DocumentoInput from "../../../features/general/documento/components/DocumentoInput.svelte";
    import { toast } from "svelte-sonner";
    import { ColaboracionStore } from "../../../features/general/colaboracion/store.svelte";
    import type { UsuarioMinimal } from "../../../features/general/usuario/model";

    const proyectoId = page.params.id;
    let planes = $state<Documento[]>([]);
    let fileLoad = $state<File | null>(null);
    let asesor = $state<UsuarioMinimal | null>(null);
    let carta = $state<Documento | null>(null);

    function getPlanesDeTesis() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "PLAN DE TESIS",
        ).then((data) => {
            planes = data;
        });
    }

    onMount(() => {
        getPlanesDeTesis();
        ColaboracionStore.getByProyectoId(proyectoId).then((data) => {
            const asesores = data.filter(
                (col) => col.role === "ASESOR" && col.estado === "ACEPTADO",
            );
            if (asesores.length > 1) toast.error("Mas de 1 asesor asingado");
            if (asesores[0] && asesores[0].usuario)
                asesor = asesores[0].usuario;
        });

        DocumentoStore.getCarta(proyectoId).then((data) => {
            if (data) carta = data;
        });
    });

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
            )
                .then(() => {
                    toast.success("Plan de tesis subido con éxito");
                    getPlanesDeTesis();
                    fileLoad = null;
                })
                .catch((error) => {
                    toast.error(
                        `Error al subir el plan de tesis: ${error.message}`,
                    );
                    fileLoad = null;
                });
        }
    }

    function onDelete(documentoId: string) {
        DocumentoStore.delete(documentoId).then(() => getPlanesDeTesis());
    }
</script>

<div class="grid gap-4">
    <div>
        <h3 class="text-lg font-semibold">Revision del ASESOR</h3>
        <p class="text-sm">
            Sube tu plan de tesis y espera la revisión del asesor para enviar
            una nueva versión si es necesario.
        </p>
    </div>

    {#if asesor}
        <div
            class="bg-green-200 rounded-lg border border-green-600 px-4 py-2 flex items-center gap-2"
        >
            <div>
                <UserCheck class="text-green-600" />
            </div>
            <div class="text-md flex justify-between w-full">
                <p>
                    Asesor: <span class="font-semibold">
                        <UserBagde
                            variant="text"
                            email={asesor.email}
                            username={asesor.username}
                        />
                    </span>
                </p>
                <div>
                    {#if carta?.pdfPath}
                        <a href={`/pdf/${carta.pdfPath}`} target="_blank">
                            <Button variant="link">
                                <FileText />
                                Carta de Aceptacion
                            </Button>
                        </a>
                    {:else}
                        <p class="italic px-4 opacity-50 text-sm">
                            El asesor aun no subio la Carta de Aceptacion
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    {/if}

    <div class="flex items-center gap-4">
        <Label for="file-input" class={buttonVariants({ variant: "outline" })}>
            <FilePlus2 />
            Subir Plan de Tesis
        </Label>
        <Input
            id="file-input"
            type="file"
            class="hidden"
            accept="application/pdf"
            onchange={handleChange}
        />
    </div>

    <!-- PLANES -->
    <div class="flex flex-col-reverse gap-8">
        {#each planes as plan, index}
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
                        {#if index + 1 === planes.length && plan.revisiones.length === 0}
                            <div class="px-2">
                                <Button
                                    variant="link"
                                    onclick={() => onDelete(plan.id)}
                                >
                                    <Trash />
                                    Eliminar
                                </Button>
                            </div>
                        {/if}
                    </div>

                    <!-- REVISION -->
                    {#each plan.revisiones as revision}
                        <div class="border-t px-4 py-2">
                            <div>
                                <Badge>Asesor</Badge>
                                {#if revision.createdBy}
                                    <UserBagde
                                        username={revision.createdBy.username}
                                        email={revision.createdBy.email}
                                        variant="text"
                                    />
                                {/if}
                            </div>
                            {#if revision.estado === "APROBADO"}
                                <div class="text-sm my-2">
                                    <DocumentoInput
                                        label="Plan de Tesis Firmado"
                                        tipo="PLAN DE TESIS FIRMADO"
                                        proyectoId={plan.proyectoId}
                                        readonly={true}
                                    />
                                    <DocumentoInput
                                        label="Informe Turniting"
                                        tipo="INFORME TURNITING"
                                        proyectoId={plan.proyectoId}
                                        readonly={true}
                                    />
                                </div>
                                <div>
                                    <Badge class="bg-green-600 text-secondary">
                                        APROBADO
                                    </Badge>
                                    <span class="text-xs font-semibold">
                                        {formatDateToISO(revision.updatedAt)}
                                    </span>
                                </div>
                            {:else}
                                <p class="text-sm my-2">
                                    {revision.comentario}
                                </p>
                                <span class="text-xs opacity-50">
                                    {formatDateToISO(revision.updatedAt)}
                                </span>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
