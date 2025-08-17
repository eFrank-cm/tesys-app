<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import XIcon from "@lucide/svelte/icons/x";

    interface Props {
        list: string[];
        disabled?: boolean;
    }

    let { list = $bindable([]), disabled = $bindable(false) }: Props = $props();
    let input: HTMLInputElement;

    function handleKeydown(e: KeyboardEvent) {
        if (e.key !== "Enter") return;
        const value = input.value.trim();
        if (!value) return;
        list.push(value);
        input.value = "";
    }
    function handleX(prm: string) {
        const index = list.indexOf(prm);
        if (index !== -1) list.splice(index, 1);
    }
</script>

<div class="flex gap-4">
    <Label>Palabras Clave:</Label>
    <div class="flex flex-wrap gap-2 py-2 border-black">
        {#each list as e}
            <Badge>
                {e}
                {#if !disabled}
                    <button
                        onclick={() => handleX(e)}
                        class="hover:enabled:cursor-pointer"
                    >
                        <XIcon class="w-4 h-4" />
                    </button>
                {/if}
            </Badge>
        {/each}

        <input
            bind:this={input}
            type="text"
            class:hidden={disabled}
            class="px-2 rounded-lg py-0.5 border"
            onkeydown={handleKeydown}
            {disabled}
        />
    </div>
</div>
