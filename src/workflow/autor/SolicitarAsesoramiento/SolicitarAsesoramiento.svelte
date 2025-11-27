<script lang="ts">
    import { page } from "$app/state";
    import { authStore } from "$lib/auth/store.svelte";
    import { onMount } from "svelte";
    import AdminColaboradores from "../../../features/general/colaboracion/componentes/AdminColaboradores.svelte";
    import type { Colaboracion } from "../../../features/general/colaboracion/model";
    import { ColaboracionStore } from "../../../features/general/colaboracion/store.svelte";
    import type { Documento } from "../../../features/general/documento/model";
    import { DocumentoStore } from "../../../features/general/documento/store.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { formatDateToISO } from "$lib";
    import FileText from "@lucide/svelte/icons/file-text";

    const proyectoId = page.params.id;
    let colaboraciones = $state<Colaboracion[]>([]);
    let carta = $state<Documento | null>(null);

    onMount(() => {
        ColaboracionStore.getByProyectoId(proyectoId).then((data) => {
            colaboraciones = data;
        });

        DocumentoStore.getCarta(proyectoId).then((data) => {
            if (data) carta = data;
        });
    });
</script>

{#if authStore.user}
    <AdminColaboradores
        {colaboraciones}
        {proyectoId}
        currentUserId={authStore.user.id}
        className="w-[45rem]"
        verAptoAsesor={true}
        verAptoRevisor={false}
        rolesAdmitidos={["ASESOR", "AUTOR"]}
    />
{/if}

<br />
{#if carta?.pdfPath}
    <div
        class="p-2 border shadow-sm rounded-lg flex justify-between items-center"
    >
        <a href={`/pdf/${carta.pdfPath}`} target="_blank">
            <Button variant="link">
                <FileText />
                Carta de Aceptacion
            </Button>
        </a>
        <span class="italic px-4 opacity-50 text-sm">
            Subido el {formatDateToISO(carta.updatedAt)}
        </span>
    </div>
{:else}
    <p class="italic px-4 opacity-50 text-sm">
        El asesor aun no subio la Carta de Aceptacion
    </p>
{/if}
