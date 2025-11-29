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

<div class="text-xs">
    {#if authStore.user}
        <AdminColaboradores
            {colaboraciones}
            {proyectoId}
            currentUserId={authStore.user.id}
            className="w-[45rem]"
            verAptoAsesor={false}
            verAptoRevisor={true}
            rolesAdmitidos={["REVISOR"]}
            titulo={"Nombrar Revisores de Plan de Tesis"}
            descripcion={"Gestiona los colaboradores del proyecto: invita, administra roles y mantén el control del equipo."}
        />
    {/if}
</div>
