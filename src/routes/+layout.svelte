<script lang="ts">
	import "../app.css";
	import { goto } from "$app/navigation";
	import { auth } from "../features/auth/store.svelte";
	import Folder from "@lucide/svelte/icons/folder";
	import Bell from "@lucide/svelte/icons/bell";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { page } from "$app/state";
	import AppSidebar, {
		type MenuItem,
	} from "$lib/components/AppSidebar.svelte";

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

{#if page.url.pathname !== "/login" && page.url.pathname !== "/"}
	<Sidebar.Provider open={false}>
		<AppSidebar
			menuItems={MenuItems}
			user={auth.user ? { ...auth.user } : undefined}
		/>
		<main class="w-full p-4">
			<div class="flex gap-2 items-center justify-between">
				<div class="flex gap-2 items-center">
					<Sidebar.Trigger />
					<Breadcrumb.Root>
						<Breadcrumb.List>
							<Breadcrumb.Item class="hidden md:block">
								<Breadcrumb.Link>
									{page.url.pathname
										.slice(1)
										.replaceAll("/", " > ")
										.toUpperCase()}
								</Breadcrumb.Link>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb.Root>
				</div>

				<div class="px-2">
					<Bell />
				</div>
			</div>

			<div class="px-8 py-4">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Provider>
{:else}
	{@render children?.()}
{/if}

<Toaster theme="light" />
