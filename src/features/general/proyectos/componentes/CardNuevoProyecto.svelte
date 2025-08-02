<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import Plus from "@lucide/svelte/icons/plus";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { auth } from "../../../auth/store.svelte";
    import { ProyectoSt } from "../store.svelte";
    import { goto } from "$app/navigation";

    let titulo = $state("");

    async function handleSave() {
        if (!auth.user?.id) return;
        const body = { titulo: titulo, usuario_id: auth.user.id };
        console.log(body);
        ProyectoSt.create(body).then((proyecto) => {
            if (proyecto) goto(`/proyecto/${proyecto.id}`);
        });
    }
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: "default" })}>
        <Plus />
        Nuevo Proyecto
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Nuevo Proyecto</AlertDialog.Title>
            <AlertDialog.Description>
                Registro de nuevo proyecto de investigación.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <div>
            <div class="grid gap-2">
                <Label>Titulo</Label>
                <Input bind:value={titulo} />
            </div>
        </div>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onclick={handleSave}>
                Guardar
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
