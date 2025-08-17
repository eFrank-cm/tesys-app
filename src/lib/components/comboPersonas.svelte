<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    import UserBagde from "$lib/components/UserBagde.svelte";

    const people = [
        {
            value: "71788811",
            label: { username: "Ana Torres Ríos", email: "ana.tr@example.com" },
        },
        {
            value: "73829100",
            label: {
                username: "Luis Alberto Pérez Huamán",
                email: "luisap.perezh@example.com",
            },
        },
        {
            value: "72345678",
            label: {
                username: "María Fernanda Gómez Chávez",
                email: "mfgomez@example.com",
            },
        },
        {
            value: "71478562",
            label: {
                username: "Carlos Ruiz Quispe",
                email: "carlos.rq@example.com",
            },
        },
        {
            value: "72891234",
            label: {
                username: "Julia Esther Vargas Torres",
                email: "jevargas@example.com",
            },
        },
        {
            value: "73567890",
            label: {
                username: "Pedro Quispe Mendoza",
                email: "pedro.qm@example.com",
            },
        },
        {
            value: "71928374",
            label: {
                username: "Sofía León Ramos",
                email: "sofia.lr@example.com",
            },
        },
        {
            value: "70123456",
            label: {
                username: "Jorge Luján Salas",
                email: "jorge.ls@example.com",
            },
        },
        {
            value: "71234567",
            label: {
                username: "Elena Ríos Castañeda",
                email: "elena.rc@example.com",
            },
        },
        {
            value: "74561238",
            label: {
                username: "Andrés Mateo Soto Llosa",
                email: "amsoto@example.com",
            },
        },
        {
            value: "70987654",
            label: {
                username: "Lucía Castaño Delgado",
                email: "lucia.cd@example.com",
            },
        },
        {
            value: "73245671",
            label: {
                username: "Miguel Ángel Ramos Huerta",
                email: "maramos@example.com",
            },
        },
        {
            value: "71119888",
            label: {
                username: "Paula Mendoza Farfán",
                email: "paula.mf@example.com",
            },
        },
        {
            value: "70013478",
            label: {
                username: "Ricardo Chávez Poma",
                email: "ricardo.cp@example.com",
            },
        },
        {
            value: "73456782",
            label: {
                username: "Isabel Arce Muñoz",
                email: "isabel.am@example.com",
            },
        },
        {
            value: "71654321",
            label: {
                username: "Martín Loayza Peña",
                email: "martin.lp@example.com",
            },
        },
        {
            value: "72234567",
            label: {
                username: "Rosa Elena Córdova Aguirre",
                email: "recordova@example.com",
            },
        },
        {
            value: "72678912",
            label: {
                username: "Fernando Gálvez Soria",
                email: "fernando.gs@example.com",
            },
        },
        {
            value: "71987645",
            label: {
                username: "Claudia Reyes Obando",
                email: "claudia.ro@example.com",
            },
        },
        {
            value: "71098765",
            label: {
                username: "Héctor Medina Cárdenas",
                email: "hector.mc@example.com",
            },
        },
    ];

    let open = $state(false);
    let value = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    const selectedValue = $derived(
        people.find((f) => f.value === value)?.label,
    );

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
            >
                {#if selectedValue}
                    <UserBagde
                        username={selectedValue.username}
                        email={selectedValue.email}
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
                <Command.Empty>No framework found.</Command.Empty>
                <Command.Group value="frameworks">
                    {#each people as person (person.value)}
                        <Command.Item
                            value={person.value}
                            onSelect={() => {
                                value = person.value;
                                closeAndFocusTrigger();
                            }}
                        >
                            <CheckIcon
                                class={cn(
                                    value !== person.value &&
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
