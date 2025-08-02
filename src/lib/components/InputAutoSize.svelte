<script lang="ts">
    import { cn } from "$lib/utils";
    import { onMount } from "svelte";

    let { value = $bindable(), class: className = "", ...restProps } = $props();
    let textareaRef: HTMLTextAreaElement;

    function autoResize() {
        if (!textareaRef) return;
        textareaRef.style.height = "auto";
        textareaRef.style.height = `${textareaRef.scrollHeight}px`;
    }

    onMount(autoResize);
</script>

<div>
    <textarea
        bind:this={textareaRef}
        bind:value
        rows={1}
        class={cn(
            "min-h-8 resize-none overflow-hidden border-none p-2 rounded-lg w-full",
            className,
        )}
        oninput={autoResize}
        {...restProps}
    ></textarea>
</div>
