<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";
    interface Props {
        value: string;
        options: {
            value: string;
            label: string;
        }[];
    }

    let { value = $bindable(""), options }: Props = $props();
</script>

<Select.Root type="single" bind:value>
    <Select.Trigger class="w-[6rem]">
        {options.find((op) => op.value === value)?.label ?? "Select"}
    </Select.Trigger>
    <Select.Content>
        <Select.Group>
            {#each options as ti, index (index)}
                <Select.Item value={ti.value} label={ti.label}>
                    {ti.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
