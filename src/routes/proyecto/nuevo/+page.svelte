<script lang="ts">
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/auth/store.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { ProyectoStore } from "../../../features/general/proyecto/store.svelte";
    import { PropuestaStore } from "../../../features/planTesis/propuesta/store.svelte";

    let tipo = $state("TESIS DE PREGRADO");
    let nombreProyecto = $state("");
    let titulo = $state("");
    let resumen = $state("");

    async function onSave() {
        if (!authStore.user) return;
        try {
            const nuevoProyecto = await ProyectoStore.create({
                titulo: nombreProyecto,
                tipo,
                usuarioId: authStore.user.id,
            });
            const nuevaPropuesta = await PropuestaStore.create({
                titulo,
                resumen,
                proyectoId: nuevoProyecto.id,
            });
            console.log(nuevaPropuesta);
            goto(`/proyecto/${nuevoProyecto.id}`);
        } catch (e) {
            console.log(e);
        }
    }
</script>

<div class="mx-32">
    <div>
        <h1 class="font-bold text-xl">Crear nuevo proyecto</h1>
        <p class="text-sm my-0.5">
            Un proyecto te guía en las actividades y su secuencia, genera los
            documentos correspondientes y registra el historial de todo el
            proceso.
        </p>
        <p class="text-sm italic">
            Los campos obligatorios están marcados con un asterisco (*).
        </p>
    </div>
    <br />
    <div>
        <h1 class="font-semibold text-lg">General</h1>
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="col-span-1 grid gap-2">
                <Label>Tipo*</Label>
                <Input
                    placeholder="Nombre del proyecto"
                    value={tipo}
                    disabled
                />
            </div>
            <div class="col-span-2 grid gap-2">
                <Label>Nombre del Proyecto*</Label>
                <Input bind:value={nombreProyecto} />
            </div>
        </div>
    </div>
    <hr class="my-8" />
    <div>
        <div>
            <h1 class="font-semibold text-lg">Propuesta de Invitacion</h1>
            <p class="text-sm my-0.5">
                Presenta la idea del proyecto a posibles colaboradores,
                destacando sus objetivos y alcance
            </p>
        </div>

        <div class="grid grid-cols-1 gap-4 my-4">
            <div class="col-span-2 grid gap-2">
                <Input
                    placeholder="Titulo*"
                    bind:value={titulo}
                    class="text-center"
                />
            </div>
            <div class="col-span-2 grid gap-2">
                <Label>Resumen*</Label>
                <Textarea bind:value={resumen}></Textarea>
            </div>
        </div>
    </div>
    <div class="flex gap-2 justify-end">
        <Button variant="secondary" onclick={() => goto("/proyectos")}>
            Cancelar
        </Button>
        <Button onclick={onSave}>Crear Proyecto</Button>
    </div>
</div>
