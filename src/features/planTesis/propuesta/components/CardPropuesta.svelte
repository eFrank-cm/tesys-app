<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import LabelUsuario from "../../../LabelUsuario.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Pencil from "@lucide/svelte/icons/pencil";
    import X from "@lucide/svelte/icons/x";
    import Plus from "@lucide/svelte/icons/plus";
    import InputAutoSize from "$lib/components/InputAutoSize.svelte";
    import { PlanTesisStore } from "../../store.svelte";

    let propuesta = $derived(PlanTesisStore.propuesta);

    function handleEdit() {
        console.log($state.snapshot(propuesta));
    }

    let input: HTMLInputElement;
    function handleKeydown(e: KeyboardEvent) {
        if (e.key !== "Enter") return;
        propuesta.keywords.push(input.value);
        input.value = "";
    }

    function handleX(prm: string) {
        propuesta.keywords = propuesta.keywords.filter((kw) => kw !== prm);
    }
</script>

<Card.Root class="relative">
    <div class="absolute right-4 top-4">
        <Button variant="outline" onclick={handleEdit}>
            <Pencil />
        </Button>
    </div>
    <Card.Header>
        <Card.Title class="uppercase flex justify-center">
            <InputAutoSize
                bind:value={propuesta.titulo}
                class="text-center uppercase text-lg min-w-2xl w-[75rem]"
            />
        </Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-6 mx-8">
        <div class="flex justify-center items-center gap-8">
            <LabelUsuario
                username="Sherly Carazas"
                email="sherly.carazas@unsaac.edu.pe"
                avatar=""
            />

            <LabelUsuario
                username="Elizon Carcausto"
                email="elizon.carcausto@unsaac.edu.pe"
                avatar=""
            />

            <div class="border-r border-gray-400 h-full"></div>

            <LabelUsuario
                username="Beltran Palma"
                email="beltran.palma@unsaac.edu.pe"
                avatar=""
            />

            <Button variant="outline" class="rounded-full w-8 h-8">
                <Plus />
            </Button>
        </div>

        <InputAutoSize bind:value={propuesta.resumen} />

        <div class="flex gap-4">
            <Label>Palabras Clave:</Label>
            <div class="flex flex-wrap gap-2 border-b py-2 border-black">
                {#each propuesta.keywords as kw}
                    <Badge>
                        {kw}
                        <button
                            onclick={() => handleX(kw)}
                            class="hover:enabled:cursor-pointer"
                        >
                            <X class="w-4 h-4" />
                        </button>
                    </Badge>
                {/each}
                <input
                    bind:this={input}
                    type="text"
                    class="px-2 rounded-lg py-0.5"
                    onkeydown={handleKeydown}
                />
            </div>
        </div>
    </Card.Content>
</Card.Root>
