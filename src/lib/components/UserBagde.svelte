<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import Button from "./ui/button/button.svelte";

    interface Props {
        username: string;
        email: string;
        avatar?: string;
        variant?: "defeault" | "combobox" | "icon" | "short" | "text";
    }

    let { username, email, avatar, variant = "defeault" }: Props = $props();
    // let letters = $derived.by(() => {
    //     return username
    //         ? username
    //               .split(" ")
    //               .map((n) => n[0])
    //               .join("")
    //               .toUpperCase()
    //         : "Inv";
    // });

    let letters = $derived.by(() => {
        return username ? username.trim().split(" ")[0][0].toUpperCase() : "I";
    });
</script>

{#if variant === "defeault"}
    <Avatar.Root class="h-8 w-8 rounded-lg">
        <Avatar.Image src={avatar} alt={username} />
        <Avatar.Fallback class="rounded-lg">
            {letters}
        </Avatar.Fallback>
    </Avatar.Root>
    <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">
            {username}
        </span>
        <span class="truncate text-xs">{email}</span>
    </div>
{:else if variant === "combobox"}
    <Avatar.Root class="h-6 w-6 rounded-lg">
        <Avatar.Image src={avatar} alt={username} />
        <Avatar.Fallback class="rounded-lg">
            {letters}
        </Avatar.Fallback>
    </Avatar.Root>
    <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">
            {username}
        </span>
    </div>
{:else if variant === "short"}
    <div
        class="inline-flex items-center gap-2 border rounded-lg shadow-sm px-1.5 py-0.5"
    >
        <Avatar.Root class="h-6 w-6 rounded-lg">
            <Avatar.Image src={avatar} alt={username} />
            <Avatar.Fallback class="rounded-lg">
                {letters}
            </Avatar.Fallback>
        </Avatar.Root>
        <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">
                {username}
            </span>
        </div>
    </div>
{:else if variant === "icon"}
    <Avatar.Root class="h-10 w-10 rounded-lg">
        <Avatar.Image src={avatar} alt={username} />
        <Avatar.Fallback class="rounded-lg">
            {letters}
        </Avatar.Fallback>
    </Avatar.Root>
{:else if variant === "text"}
    <Button variant="link" class="px-1">
        {username}
    </Button>
{/if}
