<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import TablaColaboraciones from "../../features/general/colaboraciones/componentes/TablaColaboraciones.svelte";
    import CardNuevoProyecto from "../../features/general/proyectos/componentes/CardNuevoProyecto.svelte";
</script>

<div class="grid gap-4">
    <h1 class="font-bold text-2xl">PROYECTOS</h1>

    <p>Colaboraciones en proyectos de investigacion</p>

    <div class="flex justify-between">
        <div class="w-1/3">
            <Input />
        </div>

        <CardNuevoProyecto />
    </div>

    <TablaColaboraciones />
</div>
