<script lang="ts">
    import LoadingIcon from "$lib/components/custom/LoadingIcon.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { onMount } from "svelte";
    import {
        getEmptyUsuario,
        type Usuario,
    } from "../../features/general/usuario/model";
    import { UsuarioStore } from "../../features/general/usuario/store.svelte";
    import { authStore } from "$lib/auth/store.svelte";
    import { toast } from "svelte-sonner";

    let personaEditable = $state<Usuario>(getEmptyUsuario());
    let formEl: HTMLFormElement;
    let loading = $state(false);
    let error = $state(false);

    onMount(() => {
        refresh();
    });

    function refresh() {
        if (authStore.user) {
            UsuarioStore.get(authStore.user.id).then((data) => {
                console.log(data);
                if (data) personaEditable = data;
            });
        }
    }

    async function onSave() {
        UsuarioStore.edit(personaEditable.id, { ...personaEditable })
            .then(() => {
                toast.success(`Guardado correctamente`);
                refresh();
            })
            .catch((error) => {
                toast.error(`Error al guardar ${error}`);
            });
    }
</script>

<div class="grid gap-4">
    <h1 class="font-bold text-2xl">PERFIL</h1>

    <p>Mantén tu información siempre actualizada para una mejor experiencia.</p>
</div>
<br />
<div class="flex">
    <form bind:this={formEl} class="grid gap-3 px-1">
        <h1>Datos Personales</h1>
        <div class="p-2 grid gap-2">
            <div>
                <div class="grid grid-cols-12 gap-2">
                    <div class="col-span-4">
                        <label
                            for="apellidoPaterno"
                            class="text-sm font-semibold"
                            >Apellido Paterno</label
                        >
                        <input
                            id="apellidoPaterno"
                            type="text"
                            class="border px-1 py-0.5 rounded-md w-full"
                            bind:value={personaEditable.apellidoPaterno}
                            placeholder="Apellido paterno"
                            required
                        />
                    </div>

                    <div class="col-span-4">
                        <label
                            for="apellidoMaterno"
                            class="text-sm font-semibold"
                            >Apellido Materno</label
                        >
                        <input
                            type="text"
                            class="border px-1 py-0.5 rounded-md w-full"
                            id="apellidoMaterno"
                            bind:value={personaEditable.apellidoMaterno}
                            placeholder="Apellido Materno"
                            required
                        />
                    </div>

                    <div class="col-span-4">
                        <label for="nombres" class="text-sm font-semibold">
                            Nombres
                        </label>
                        <input
                            type="text"
                            id="nombres"
                            class="border px-1 py-0.5 rounded-md w-full"
                            bind:value={personaEditable.nombres}
                            placeholder="Nombres"
                            required
                        />
                    </div>

                    <div class="col-span-3">
                        <label for="nombres" class="text-sm font-semibold">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="nroDocumento"
                            class="border px-1 py-0.5 rounded-md w-full"
                            bind:value={personaEditable.dni}
                            placeholder="Documento de Identida"
                            required
                        />
                    </div>

                    <div></div>
                    <div
                        class="col-span-2 w-full flex justify-center items-end"
                    >
                        <RadioGroup.Root
                            class="flex flex-col gap-0"
                            bind:value={personaEditable.genero}
                            id="genero"
                        >
                            <div class="flex items-center gap-1">
                                <RadioGroup.Item value="M" id="M" />
                                <label for="M">Masculino</label>
                            </div>

                            <div class="flex items-center gap-1">
                                <RadioGroup.Item value="F" id="F" />
                                <label for="F">Femenino</label>
                            </div>
                        </RadioGroup.Root>
                    </div>
                    <div></div>

                    <div class="col-span-4">
                        <label
                            for="fechaNacimiento"
                            class="text-sm font-semibold"
                        >
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            class="border px-1 py-0.5 rounded-md w-full"
                            bind:value={personaEditable.fechaNacimiento}
                            placeholder="Fecha de Nacimiento"
                        />
                    </div>

                    <div class="col-span-4">
                        <label for="celular" class="text-sm font-semibold">
                            Nro de Celular
                        </label>
                        <input
                            type="text"
                            id="celular"
                            class="border px-1 py-0.5 rounded-md w-full"
                            bind:value={personaEditable.celular}
                        />
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <Button type="button" onclick={onSave}>
                {#if loading}
                    <LoadingIcon /> Guardando...
                {:else if error}
                    <span class="text-red-500">Error al guardar!</span>
                {:else}
                    Guardar
                {/if}
            </Button>
        </div>
    </form>
</div>
