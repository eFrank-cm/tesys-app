<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
</script>

<div class="w-full p-5 border rounded-lg shadow-sm grid gap-5">
    <div class="grid gap-4">
        <h3 class="text-lg font-semibold">Solicitud de asesoramiento</h3>

        <div class="flex items-center gap-2 border-b pb-2">
            <span class="opacity-60">Para</span>
            <ComboPersonas />
        </div>

        <div class="flex items-start gap-2 border-b pb-1">
            <textarea
                rows={1}
                class="outline-0 font-semibold w-full placeholder:font-normal"
                placeholder="Titulo"
            ></textarea>
        </div>

        <textarea
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
        ></textarea>

        <div class="flex items-center justify-center">
            <Button>Enviar</Button>
        </div>
    </div>
</div>
