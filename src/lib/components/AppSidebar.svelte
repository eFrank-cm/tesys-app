<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";
    import type { Component } from "svelte";
    import NavUser from "./NavUser.svelte";
    import { goto } from "$app/navigation";
    import type { Usuario } from "../../features/auth/models";

    export interface MenuItem {
        title: string;
        url: string;
        icon: Component;
    }

    interface AppSidebarProps {
        menuItems: MenuItem[];
        user?: Usuario;
    }

    let {
        menuItems,
        user = {
            username: "Invitado",
            email: "sin-correo",
            id: "",
            picture: "",
        },
    }: AppSidebarProps = $props();
</script>

<Sidebar.Root collapsible="icon">
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div
                        class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                    >
                        <GalleryVerticalEnd
                            class="size-4 hover:cursor-pointer"
                            onclick={() => goto("/")}
                        />
                    </div>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold"> Tesys </span>
                        <span class="truncate text-xs">UNSAAC - FEEIM</span>
                    </div>
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each menuItems as item (item.title)}
                        <a href={item.url} class="flex items-center gap-2">
                            <Sidebar.MenuItem class="w-full">
                                <Sidebar.MenuButton>
                                    {#snippet tooltipContent()}
                                        {item.title}
                                    {/snippet}
                                    <item.icon class="w-5 h-5" />
                                    <span>{item.title}</span>
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        </a>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser
            username={user.username}
            email={user.email}
            avatar={user.picture}
        />
    </Sidebar.Footer>
    <Sidebar.Rail />
</Sidebar.Root>
