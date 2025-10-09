<script>
    import { goto } from "$app/navigation";
    import Input from "$lib/components/ui/input/input.svelte";
    import Search from "@lucide/svelte/icons/search";
    import { authStore } from "$lib/auth/store.svelte";
    import LoginForm from "$lib/auth/componentes/LoginForm.svelte";

    $effect(() => {
        if (authStore.token) {
            goto("/");
        }
    });
</script>

<div class="grid grid-cols-3 gap-2">
    <div class="col-span-2 px-5 flex flex-col gap-8">
        <div class="flex flex-col gap-3">
            <h2 class="text-2xl">
                Acceder
                <hr class="my-2" />
            </h2>
        </div>

        <div class="flex w-full items-center justify-center px-4">
            <LoginForm />
        </div>
    </div>

    <div class="ml-10 px-5 flex flex-col gap-4">
        <div>
            <div
                class="flex items-center border rounded-l-lg rounded-r-lg overflow-hidden"
            >
                <Input
                    placeholder="Busqueda"
                    class="rounded-none border-0 shadow-none"
                />
                <div class="bg-[#9b192d] text-secondary p-1.5 rounded-r-lg">
                    <Search />
                </div>
            </div>
        </div>

        <div class="px-1">
            <h6 class="text-sm opacity-75 my-1">LISTAR</h6>
            <div class="rounded-lg border overflow-hidden">
                <div class="py-2 px-4 bg-[#9b192d] text-secondary">
                    Contenido
                </div>
                <div class="px-4 py-1.5 border-t">
                    Comunidades y Colecciones
                </div>
                <div class="px-4 py-1.5 border-t">Por fecha de publicacion</div>
                <div class="px-4 py-1.5 border-t">Autores</div>
                <div class="px-4 py-1.5 border-t">Titulos</div>
                <div class="px-4 py-1.5 border-t">Materias</div>
            </div>
        </div>

        <div class="px-1">
            <h6 class="text-sm opacity-75 my-1">DESCUBRE</h6>
            <div class="rounded-lg border overflow-hidden">
                <!-- MATERIA -->
                <div class="py-2 px-4 bg-[#9b192d] text-secondary">Materia</div>
                <div class="px-4 py-1.5 border-t">Inteligencia Artificial</div>
                <div class="px-4 py-1.5 border-t">Analítica de Datos</div>
                <div class="px-4 py-1.5 border-t">Aprendizaje Automatico</div>
                <div class="px-4 py-1.5 border-t">Cloud Computing</div>
                <div class="px-4 py-1.5 border-t">Bases de Datos Avanzadas</div>
                <div class="px-4 py-1.5 border-t">
                    Arquitecturas de Microservicios
                </div>
                <div class="px-4 py-1.5 border-t">
                    Internet de las Cosas (IoT)
                </div>
                <div class="px-4 py-1.5 border-t">
                    Ciberseguridad y Criptografía
                </div>
                <div class="px-4 py-1.5 border-t">
                    Automatización y Sistemas Embebidos
                </div>
                <div class="px-4 py-1.5 border-t">... mas</div>

                <!-- AUTORES -->
                <div class="py-2 px-4 bg-[#9b192d] text-secondary">Autores</div>
                <div class="px-4 py-1.5 border-t">
                    Elme Tumpay, Araseli (10)
                </div>
                <div class="px-4 py-1.5 border-t">
                    Bustamante Navarrete, Abdhiel (9)
                </div>
                <div class="px-4 py-1.5 border-t">
                    Marquina Montecinos, Edgar Luis (8)
                </div>
                <div class="px-4 py-1.5 border-t">Yabar Landa, Erick (8)</div>
                <div class="px-4 py-1.5 border-t">Oroz Ramos, Anahi (6)</div>
                <div class="px-4 py-1.5 border-t">
                    Peñalba Gallegos, Zandro (4)
                </div>
                <div class="px-4 py-1.5 border-t">... mas</div>
            </div>
        </div>
    </div>
</div>
