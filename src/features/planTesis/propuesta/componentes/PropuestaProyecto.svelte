<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { getEmptyPropuesta, type Propuesta } from "../model";
    import { PropuestaStore } from "../store.svelte";
    import { toast } from "svelte-sonner";

    interface Props {
        propuesta?: Propuesta;
        onlyRead?: boolean;
    }
    let {
        propuesta = $bindable(getEmptyPropuesta()),
        onlyRead = false,
    }: Props = $props();

    function onSave() {
        PropuestaStore.edit(propuesta.id, {
            titulo: propuesta.titulo,
            resumen: propuesta.resumen,
        }).then((data) => {
            propuesta = data;
            toast.success("Cambios guardados correctamente");
        });
    }
</script>

{#if onlyRead}
    <h2 class="font-semibold">
        {propuesta.titulo}
    </h2>
    <p class="text-sm text-balance">{propuesta.resumen}</p>
{:else}
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
                    bind:value={propuesta.titulo}
                    class="text-center"
                />
            </div>
            <div class="col-span-2 grid gap-2">
                <Label>Resumen*</Label>
                <Textarea bind:value={propuesta.resumen}></Textarea>
            </div>
        </div>
    </div>
    <div class="flex gap-2 justify-end">
        <Button onclick={onSave}>Guardar</Button>
    </div>
{/if}
