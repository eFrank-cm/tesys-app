<script lang="ts">
	import "../app.css";
	import { goto } from "$app/navigation";
	import { auth } from "../features/auth/store.svelte";
	import Folder from "@lucide/svelte/icons/folder";
	import Bell from "@lucide/svelte/icons/bell";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import AppSidebar, {
		type MenuItem,
	} from "$lib/components/AppSidebar.svelte";
	import ChrevronDown from "@lucide/svelte/icons/chevron-down";
	import House from "@lucide/svelte/icons/house";

	let { children } = $props();

	const MenuItems: MenuItem[] = [
		{
			title: "Proyectos",
			url: "/proyectos",
			icon: Folder,
		},
	];

	$effect(() => {
		if (!auth.token) {
			goto("/");
		}
	});
</script>

<header class="px-80 py-2 flex justify-between bg-[#9b192d] text-secondary">
	<a href="/">
		<img class="w-40" src="/logo-unsaac-white.png" alt="logo-unsaac" />
	</a>
	<div class="flex gap-4 items-start">
		<Button
			variant="link"
			size="compact"
			class="text-secondary font-normal"
		>
			Reglamento
		</Button>
		<Button
			variant="link"
			size="compact"
			class="text-secondary font-normal"
		>
			Estadisticas
		</Button>

		{#if auth.token}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button
							variant="link"
							size="compact"
							class="text-secondary font-normal"
							{...props}
						>
							{auth.user?.username}
							<ChrevronDown />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-40" align="start">
					<DropdownMenu.Label>Mi Cuenta</DropdownMenu.Label>
					<DropdownMenu.Group>
						<DropdownMenu.Item onclick={() => goto("/perfil")}>
							Perfil
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => goto("/proyectos")}>
							Proyectos
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onclick={auth.logout}>
						Cerrar sesión
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button
				variant="link"
				size="compact"
				class="text-secondary font-normal"
				onclick={() => goto("/login")}
			>
				Acceder
			</Button>
		{/if}
	</div>
</header>

<div class="px-80 text-secondary">
	<div class="px-4 py-1 rounded-b-lg flex gap-4 bg-[#9b192d] opacity-75">
		<Breadcrumb.Root>
			<Breadcrumb.List class="text-white">
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/" class="flex items-center gap-1">
						<House class="w-4" />
						Repositorio Institucional
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<!-- <Breadcrumb.Item>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="flex items-center gap-1">
							<Breadcrumb.Ellipsis class="size-4" />
							<span class="sr-only">Toggle menu</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							<DropdownMenu.Item>Documentation</DropdownMenu.Item>
							<DropdownMenu.Item>Themes</DropdownMenu.Item>
							<DropdownMenu.Item>GitHub</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Breadcrumb.Item>
				<Breadcrumb.Separator /> -->
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/proyectos">
						Proyectos
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page class="text-[#e8a134] font-semibold">
						ontologia para la gestion de tesis
						<!-- Proyectos -->
					</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</div>

<div class="px-80 py-5">
	{@render children?.()}
</div>

<Toaster theme="light" />
