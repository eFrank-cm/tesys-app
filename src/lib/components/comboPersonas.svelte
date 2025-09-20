<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    import UserBagde from "$lib/components/UserBagde.svelte";
    import type { Usuario } from "../../features/auth/models";

    interface Props {
        personas: Usuario[];
        value: Usuario | null;
        disabled?: boolean;
    }

    let {
        personas = [],
        value = $bindable(null),
        disabled = $bindable(false),
    }: Props = $props();

    let people = $derived.by(() => {
        return personas.map((user) => ({
            value: user.id,
            label: {
                username: user.username,
                email: user.email,
            },
        }));
    });

    let open = $state(false);
    let selectedValue = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    $effect(() => {
        value = personas.find((p) => p.id === selectedValue) ?? null;
    });

    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef.focus();
        });
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({ props })}
            <Button
                {...props}
                variant="outline"
                class="justify-between"
                role="combobox"
                aria-expanded={open}
                {disabled}
            >
                {#if value}
                    <UserBagde
                        username={value.username}
                        email={value.email}
                        variant="combobox"
                    />
                {:else}
                    Seleccione un docente
                {/if}
                <ChevronsUpDownIcon class="opacity-50" />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
        <Command.Root>
            <Command.Input placeholder="Buscar por nobre o DNI" />
            <Command.List>
                <Command.Empty>Sin resultados.</Command.Empty>
                <Command.Group value="frameworks">
                    {#each people as person (person.value)}
                        <Command.Item
                            value={person.value}
                            onSelect={() => {
                                selectedValue = person.value;
                                closeAndFocusTrigger();
                            }}
                        >
                            <CheckIcon
                                class={cn(
                                    selectedValue !== person.value &&
                                        "text-transparent",
                                )}
                            />
                            <div
                                class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                            >
                                <UserBagde
                                    username={person.label.username}
                                    email={person.label.email}
                                />
                            </div>
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>
