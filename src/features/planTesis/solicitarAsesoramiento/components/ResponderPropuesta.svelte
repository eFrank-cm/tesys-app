<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import FilePlus_2 from "@lucide/svelte/icons/file-plus-2";
    import MailX from "@lucide/svelte/icons/mail-x";
    import ComboPersonas from "../../../../lib/components/comboPersonas.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import { onMount } from "svelte";
    import { ColaboracionSt } from "../../../general/colaboraciones/store.svelte";
    import type { Colaboracion } from "../../../general/colaboraciones/model";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import CircleX from "@lucide/svelte/icons/circle-x";
    import { formatDateToISO } from "$lib";

    const coment =
        "En la Universidad Nacional de San Antonio Abad del Cusco, la gestión de tesis en la Facultad de Ingeniería Eléctrica, Electrónica, Informática y Mecánica (FIEEIM) se desarrolla de manera manual, lo que ocasiona ineficiencias, errores y falta de claridad en los lineamientos respecto a la normativa universitaria. Para dar solución a esta problemática, se plantea el desarrollo de una ontología basada en PROV-O, orientada a organizar y estructurar la información del proceso de tesis, facilitar la representación e intercambio de datos académicos y sentar las bases para la implementación de software que fortalezca la comunicación entre estudiantes, asesores y comités evaluadores. La validación mediante un Producto Mínimo Viable (MVP) en la Escuela Profesional de Ingeniería Informática y de Sistemas permitirá evidenciar su utilidad en la optimización de la gestión de tesis.";

    let colaboracion = $state<Colaboracion | null>(null);

    onMount(async () => {
        const data = await ColaboracionSt.getSolicitudProyectoActual();
        console.log(`solicitud`, data);
        if (data) colaboracion = data;
    });

    async function responder(respuesta: "ACEPTADO" | "RECHAZADO") {
        if (!colaboracion) return;
        const data = await ColaboracionSt.responderSolicitudAsesor(
            colaboracion.id,
            respuesta,
        );
        console.log(data, "respuesta colaboracion");
        colaboracion = data;
    }
</script>

<div class="w-full p-5 border rounded-lg shadow-sm grid gap-5">
    <div class="grid gap-4">
        <h3 class="text-lg font-semibold">Solicitud de asesoramiento</h3>

        <div class="flex items-center gap-2 border-b pb-2">
            <span class="opacity-60">De:</span>
            {#if colaboracion?.creator}
                <UserBagde
                    variant="text"
                    username={colaboracion.creator.username}
                    email={colaboracion.creator.email}
                />
            {/if}
        </div>

        <div class="flex items-start gap-2 font-semibold">
            {colaboracion?.propuesta?.titulo}
        </div>
        <hr />

        <div
            class="w-full h-60 outline-0"
            placeholder="Realice una breve descripcion del proyecto que se desea realizar..."
        >
            {colaboracion?.propuesta?.resumen}
        </div>

        {#if colaboracion?.estado === "PENDIENTE"}
            <div class="flex items-center justify-center gap-4">
                <Button
                    class="bg-green-600"
                    onclick={() => responder("ACEPTADO")}>Aceptar</Button
                >
                <Button
                    variant="destructive"
                    onclick={() => responder("RECHAZADO")}>Denegar</Button
                >
            </div>
        {/if}

        {#if colaboracion?.estado === "ACEPTADO"}
            <div
                class="flex items-center justify-center text-sm text-green-600 gap-1"
            >
                <CircleCheck /> Aceptado el {formatDateToISO(
                    colaboracion.updatedAtISO,
                )}
            </div>
        {/if}
        {#if colaboracion?.estado === "RECHAZADO"}
            <div
                class="flex items-center justify-center text-sm text-red-600 gap-1"
            >
                <CircleX /> Rechazado el {formatDateToISO(
                    colaboracion.updatedAtISO,
                )}
            </div>
        {/if}
    </div>
</div>

{#if colaboracion?.estado === "ACEPTADO"}
    <div class="w-full my-4 p-4 border rounded-lg shadow-sm">
        <span class="font-semibold">Carta de aceptacion</span>
        <div class="grid grid-cols-2">
            <div class="flex justify-between items-center">
                <div>
                    <a
                        href="https://docs.google.com/document/d/1mMBG0RYV9KwLgBgWDSkUuE_RlHc-F95NhDAz6tYrNGA/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="link" class="text-blue-700">
                            <FileText />
                            Documento editable
                        </Button>
                    </a>
                </div>
            </div>
        </div>

        <!-- 
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
        -->
        <div>
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <Button variant="link">
                        <FileText />
                        PDF
                    </Button>
                    <span class="text-xs opacity-50">
                        Creado 25 Jun 2025 - 03:43 p.m.
                    </span>
                </div>
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
{/if}
