<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import FileChartColumn from "@lucide/svelte/icons/file-chart-column";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import FilePlus2 from "@lucide/svelte/icons/file-plus-2";
    import Trash from "@lucide/svelte/icons/trash";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    const coment1 = `Se recomienda revisar el estado del arte de ontologías aplicadas en el ámbito académico, para fundamentar en qué se diferencia o mejora tu propuesta frente a trabajos previos, y así sustentar la originalidad y pertinencia de tu investigación`;
    const coment2 = `Es necesario definir con claridad la metodología que se empleará para el desarrollo de la ontología, especificando las fases, herramientas y lenguajes que se utilizarán, de modo que el proceso de construcción sea reproducible y verificable.`;
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Historial de Plan de Tesis</h3>
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

    <!-- PLANES -->
    <div class="grid gap-8">
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
                            Creado 15 Sep 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2 items-center">
                    <div class="flex justify-between items-center">
                        <div>
                            <Badge>Revisor</Badge>
                            <UserBagde
                                username="Robert Wilbert Alzamora Paredes"
                                email="lauro.enciso@unsaac.edu.pe"
                                variant="text"
                            />
                        </div>
                        <div class="">
                            <Badge class="bg-green-600">
                                <CircleCheck />
                                APROBADO, 20 Sep 2025 - 10:14 a.m.
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileCheck />
                                Formato de Evaluacion
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 22 Sep 2025 - 05:43 p.m.
                            </span>
                        </div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileChartColumn />
                                Informe
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 22 Sep 2025 - 08:14 p.m.
                            </span>
                        </div>
                    </div>
                </div>
                <div class="border-t px-4 py-2 items-center">
                    <div class="flex justify-between items-center">
                        <div>
                            <Badge>Revisor</Badge>
                            <UserBagde
                                username="Lino Aquiles Baca Cardenas"
                                email="lauro.enciso@unsaac.edu.pe"
                                variant="text"
                            />
                        </div>
                        <div class="">
                            <Badge class="bg-green-600">
                                <CircleCheck />
                                APROBADO, 21 Sep 2025 - 09:01 a.m.
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileCheck />
                                Formato de Evaluacion
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 23 Sep 2025 - 11:45 a.m.
                            </span>
                        </div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileChartColumn />
                                Informe
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 23 Sep 2025 - 02:26 p.m.
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
                    <div>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {#snippet child({ props })}
                                    <Button
                                        {...props}
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <EllipsisVertical size={20} />
                                    </Button>
                                {/snippet}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="start" class="mx-4">
                                <DropdownMenu.Group>
                                    <DropdownMenu.Item>
                                        Editar
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        Elimar
                                    </DropdownMenu.Item>
                                </DropdownMenu.Group>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </div>

                <div
                    class="border-t px-4 py-2 flex justify-between items-center"
                >
                    <div>
                        <Badge>Revisor</Badge>
                        <UserBagde
                            username="Harley Vera Olivera"
                            email="harley.vera@unsaac.edu.pe"
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
                <div
                    class="border-t px-4 py-2 flex justify-between items-center"
                >
                    <div>
                        <Badge>Revisor</Badge>
                        <UserBagde
                            username="Karelia Medina Miranda"
                            email="karelia.medina@unsaac.edu.pe"
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
                            Creado 15 Sep 2025 - 03:43 p.m.
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
                            Creado 15 Sep 2025 - 03:43 p.m.
                        </span>
                    </div>
                </div>

                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Revisor</Badge>
                        <UserBagde
                            username="Robert Wilbert Alzamora Paredes"
                            email="lauro.enciso@unsaac.edu.pe"
                            variant="text"
                        />
                    </div>
                    <div>
                        <textarea
                            class="w-full text-sm text-balance"
                            value={coment1}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Creado 17 Sep 2025 - 10:14 a.m.
                    </span>
                </div>
                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Revisor</Badge>
                        <UserBagde
                            username="Lino Aquiles Baca Cardenas"
                            email="lauro.enciso@unsaac.edu.pe"
                            variant="text"
                        />
                    </div>
                    <div>
                        <textarea
                            class="w-full text-sm text-balance"
                            value={coment2}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Creado 18 Sep 2025 - 03:21 p.m.
                    </span>
                </div>
            </div>
        </div>

        <!-- 
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
                            Creado 25 Jun 2025 - 03:43 p.m.
                        </span>
                    </div>
                    <div>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {#snippet child({ props })}
                                    <Button
                                        {...props}
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <EllipsisVertical size={20} />
                                    </Button>
                                {/snippet}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="start" class="mx-4">
                                <DropdownMenu.Group>
                                    <DropdownMenu.Item>
                                        Editar
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        Elimar
                                    </DropdownMenu.Item>
                                </DropdownMenu.Group>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </div>

                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Asesor</Badge>
                        <UserBagde
                            username="Harley Vera Olivera"
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
                </div>
                <div class="border-t px-4 py-2">
                    <div>
                        <Badge>Asesor</Badge>
                        <UserBagde
                            username="Karelia Medina Miranda"
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
                </div>
            </div>
        </div> -->
    </div>
</div>
