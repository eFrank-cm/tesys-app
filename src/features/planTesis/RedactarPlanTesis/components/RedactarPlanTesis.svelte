<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import FileChartColumn from "@lucide/svelte/icons/file-chart-column";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import FilePlus2 from "@lucide/svelte/icons/file-plus-2";
    import Trash from "@lucide/svelte/icons/trash";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    const coment = `Es importante precisar con mayor detalle los límites y alcances de la ontología propuesta: ¿qué conceptos del proceso de gestión de tesis serán modelados y cuáles quedarán fuera? Esto permitirá evitar que el trabajo sea demasiado amplio o difuso, y garantizará que la implementación sea viable dentro del tiempo y recursos disponibles`;
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Redactar Plan de Tesis</h3>
        <div class="flex items-center gap-4">
            <Label
                for="file-input"
                class={buttonVariants({ variant: "outline" })}
            >
                <FilePlus2 />
                Subir archivo
            </Label>
            <Input
                id="file-input"
                type="file"
                class="hidden"
                accept="application/pdf"
            />
        </div>
    </div>

    <p class="text-sm">
        Sube tu plan de tesis y espera la revisión del asesor para enviar una
        nueva versión si es necesario.
    </p>

    <!-- PLANES -->
    <div class="grid gap-8">
        <div class="flex items-start gap-2">
            <UserBagde
                username="Elizon Carcausto"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 29 Ago 2025 - 04:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2 items-center">
                    <div class="flex justify-between items-center">
                        <div>
                            <Badge>Asesor</Badge>
                            <UserBagde
                                username="Lauro Enciso Rodas"
                                email="lauro.enciso@unsaac.edu.pe"
                                variant="text"
                            />
                        </div>
                        <div>
                            <Badge class="bg-green-600">
                                <CircleCheck />
                                APROBADO, 30 Ago 2025 - 10:14 a.m.
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileCheck />
                                Plan de Tesis Firmado
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 31 Ago 2025 - 05:43 p.m.
                            </span>
                        </div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileChartColumn />
                                Informe Turniting
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 31 Ago 2025 - 08:14 p.m.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="flex items-start gap-2">
            <UserBagde
                username="Elizon Carcausto"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 25 Jun 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2 items-center">
                    <div class="flex justify-between items-center">
                        <div>
                            <Badge>Asesor</Badge>
                            <UserBagde
                                username="Lauro Enciso Rodas"
                                email="lauro.enciso@unsaac.edu.pe"
                                variant="text"
                            />
                        </div>
                        <div class="px-10">
                            <Badge class="bg-green-600">
                                <CircleCheck />
                                Aprovado
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs opacity-50 p-2">
                            A la espera del <span class="font-bold"
                                >Plan de Tesis Firmado</span
                            >
                            y del
                            <span class="font-bold">Informe Turniting</span>
                        </p>
                        <p class="text-xs opacity-50 p-2">
                            A la espera del
                            <span class="font-bold">Informe Turniting</span>
                        </p>
                        <p class="text-xs opacity-50 p-2">
                            A la espera del <span class="font-bold"
                                >Plan de Tesis Firmado</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="flex items-start gap-2">
            <UserBagde
                username="Brayan"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 27 Ago 2025 - 03:43 p.m.
                        </span>
                    </div>
                    <div class="px-2">
                        <Button variant="link">
                            <Trash />
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="flex items-start gap-2">
            <UserBagde
                username="Elizon Carcausto"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 25 Jun 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Asesor</Badge>
                        <UserBagde
                            username="Lauro Enciso Rodas"
                            email="lauro.enciso@unsaac.edu.pe"
                            variant="text"
                        />
                    </div>
                    <div>
                        <textarea
                            class="w-full text-sm text-balance"
                            value={coment}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Editado 25 Jun 2025 - 03:43 p.m.
                    </span>
                </div>
            </div>
        </div> -->

        <div class="flex items-start gap-2">
            <UserBagde
                username="Brayan"
                email="elizon.carcausto@unsaac.edu.pe"
                variant="icon"
            />

            <div class="border rounded-lg w-full">
                <div class="flex justify-between items-center bg-accent">
                    <div class="flex items-center">
                        <Button variant="link">
                            <FileText />
                            Plan de Tesis
                        </Button>
                        <span class="text-xs opacity-50">
                            Creado 27 Ago 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Asesor</Badge>
                        <UserBagde
                            username="Lauro Enciso Rodas"
                            email="lauro.enciso@unsaac.edu.pe"
                            variant="text"
                        />
                    </div>
                    <div>
                        <textarea
                            class="w-full text-sm text-balance"
                            value={coment}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Creado 28 Ago 2025 - 10:14 a.m.
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
