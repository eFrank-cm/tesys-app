<script lang="ts">
    import { page } from "$app/state";
    import { authStore } from "$lib/auth/store.svelte";
    import {
        getEmptyProyecto,
        type Proyecto,
    } from "../../../features/general/proyecto/model";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import ActividadesAutor from "../../../workflow/autor/ActividadesAutor.svelte";
    import ActividadesAsesor from "../../../workflow/asesor/ActividadesAsesor.svelte";
    import ActividadesRevisor from "../../../workflow/revisor/ActividadesRevisor.svelte";
    import ArrowBigLeft from "@lucide/svelte/icons/arrow-big-left";
    import AlignStartVertical from "@lucide/svelte/icons/align-start-vertical";
    import Newspaper from "@lucide/svelte/icons/newspaper";
    import Paperclip from "@lucide/svelte/icons/paperclip";
    import UsersRound from "@lucide/svelte/icons/users-round";
    import CircleDot from "@lucide/svelte/icons/circle-dot";
    import Bolt from "@lucide/svelte/icons/bolt";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { ProyectoStore } from "../../../features/general/proyecto/store.svelte";
    import { ColaboracionStore } from "../../../features/general/colaboracion/store.svelte";
    import type { Colaboracion } from "../../../features/general/colaboracion/model";
    import AdminColaboradores from "../../../features/general/colaboracion/componentes/AdminColaboradores.svelte";
    import PropuestaProyecto from "../../../features/planTesis/propuesta/componentes/PropuestaProyecto.svelte";
    import {
        getEmptyPropuesta,
        type Propuesta,
    } from "../../../features/planTesis/propuesta/model";
    import { PropuestaStore } from "../../../features/planTesis/propuesta/store.svelte";

    const proyectoId = page.params.id;
    let proyecto = $state<Proyecto>(getEmptyProyecto());
    let colaboraciones = $state<Colaboracion[]>([]);
    let propuesta = $state<Propuesta>(getEmptyPropuesta());

    let rol = $derived.by(() => {
        if (!authStore.user) return "";
        return proyecto.colaboradores.find(
            (colab) => authStore.user?.id === colab.usuario?.id,
        )?.role;
    });

    onMount(() => {
        ProyectoStore.get(proyectoId).then((data) => {
            if (data) {
                console.log(data);
                proyecto = data;
            }
        });

        ColaboracionStore.getByProyectoId(proyectoId).then((data) => {
            colaboraciones = data;
        });

        PropuestaStore.getByProyecto(proyectoId).then((data) => {
            if (data) propuesta = data;
        });
    });
</script>

<div class="flex gap-2 justify-between items-center mb-2">
    <div class="flex items-center gap-4">
        <Button
            onclick={() => goto("/proyectos")}
            size="compact"
            variant="secondary"
        >
            <ArrowBigLeft />
        </Button>
        <h1 class="text-xl font-semibold">{proyecto.titulo}</h1>
    </div>
    <div>
        <Badge class="bg-[#e8a134]">{rol}</Badge>
    </div>
</div>

<div class="flex w-full">
    <Tabs.Root value="actividades" class="w-full">
        <Tabs.List class="flex gap-4">
            <Tabs.Trigger value="actividades" class="px-4">
                <AlignStartVertical />
                Actividades
            </Tabs.Trigger>
            <Tabs.Trigger value="resumen" class="px-4">
                <Newspaper />
                Resumen
            </Tabs.Trigger>
            <Tabs.Trigger value="documentos" class="px-4">
                <Paperclip />
                Archivos
            </Tabs.Trigger>
            <Tabs.Trigger value="colaboradores" class="px-4">
                <UsersRound />
                Colaboradores
            </Tabs.Trigger>
            <Tabs.Trigger value="asuntos" class="px-4">
                <CircleDot />
                Asuntos
            </Tabs.Trigger>
            <Tabs.Trigger value="ajustes" class="px-4">
                <Bolt />
                Ajustes
            </Tabs.Trigger>
        </Tabs.List>

        <hr class="mb-2" />
        <Tabs.Content value="actividades">
            <div class="">
                <h3 class="font-bold">PLAN DE TESIS</h3>
            </div>
            <div class="ml-4">
                {#if rol === "PROPIETARIO" || rol === "AUTOR"}
                    <ActividadesAutor />
                {:else if rol === "ASESOR"}
                    <ActividadesAsesor />
                {:else if rol === "REVISOR"}
                    <ActividadesRevisor />
                {/if}
            </div>
        </Tabs.Content>
        <Tabs.Content value="resumen">
            <Tabs.Root value="propuesta">
                <div class="mx-2 mb-2">
                    Registra la propuesta y el resumen para comunicar tu
                    proyecto a colaboradores y usuarios.
                </div>
                <div class="flex">
                    <Tabs.List
                        class="flex flex-col gap-4 justify-start items-start bg-transparent w-60"
                    >
                        <Tabs.Trigger
                            value="propuesta"
                            class="data-[state=active]:bg-secondary"
                            >Propuesta de Invitacion</Tabs.Trigger
                        >
                        <Tabs.Trigger
                            value="plan-tesis"
                            class="data-[state=active]:bg-secondary"
                            >Resumen de Plan de Tesis</Tabs.Trigger
                        >
                    </Tabs.List>
                    <Tabs.Content value="propuesta">
                        <PropuestaProyecto {propuesta} />
                    </Tabs.Content>
                    <Tabs.Content value="plan-tesis">
                        Explica de forma breve el propósito del proyecto a todos
                        los usuarios
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </Tabs.Content>
        <Tabs.Content value="documentos">documentos</Tabs.Content>
        <Tabs.Content value="colaboradores" class="flex justify-center">
            {#if authStore.user && rol === "PROPIETARIO"}
                <AdminColaboradores
                    {colaboraciones}
                    {proyectoId}
                    currentUserId={authStore.user.id}
                    className="w-[60rem]"
                    verAptoAsesor={true}
                    verAptoRevisor={false}
                    rolesAdmitidos={["ASESOR", "AUTOR"]}
                />
            {/if}
        </Tabs.Content>
        <Tabs.Content value="asuntos">asuntos</Tabs.Content>
        <Tabs.Content value="ajustes">
            {#if rol === "PROPIETARIO"}
                <Button
                    variant="destructive"
                    onclick={() => {
                        ProyectoStore.delete(proyecto.id);
                        goto("/proyectos");
                    }}
                >
                    Eliminar Proyecto
                </Button>
            {/if}
        </Tabs.Content>
    </Tabs.Root>
</div>
