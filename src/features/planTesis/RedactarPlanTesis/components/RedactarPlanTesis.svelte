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

    const coment = `Lorem ipsum dolor sit amet, consectetur adipisicingelit. Odio, similique! Ducimus nesciunt magnam quam essequas explicabo exercitationem atque? Quia doloremque exillumaccusantium distinctio.`;
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
        </div>
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
        </div>

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
                    <div class="px-2">
                        <Button variant="link">
                            <Trash />
                            Elimar
                        </Button>
                    </div>
                </div>
            </div>
        </div>

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
        </div>

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
        </div>
    </div>
</div>
