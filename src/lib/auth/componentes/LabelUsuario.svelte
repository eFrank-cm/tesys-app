<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    interface NavUserProps {
        username: string;
        email: string;
        avatar?: string;
    }

    let { username, email, avatar }: NavUserProps = $props();

    let letters = $derived.by(() => {
        return username ? username[0].toUpperCase() : "Inv";
    });
</script>

<span class="flex gap-2 hover:bg-accent py-1.5 px-2 rounded-lg">
    <Avatar.Root class="h-9 w-9 rounded-lg border">
        <Avatar.Image src="" alt={"Sherly Carazas"} />
        <Avatar.Fallback class="rounded-lg">{letters}</Avatar.Fallback>
    </Avatar.Root>
    <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">{username}</span>
        <span class="truncate text-xs">{email}</span>
    </div>
</span>
