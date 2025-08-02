<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import Trash2 from "@lucide/svelte/icons/trash-2";
    import { buttonVariants } from "$lib/components/ui/button";

    let { action } = $props();
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger
        class="w-full hover:bg-accent flex gap-2 p-1 items-center text-sm rounded-sm text-red-500"
    >
        <Trash2 class="w-4 h-4 ml-1 " />
        Eliminar
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>¿Eliminar proyecto?</AlertDialog.Title>
            <AlertDialog.Description>
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas
                eliminar este proyecto?
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
                onclick={action}
                class={buttonVariants({
                    variant: "destructive",
                })}
            >
                Eliminar
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
