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
    import { getRevisionEmpty } from "../../../features/planTesis/revision/model";

    const proyectoId = page.params.id;
    let planes = $state<Documento[]>([]);

    function getPlanesDeTesis() {
        DocumentoStore.getDocumentosWithRevision(
            proyectoId,
            "PLAN DE TESIS",
        ).then((data) => {
            planes = data;
            console.log(data);
        });
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
    <div class="flex flex-col-reverse gap-8">
        {#each planes as plan, index}
            <RevisionPlan
                {plan}
                able={index + 1 === planes.length ? true : false}
            />
        {/each}
    </div>
</div>
