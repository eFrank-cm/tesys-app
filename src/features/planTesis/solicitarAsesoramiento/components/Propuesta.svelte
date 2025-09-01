<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
    import MailX from "@lucide/svelte/icons/mail-x";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import CircleX from "@lucide/svelte/icons/circle-x";
    import FileText from "@lucide/svelte/icons/file-text";

    const titulo = `Desarrollo de una ontología para mejorar la gestión de tesis en la Facultad de Ingeniería Eléctrica, Electrónica, Informática y Mecánica de la UNSAAC`;
    const resumen = `En la Universidad Nacional de San Antonio Abad del Cusco, la gestión de tesis en la Facultad de Ingeniería Eléctrica, Electrónica, Informática y Mecánica (FIEEIM) se realiza de forma manual, lo que genera ineficiencias, errores y falta de claridad en los lineamientos frente a la normativa universitaria. Para abordar esta problemática, se propone el desarrollo de una ontología basada en PROV-O, que organice y estructure la información del proceso de tesis, facilite la representación y el intercambio de datos académicos y siente las bases para la implementación de software que mejore la comunicación entre estudiantes, asesores y comités evaluadores. La validación mediante un Producto Mínimo Viable (MVP) en la Escuela Profesional de Ingeniería Informática y de Sistemas permitirá demostrar su utilidad en la optimización de la gestión de tesis.`;
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
                >{titulo}
            </textarea>
        </div>

        <textarea
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
            >{resumen}
        </textarea>

        <div class="flex items-center justify-center">
            <Button>Enviar</Button>
        </div>

        <!-- 

        <div class="flex items-center justify-center gap-4">
            <Badge>Enviado el 24 Ago 2025, 12:19 pm</Badge>
            <Button variant="destructive" size="compact">
                <MailX />
            </Button>
        </div>


        <div
            class="flex items-center justify-center text-sm text-green-600 gap-1"
        >
            <CircleCheck /> Aceptado el 26 Ago 2025, 09:36 am
        </div>

        <div
            class="flex items-center justify-center text-sm text-red-600 gap-1"
        >
            <CircleX /> Rechazado el 26 Ago 2025, 09:36 am
        </div> 
        -->
    </div>
</div>

<div class="w-full my-4 p-4 border rounded-lg shadow-sm">
    <div class="flex gap-8 items-center">
        <span class="font-semibold">Carta de aceptacion:</span>
        <div>
            <p class="text-sm opacity-50">
                A la espera de la <span class="font-semibold"
                    >Carta de Aceptacion</span
                >.
            </p>
        </div>
    </div>
</div>
<div class="w-full my-4 p-4 border rounded-lg shadow-sm">
    <div class="flex gap-8 items-center">
        <span class="font-semibold">Carta de aceptacion:</span>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <Button variant="link">
                        <FileText />
                        Carta de Aceptacion
                    </Button>
                    <span class="text-xs opacity-50">
                        Creado 25 Jun 2025 - 03:43 p.m.
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
