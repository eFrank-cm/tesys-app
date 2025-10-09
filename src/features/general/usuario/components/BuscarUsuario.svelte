<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { type Usuario } from "../model";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import { onMount } from "svelte";
    import { UsuarioStore } from "../store.svelte";
    import UserBagde from "$lib/auth/componentes/UserBagde.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    import X from "@lucide/svelte/icons/x";
    import BadgeCheck from "@lucide/svelte/icons/badge-check";

    interface Prop {
        callback: (user: Usuario, rol: string) => void;
        omitirIds?: string[];
        disabledIds?: string[];
    }

    let { callback, omitirIds = [], disabledIds = [] }: Prop = $props();

    let userSelected = $state<Usuario | null>(null);
    let search = $state("");
    let usuarios = $state<Usuario[]>([]);
    let rolSelected = $state("");

    const ROLES = [
        { value: "AUTOR", label: "Autor" },
        { value: "ASESOR", label: "Asesor" },
        { value: "REVISOR", label: "Revisor" },
    ];

    const triggerContent = $derived(
        ROLES.find((f) => f.value === rolSelected)?.label ?? "Seleciona el Rol",
    );

    let usuarioFiltered = $derived(
        usuarios.filter((u) => {
            const searchList = search.split(" ");
            const value =
                `${u.apellidoPaterno} ${u.apellidoMaterno} ${u.nombres} ${u.username} ${u.email}`.toLowerCase();
            if (
                searchList.some((s) => value.includes(s.toLowerCase())) &&
                !omitirIds.includes(u.id)
            )
                return u;
        }),
    );

    onMount(() => {
        UsuarioStore.getAll().then((data) => (usuarios = data));
    });
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
        Agregar
    </Dialog.Trigger>
    <Dialog.Content class="min-w-[40rem]">
        <Dialog.Header>
            <Dialog.Title>Agregar colaborador</Dialog.Title>
            <Dialog.Description>
                Buscar por nombre de usuario, nombre completo o correo
                electrónico
            </Dialog.Description>
        </Dialog.Header>
        {#if userSelected}
            <div
                class="flex items-center justify-between border rounded-lg p-2"
            >
                <UserBagde
                    username={userSelected.username}
                    email={userSelected.email}
                />
                <div>
                    <Select.Root
                        type="single"
                        name="favoriteFruit"
                        bind:value={rolSelected}
                    >
                        <Select.Trigger class="w-[10rem]">
                            {triggerContent}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Group>
                                {#each ROLES as rol (rol.value)}
                                    {#if (rol.value === "ASESOR" && userSelected.aptoAsesor) || (rol.value === "REVISOR" && userSelected.aptoRevisor) || rol.value === "AUTOR"}
                                        <Select.Item
                                            value={rol.value}
                                            label={rol.label}
                                            disabled={rol.value === rolSelected}
                                        >
                                            {rol.label}
                                        </Select.Item>
                                    {/if}
                                {/each}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </div>
                <Button
                    variant="secondary"
                    onclick={() => {
                        userSelected = null;
                        rolSelected = "";
                    }}
                >
                    <X />
                </Button>
            </div>
        {:else}
            <div>
                <Input bind:value={search} />
            </div>
            {#if search.trim() !== ""}
                <div class="rounded-lg text-xs grid grid-cols-3 items-center">
                    <span class="col-span-2 mx-4">Usuario</span>
                    <div class="col-span-1 flex justify-around">
                        <span>Apto asesor</span>
                        <span>Apto revisor</span>
                    </div>
                </div>
                {#if usuarioFiltered.length > 0}
                    <div class="max-h-[16rem] overflow-auto grid gap-1">
                        {#each usuarioFiltered as user}
                            <button
                                onclick={() => (userSelected = user)}
                                class="rounded-lg border grid grid-cols-6 items-center disabled:cursor-not-allowed"
                                disabled={disabledIds.includes(user.id)}
                            >
                                <UserBagde
                                    username={user.username}
                                    email={user.email}
                                    className="border-none col-span-4"
                                />
                                <div class="flex justify-around">
                                    {#if user.aptoAsesor}
                                        <BadgeCheck />
                                    {/if}
                                </div>
                                <div class="flex justify-around">
                                    {#if user.aptoRevisor}
                                        <BadgeCheck />
                                    {/if}
                                </div>
                            </button>
                        {/each}
                    </div>
                {:else}
                    <p class="text-sm opacity-50 px-4">
                        No se encontro conincidencias con {search}
                    </p>
                {/if}
            {/if}
        {/if}
        <Dialog.Footer>
            <Button variant="secondary">Cancelar</Button>
            <Button
                type="button"
                onclick={() => {
                    if (userSelected && rolSelected)
                        callback(userSelected, rolSelected);
                    userSelected = null;
                    rolSelected = "";
                    search = "";
                }}
                disabled={!(userSelected && rolSelected)}
            >
                Agregar
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
