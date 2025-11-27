<script lang="ts">
	import "../app.css";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import ChrevronDown from "@lucide/svelte/icons/chevron-down";
	import House from "@lucide/svelte/icons/house";
	import { authStore } from "$lib/auth/store.svelte";
	import { page } from "$app/state";

	let { children } = $props();
	const urlCurrent = page.url.toString();
	let isLoggedIn = $derived(!!authStore.token);
</script>

{#if urlCurrent.includes("/pdf/") && authStore.token}
	{@render children?.()}
{:else}
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

			{#if authStore.token && (authStore.user?.tipo === "DOCENTE" || authStore.user?.tipo === "ESTUDIANTE")}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								variant="link"
								size="compact"
								class="text-secondary font-normal"
								{...props}
							>
								{authStore.user?.username}
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
							<DropdownMenu.Item
								onclick={() => goto("/proyectos")}
							>
								Proyectos
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item
							onclick={() => {
								authStore.logout();
								goto("/");
							}}
						>
							Cerrar sesión
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else if authStore.token && authStore.user?.tipo === "ADMIN"}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								variant="link"
								size="compact"
								class="text-secondary font-normal"
								{...props}
							>
								{authStore.user?.username}
								<ChrevronDown />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-40" align="start">
						<DropdownMenu.Label>Mi Cuenta</DropdownMenu.Label>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								onclick={() => goto("/admin/usuarios")}
							>
								Usuarios
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onclick={() => goto("/admin/proyectos")}
							>
								Proyectos
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item
							onclick={() => {
								authStore.logout();
								goto("/");
							}}
						>
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
						<Breadcrumb.Link
							href="/"
							class="flex items-center gap-1"
						>
							<House class="w-4" />
							Repositorio Institucional
						</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Page>
						<Breadcrumb.Link href="/proyectos">
							Proyectos
						</Breadcrumb.Link>
					</Breadcrumb.Page>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</div>
	</div>

	<div class="px-80 py-5">
		{@render children?.()}
	</div>
{/if}

<Toaster theme="light" />
