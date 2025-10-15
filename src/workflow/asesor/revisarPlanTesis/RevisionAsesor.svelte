<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import FileUp from "@lucide/svelte/icons/file-up";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import FileChartColumn from "@lucide/svelte/icons/file-chart-column";

    import MessageSquare from "@lucide/svelte/icons/message-square";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import { page } from "$app/state";
    import type { Documento } from "../../../features/general/documento/model";
    import { onMount } from "svelte";
    import { formatDateToISO } from "$lib";
    import RevisionPlan from "./RevisionPlan.svelte";

    const proyectoId = page.params.id;
    let planes = $state<Documento[]>([]);

    function getPlanesDeTesis() {
        DocumentoStore.getDocumentosRevision(proyectoId, "PLAN DE TESIS").then(
            (data) => {
                planes = data;
                console.log(data);
            },
        );
    }

    onMount(() => getPlanesDeTesis());
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Redactar Plan de Tesis</h3>
    </div>

    <p class="text-sm">
        Espera que suban un plan de tesis para comenzar con la revisión.
    </p>

    <!-- PLANES -->
    <div class="grid gap-8">
        {#each planes as plan}
            <RevisionPlan {plan} />
        {/each}

        <!-- <div class="flex items-start gap-2">
            <UserBagde
                username="Elizon Carcausto"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 25 Jun 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2 items-center">
                    <div class="flex justify-between items-center">
                        <div>
                            <Badge>Asesor</Badge>
                            <UserBagde
                                username="Lauro Enciso Rodas"
                                email="lauro.enciso@unsaac.edu.pe"
                                variant="text"
                            />
                        </div>
                        <div class="px-10">
                            <Badge class="bg-green-600">
                                <CircleCheck />
                                Aprovado
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileCheck />
                                Plan de Tesis Firmado
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 25 Jun 2025 - 03:43 p.m.
                            </span>
                        </div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileChartColumn />
                                Informe Turniting
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 25 Jun 2025 - 03:43 p.m.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div class="flex items-start gap-2">
            <UserBagde
                username="Brayan"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 27 Ago 2025 - 03:43 p.m.
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
            </div>
        </div> -->

        <!-- <div class="flex items-start gap-2">
            <UserBagde
                username="Brayan"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 27 Ago 2025 - 03:43 p.m.
                        </span>
                    </div>
                    <div class="px-2">
                        <Button variant="link">
                            <Pencil />
                            Editar
                        </Button>
                    </div>
                </div>

                
            </div>
        </div> -->
    </div>
</div>
