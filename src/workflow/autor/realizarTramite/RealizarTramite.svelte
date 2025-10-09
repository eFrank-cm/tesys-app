<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as InputOTP from "$lib/components/ui/input-otp/index.js";
    import XIcon from "@lucide/svelte/icons/x";
    import Label from "$lib/components/ui/label/label.svelte";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Check from "@lucide/svelte/icons/check";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FileText from "@lucide/svelte/icons/file-text";

    let disabled = $state(true);
</script>

<div class="">
    <h3 class="text-lg font-semibold">Realizar Tramite</h3>

    <p class="text-sm my-1">
        Realice el tramite en la plataforma PLADDES siguiendo los pasos
        descritos en la parte inferior.
    </p>

    <div class="flex flex-col gap-2">
        <div class="w-full h-[36rem]">
            <iframe
                src="https://tramite.unsaac.edu.pe/tramite/virtual"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                title="PLADDES"
                class="w-full h-full border rounded-lg"
            ></iframe>
        </div>

        <div class="">
            <Tabs.Root value="interesado">
                <Tabs.List class="w-full">
                    <Tabs.Trigger value="interesado">
                        DATOS DEL INTERESADO
                    </Tabs.Trigger>
                    <Tabs.Trigger value="peticion">
                        DATOS DE LA PETICION
                    </Tabs.Trigger>
                    <Tabs.Trigger value="archivo">ARCHIVO DIGITAL</Tabs.Trigger>
                    <Tabs.Trigger value="confirmar">
                        CONFIRMAR DATOS
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="interesado">
                    <p class="text-sm px-4">
                        Digita tu <strong>codigo de estudiante</strong> y haga
                        clic en <strong>Buscar</strong>.
                    </p>
                </Tabs.Content>
                <Tabs.Content value="peticion">
                    <ul class="ml-10 list-decimal text-balance text-sm px-4">
                        <li>
                            Selecciona la categoria <strong
                                >FACULTADES (ESTUDIANTES)</strong
                            >
                        </li>
                        <li>
                            Marque la casilla de <strong
                                >NOMBRAMIENTO DE ASESOR E INSCRIPCIÓN DE TEMA DE
                                TESIS O TRABAJO DE INVESTIGACIÓN</strong
                            >
                        </li>
                    </ul>
                </Tabs.Content>
                <Tabs.Content value="archivo">
                    <div class="text-sm px-4">
                        Suba los siguientes archivos:
                        <div>
                            <Button variant="link">
                                <FileText />
                                Boucher de Pago
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Copia de DNI
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Ficha de Seguimiento
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Carta de aceptación
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Plan de Tesis
                            </Button>
                            <Button variant="link">
                                <FileText />
                                Informe Turnitin
                            </Button>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="confirmar">
                    <div class="text-sm flex items-center gap-1 px-4">
                        Haga clic en <strong>Guardar</strong> y registe el
                        numero de
                        <div class="flex gap-2">
                            <Label>Expediente:</Label>
                            <InputOTP.Root
                                maxlength={6}
                                value="456987"
                                {disabled}
                            >
                                {#snippet children({ cells })}
                                    <InputOTP.Group>
                                        {#each cells.slice(0, 6) as cell}
                                            <InputOTP.Slot {cell} />
                                        {/each}
                                    </InputOTP.Group>
                                {/snippet}
                            </InputOTP.Root>
                            <div>
                                {#if disabled}
                                    <Button
                                        variant="outline"
                                        class="border-0 opacity-50"
                                        size="icon"
                                        onclick={() => (disabled = false)}
                                    >
                                        <Pencil size={5} />
                                    </Button>
                                {:else}
                                    <Button
                                        variant="outline"
                                        class="border-0 text-green-600"
                                        size="icon"
                                        onclick={() => (disabled = true)}
                                    >
                                        <XIcon size={5} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        class="border-0 text-red-600"
                                        size="icon"
                                        onclick={() => (disabled = true)}
                                    >
                                        <Check size={5} />
                                    </Button>
                                {/if}
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
</div>
