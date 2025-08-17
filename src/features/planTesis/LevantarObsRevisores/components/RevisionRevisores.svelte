<script lang="ts">
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import FileText from "@lucide/svelte/icons/file-text";
    import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import FilePlus2 from "@lucide/svelte/icons/file-plus-2";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    const coment = `Lorem ipsum dolor sit amet, consectetur adipisicingelit. Odio, similique! Ducimus nesciunt magnam quam essequas explicabo exercitationem atque? Quia doloremque exillumaccusantium distinctio.`;
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
                        <Badge>Revisor</Badge>
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
                        <Badge>Revisor</Badge>
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
        </div>
    </div>
</div>
