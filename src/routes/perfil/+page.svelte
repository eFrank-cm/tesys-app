<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
</script>

<div class="grid gap-4">
    <h1 class="font-bold text-2xl">PERFIL</h1>

    <p>Mantén tu información siempre actualizada para una mejor experiencia.</p>
</div>
<br />
<div class="flex">
    <Tabs.Root value="propuesta">
        <div class="flex">
            <Tabs.List
                class="flex flex-col gap-4 justify-start items-start bg-transparent w-60"
            >
                <Tabs.Trigger
                    value="propuesta"
                    class="data-[state=active]:bg-secondary"
                    >Propuesta de Invitacion</Tabs.Trigger
                >
                <Tabs.Trigger
                    value="plan-tesis"
                    class="data-[state=active]:bg-secondary"
                    >Resumen de Plan de Tesis</Tabs.Trigger
                >
            </Tabs.List>
            <Tabs.Content value="propuesta"></Tabs.Content>
            <Tabs.Content value="plan-tesis">
                Explica de forma breve el propósito del proyecto a todos los
                usuarios
            </Tabs.Content>
        </div>
    </Tabs.Root>
</div>
