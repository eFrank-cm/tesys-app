<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import FilePlus_2 from "@lucide/svelte/icons/file-plus-2";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
</script>

<div class="w-full p-5 border rounded-lg shadow-sm grid gap-5">
    <div class="grid gap-4">
        <h3 class="text-lg font-semibold">Solicitud de asesoramiento</h3>

        <div class="flex items-center gap-2 border-b pb-2">
            <span class="opacity-60">De:</span>
            <UserBagde
                variant="text"
                username="Elizon Frank Carcausto Mamani"
                email="elizon.carcausto@unsaac.edu.pe"
            />
        </div>

        <div class="flex items-start gap-2 pb-1 font-semibold">
            Implementación de un sistema web para la gestión y control de
            inventarios en una farmacia comunitaria
        </div>

        <textarea
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
            >Este proyecto propone el desarrollo e implementación de un sistema
            web que permita optimizar la gestión y control de inventarios en una
            farmacia comunitaria, facilitando el registro, seguimiento y
            actualización de productos en tiempo real. El sistema busca reducir
            errores en el manejo de stock, mejorar la toma de decisiones y
            garantizar la disponibilidad oportuna de medicamentos para los
            clientes.
        </textarea>

        <div class="flex items-center justify-center gap-4">
            <Button>Aceptar</Button>
            <Button variant="destructive">Denegar</Button>
        </div>
    </div>
</div>

<div
    class="w-full my-4 p-4 border rounded-lg shadow-sm grid grid-cols-2 gap-5 items-center"
>
    <div class="flex justify-between items-center">
        <span class="font-semibold">Carta de aceptacion:</span>
        <div>
            <Button variant="link" class="text-blue-700">
                <FileText />
                Carta editable
            </Button>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="flex items-center gap-4">
            <Label
                for="file-input"
                class={buttonVariants({ variant: "outline" })}
            >
                <FilePlus_2 />
                Subir carta firmada
            </Label>
            <Input
                id="file-input"
                type="file"
                class="hidden"
                accept="application/pdf"
            />
        </div>
    </div>
</div>
