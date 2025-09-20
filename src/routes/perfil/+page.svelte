<script lang="ts">
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

    let value = $state("a");
</script>

<div class="grid gap-4">
    <h1 class="font-bold text-2xl">PERFIL</h1>

    <p>Mantén tu información siempre actualizada para una mejor experiencia.</p>
</div>

<div class="flex">
    <ToggleGroup.Root
        type="single"
        orientation="vertical"
        class="w-2/12 flex flex-col gap-4 justify-start items-start"
        bind:value
    >
        <ToggleGroup.Item value=""></ToggleGroup.Item>
        <ToggleGroup.Item value="b" class="py-2 px-4 text-start">
            <span class="w-full text-start">hola</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="b" class="py-2 px-4 text-start">
            Cuenta
        </ToggleGroup.Item>
        <ToggleGroup.Item value="c" class="py-2 px-4 text-start">
            Datos Academicos
        </ToggleGroup.Item>
        <ToggleGroup.Item value=""></ToggleGroup.Item>
    </ToggleGroup.Root>
    <div class="w-10/12">
        Seleccionado: {value}
    </div>
</div>
