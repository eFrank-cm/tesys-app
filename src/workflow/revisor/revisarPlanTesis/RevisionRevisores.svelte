<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import FileUp from "@lucide/svelte/icons/file-up";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FileCheck from "@lucide/svelte/icons/file-check";
    import FileChartColumn from "@lucide/svelte/icons/file-chart-column";

    import MessageSquare from "@lucide/svelte/icons/message-square";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";

    const coment1 = `Es necesario definir con claridad la metodología que se empleará para el desarrollo de la ontología, especificando las fases, herramientas y lenguajes que se utilizarán, de modo que el proceso de construcción sea reproducible y verificable.`;
    const coment2 = `Se recomienda revisar el estado del arte de ontologías aplicadas en el ámbito académico, para fundamentar en qué se diferencia o mejora tu propuesta frente a trabajos previos, y así sustentar la originalidad y pertinencia de tu investigación`;
</script>

<div class="grid gap-4">
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Redactar Plan de Tesis</h3>
    </div>

    <p class="text-sm">
        Espera que suban un plan de tesis para comenzar con la revisión.
    </p>

    <!-- PLANES -->
    <div class="grid gap-8">
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
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileCheck />
                                Plan de Tesis Firmado
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 25 Jun 2025 - 03:43 p.m.
                            </span>
                        </div>
                        <div class="flex items-center">
                            <Button variant="link" class="font-normal">
                                <FileChartColumn />
                                Informe Turniting
                            </Button>
                            <span class="text-xs opacity-50">
                                Creado 25 Jun 2025 - 03:43 p.m.
                            </span>
                        </div>
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
                        <div class="flex items-center gap-4 p-2">
                            <Label
                                for="file-input"
                                class={buttonVariants({ variant: "outline" })}
                            >
                                <FileUp />
                                Subir Formato de Evaluacion
                            </Label>
                            <Input
                                id="file-input"
                                type="file"
                                class="hidden"
                                accept="application/pdf"
                            />
                        </div>
                        <div class="flex items-center gap-4 p-2">
                            <Label
                                for="file-input"
                                class={buttonVariants({ variant: "outline" })}
                            >
                                <FileUp />
                                Subir Informe
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
                            <MessageSquare />
                            Comentar
                        </Button>
                        <Button variant="link">
                            <CircleCheck />
                            Aprobar
                        </Button>
                    </div>
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
                            value={coment1}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Creado 28 Ago 2025 - 10:14 a.m.
                    </span>
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
                            Creado 27 Ago 2025 - 03:43 p.m.
                        </span>
                    </div>
                    <div class="px-2">
                        <Button variant="link">
                            <Pencil />
                            Editar
                        </Button>
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
                            value={coment2}
                        ></textarea>
                    </div>
                    <span class="text-xs opacity-50">
                        Creado 28 Ago 2025 - 10:14 a.m.
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
                            value={coment1}
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
