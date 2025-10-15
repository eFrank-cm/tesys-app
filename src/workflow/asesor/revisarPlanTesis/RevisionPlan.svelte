<script lang="ts">
    import { formatDateToISO } from "$lib";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import FileText from "@lucide/svelte/icons/file-text";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import Save from "@lucide/svelte/icons/save";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import Label from "$lib/components/ui/label/label.svelte";
    import FileUp from "@lucide/svelte/icons/file-up";
    import Input from "$lib/components/ui/input/input.svelte";
    import MessageSquare from "@lucide/svelte/icons/message-square";
    import Plus from "@lucide/svelte/icons/plus";
    import {
        getRevisionEmpty,
        type Revision,
    } from "../../../features/planTesis/revision/model";
    import { onMount } from "svelte";

    interface Props {
        plan: Documento;
    }

    let { plan }: Props = $props();
    let revision = $state(getRevisionEmpty());

    onMount(() => {
        if (plan.revision) revision = plan.revision;
    });

    function onSave() {
        console.log(plan.revision);
    }

    function onDelete() {
        console.log(plan.revision?.id);
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
            <div class="px-2">
                <Button variant="link">
                    <MessageSquare />
                    Comentar
                </Button>
                <Button variant="link">
                    <CircleCheck />
                    Aprobar
                </Button>
            </div>
        </div>

        {#if plan.revision}
            <div class="border-t px-4 py-2">
                <div class="flex justify-between items-center">
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
                </div>
                <div>
                    {#if plan.revision.estado === "APROBADO"}
                        <div class="flex items-center gap-4 p-2">
                            <Label
                                for="file-input"
                                class={buttonVariants({
                                    variant: "outline",
                                })}
                            >
                                <FileUp />
                                Subir Plan de Tesis Firmado
                            </Label>
                            <Input
                                id="file-input"
                                type="file"
                                class="hidden"
                                accept="application/pdf"
                            />
                        </div>
                        <div class="flex items-center gap-4 p-2">
                            <Label
                                for="file-input"
                                class={buttonVariants({
                                    variant: "outline",
                                })}
                            >
                                <FileUp />
                                Subir Informe Turniting
                            </Label>
                            <Input
                                id="file-input"
                                type="file"
                                class="hidden"
                                accept="application/pdf"
                            />
                        </div>
                    {:else}
                        <div>
                            <textarea
                                class="w-full text-sm text-balance border py-1 px-2 rounded-lg"
                                bind:value={revision.comentario}
                            ></textarea>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs opacity-50">
                                {formatDateToISO(plan.revision.updatedAt)}
                            </span>
                            <div>
                                <Button variant="link" onclick={onSave}>
                                    <Save />
                                    Guardar
                                </Button>
                                <Button variant="link" onclick={onDelete}>
                                    <Trash2 />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}{/if}
    </div>
</div>

<!-- 
<div class="border-t px-4 py-2">
    <div class="flex justify-between items-center">
        <div>
            <Badge>Asesor</Badge>
            {#if plan.revision.createdBy}
                <UserBagde
                    username={plan.revision.createdBy.username}
                    email={plan.revision.createdBy.email}
                    variant="text"
                />
            {/if}
        </div>
    </div>
    <div>
        {#if plan.revision.estado === "APROBADO"}
            <div class="flex items-center gap-4 p-2">
                <Label
                    for="file-input"
                    class={buttonVariants({
                        variant: "outline",
                    })}
                >
                    <FileUp />
                    Subir Plan de Tesis Firmado
                </Label>
                <Input
                    id="file-input"
                    type="file"
                    class="hidden"
                    accept="application/pdf"
                />
            </div>
            <div class="flex items-center gap-4 p-2">
                <Label
                    for="file-input"
                    class={buttonVariants({
                        variant: "outline",
                    })}
                >
                    <FileUp />
                    Subir Informe Turniting
                </Label>
                <Input
                    id="file-input"
                    type="file"
                    class="hidden"
                    accept="application/pdf"
                />
            </div>
        {:else}
            <div>
                <textarea
                    class="w-full text-sm text-balance border py-1 px-2 rounded-lg"
                    bind:value={plan.revision.comentario}
                ></textarea>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-xs opacity-50">
                    {formatDateToISO(plan.revision.updatedAt)}
                </span>
                <div>
                    <Button variant="link" onclick={onSave}>
                        <Save />
                        Guardar
                    </Button>
                    <Button variant="link" onclick={onDelete}>
                        <Trash2 />
                        Eliminar
                    </Button>
                </div>
            </div>
        {/if}
    </div>
</div>
 -->
<!-- 
<div class="px-2">
    <Button variant="link">
        <MessageSquare />
        Comentar
    </Button>
    <Button variant="link">
        <CircleCheck />
        Aprobar
    </Button>
</div> 
-->
