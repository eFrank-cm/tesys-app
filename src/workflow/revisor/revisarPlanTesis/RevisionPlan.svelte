<script lang="ts">
    import { formatDateToISO } from "$lib";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import FileText from "@lucide/svelte/icons/file-text";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import Save from "@lucide/svelte/icons/save";
    import { getRevisionEmpty } from "../../../features/planTesis/revision/model";
    import { toast } from "svelte-sonner";
    import { RevisionStore } from "../../../features/planTesis/revision/store.svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import X from "@lucide/svelte/icons/x";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import DocumentoInput from "../../../features/general/documento/components/DocumentoInput.svelte";

    interface Props {
        plan: Documento;
        able: boolean;
    }

    let { plan, able }: Props = $props();

    let revisionesReadonly = $derived(
        plan.revisiones.filter((r) => r.createdById !== authStore.user?.id),
    );

    let revision = $derived.by(() => {
        const r = plan.revisiones.find(
            (r) => r.createdById === authStore.user?.id,
        );
        if (r) return r;
        else return getRevisionEmpty();
    });

    function refresh() {
        DocumentoStore.get(plan.id).then((data) => {
            if (data) plan = data;
        });
    }

    function onSave(estado: "APROBADO" | "REVISION") {
        if (!authStore.user || !able) {
            toast.error("No logeado");
            return;
        }

        if (revision.id === "") {
            console.log("crear");
            RevisionStore.create({
                comentario: revision.comentario,
                estado: estado,
                createdById: authStore.user.id,
                documentoId: plan.id,
            }).then(() => {
                if (estado === "APROBADO") {
                    toast.success("Plan de tesis aprobado.");
                } else {
                    toast.success("Guardado correctamente.");
                }
                refresh();
            });
        } else {
            console.log("editar");
            RevisionStore.edit(revision.id, {
                comentario: revision.comentario,
                estado: estado,
            }).then(() => {
                if (estado === "APROBADO") {
                    toast.success("Plan de tesis aprobado.");
                } else {
                    toast.success("Guardado correctamente.");
                }
                refresh();
            });
        }
    }

    function deleteRevision() {
        RevisionStore.delete(revision.id).then(() => {
            toast.success("Aprobación cancelada.");
            refresh();
        });
    }
</script>

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
            <div class="flex items-center">
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
        </div>

        {#each revisionesReadonly as revision (revision.id)}
            <div class="border-t px-4 py-2">
                <div>
                    <Badge>Revisor</Badge>
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
        <div class="border-t px-4 py-2">
            <div>
                {#if revision.estado === "APROBADO"}
                    <div class="grid gap-2">
                        <DocumentoInput
                            label="Formato de Evaluacion"
                            tipo="FORMATO DE EVALUACION"
                            proyectoId={plan.proyectoId}
                        />
                        <DocumentoInput
                            label="Informe"
                            tipo="INFORME"
                            proyectoId={plan.proyectoId}
                        />
                    </div>
                    <div class="flex items-center mt-2">
                        <div class="w-full">
                            <Badge class="bg-green-600 text-secondary">
                                APROBADO
                            </Badge>
                            <span class="text-xs font-semibold">
                                {formatDateToISO(revision.updatedAt)}
                            </span>
                        </div>
                        <div class="w-full flex justify-end items-center">
                            <Button
                                variant="link"
                                class="text-red-500"
                                size="compact"
                                onclick={deleteRevision}
                            >
                                <X /> Cancelar aprobacion
                            </Button>
                        </div>
                    </div>
                {:else if able}
                    <div>
                        <textarea
                            class="w-full text-sm text-balance border py-1 px-2 rounded-lg"
                            placeholder="Digite las observaciones que posee el documento..."
                            bind:value={revision.comentario}
                        ></textarea>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs opacity-50">
                            {formatDateToISO(revision.updatedAt)}
                        </span>
                        <div>
                            <Button
                                variant="link"
                                onclick={() => onSave("APROBADO")}
                            >
                                <CircleCheck />
                                Aprobar
                            </Button>
                            <Button
                                variant="link"
                                onclick={() => onSave("REVISION")}
                            >
                                <Save />
                                Guardar
                            </Button>
                        </div>
                    </div>
                {:else}
                    <Badge>Yo</Badge>
                    <p>{revision.comentario}</p>
                    <span class="text-xs opacity-50">
                        {formatDateToISO(revision.updatedAt)}
                    </span>
                {/if}
            </div>
        </div>
    </div>
</div>
