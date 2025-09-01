<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import FilePlus_2 from "@lucide/svelte/icons/file-plus-2";
    import MailX from "@lucide/svelte/icons/mail-x";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
    import FileText from "@lucide/svelte/icons/file-text";

    const coment =
        "En la Universidad Nacional de San Antonio Abad del Cusco, la gestión de tesis en la Facultad de Ingeniería Eléctrica, Electrónica, Informática y Mecánica (FIEEIM) se desarrolla de manera manual, lo que ocasiona ineficiencias, errores y falta de claridad en los lineamientos respecto a la normativa universitaria. Para dar solución a esta problemática, se plantea el desarrollo de una ontología basada en PROV-O, orientada a organizar y estructurar la información del proceso de tesis, facilitar la representación e intercambio de datos académicos y sentar las bases para la implementación de software que fortalezca la comunicación entre estudiantes, asesores y comités evaluadores. La validación mediante un Producto Mínimo Viable (MVP) en la Escuela Profesional de Ingeniería Informática y de Sistemas permitirá evidenciar su utilidad en la optimización de la gestión de tesis.";
</script>

<div class="w-full p-5 border rounded-lg shadow-sm grid gap-5">
    <div class="grid gap-4">
        <h3 class="text-lg font-semibold">Solicitud de asesoramiento</h3>

        <div class="flex items-center gap-2 border-b pb-2">
            <span class="opacity-60">De:</span>
            <UserBagde
                variant="text"
                username="Brayan Umiyauri Ilachoque"
                email="120898@unsaac.edu.pe"
            />
        </div>

        <div class="flex items-start gap-2 font-semibold">
            Desarrollo de una ontología para mejorar la gestión de tesis en la
            Facultad de Ingeniería Eléctrica, Electrónica, Informática y
            Mecánica de la UNSAAC
        </div>
        <hr />

        <textarea
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
            >{coment}
        </textarea>

        <div class="flex items-center justify-center gap-4">
            <Button class="bg-green-600">Aceptar</Button>
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
