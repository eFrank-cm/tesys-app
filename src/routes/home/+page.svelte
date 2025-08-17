<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import Search from "@lucide/svelte/icons/search";
    import { auth } from "../../features/auth/store.svelte";
    import CardNuevoProyecto from "../../features/general/proyectos/componentes/CardNuevoProyecto.svelte";
    import Pasos from "$lib/components/Pasos.svelte";
</script>

<div class="px-80 py-5 grid grid-cols-3 gap-2">
    <div class="col-span-2 px-5 flex flex-col gap-8">
        <div class="flex flex-col gap-3">
            <h2 class="text-2xl">
                Bienvenido {auth.user?.username}
                <hr class="my-2" />
            </h2>
            <p>
                <span class="font-semibold">Tesys</span> está diseñado para acompañarte
                en el proceso de tu tesis, brindándote herramientas que facilitan
                la organización, el seguimiento y la gestión de cada etapa. Con su
                ayuda podrás optimizar tu tiempo, mantener tus avances en orden y
                contar con un soporte confiable que te motive a dar cada paso.
            </p>

            <div>
                <span class="font-semibold">Sigue los siguientes pasos: </span>
                <Pasos />
            </div>

            <div class="my-4 flex gap-4 items-center">
                <span class="font-semibold">Crea tu primer proyecto: </span>
                <CardNuevoProyecto />
            </div>
        </div>

        <div class="flex flex-col gap-3">
            <h2 class="text-2xl">
                Comunidades
                <hr class="my-2" />
            </h2>
            <div>
                <ul class="list-disc mx-8 text-[#9b192d]">
                    <li>
                        <Button
                            variant="link"
                            size="compact"
                            class="text-[#9b192d] font-normal text-md"
                        >
                            ARTICULOS CIENTIFICOS
                        </Button>
                        <span class="text-primary">[452]</span>
                    </li>
                    <li>
                        <Button
                            variant="link"
                            size="compact"
                            class="text-[#9b192d] font-normal text-md"
                        >
                            TESIS DE POSTGRADO
                        </Button>
                        <span class="text-primary">[759]</span>
                    </li>
                    <li>
                        <Button
                            variant="link"
                            size="compact"
                            class="text-[#9b192d] font-normal text-md"
                        >
                            TESIS DE PREGRADO
                        </Button>
                        <span class="text-primary">[1430]</span>
                    </li>
                    <li>
                        <Button
                            variant="link"
                            size="compact"
                            class="text-[#9b192d] font-normal text-md"
                        >
                            FONDO EDITORIAL
                        </Button>
                        <span class="text-primary">[42]</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col gap-3">
            <h2 class="text-2xl">
                Publicaciones recientes
                <hr class="my-2" />
            </h2>
            <div class="flex flex-col gap-10 my-2">
                <div class="flex gap-8">
                    <div class="p-1 border rounded-md flex">
                        <img
                            src="./portada1.jpg"
                            alt="p1"
                            class="border w-80"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-[#9b192d] font-semibold">
                            Prevalencia y factores asociados a infección del
                            tracto urinario en gestantes atendidas en el centro
                            de salud Pichari
                        </h4>
                        <div class="opacity-50 text-sm">
                            Tacuri Mescco, Jossep Jhonatan; Zamata Rojas, Dick
                            Franky (UNSAAC 2025)
                        </div>
                        <p>
                            El objetivo principal de este estudio fue evaluar el
                            desempeño sísmico de las viviendas autoconstruidas
                            de concreto armado localizadas en el centro poblado
                            de Compone, frente a tres niveles de demanda
                            sísmica: sismo moderado, ...
                        </p>
                    </div>
                </div>
                <div class="flex gap-8">
                    <div class="p-1 border rounded-md flex">
                        <img
                            src="./portada1.jpg"
                            alt="p1"
                            class="border w-80"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-[#9b192d] font-semibold">
                            Prevalencia y factores asociados a infección del
                            tracto urinario en gestantes atendidas en el centro
                            de salud Pichari
                        </h4>
                        <div class="opacity-50 text-sm">
                            Tacuri Mescco, Jossep Jhonatan; Zamata Rojas, Dick
                            Franky (UNSAAC 2025)
                        </div>
                        <p>
                            El objetivo principal de este estudio fue evaluar el
                            desempeño sísmico de las viviendas autoconstruidas
                            de concreto armado localizadas en el centro poblado
                            de Compone, frente a tres niveles de demanda
                            sísmica: sismo moderado, ...
                        </p>
                    </div>
                </div>
                <div class="flex gap-8">
                    <div class="p-1 border rounded-md flex">
                        <img
                            src="./portada1.jpg"
                            alt="p1"
                            class="border w-80"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-[#9b192d] font-semibold">
                            Prevalencia y factores asociados a infección del
                            tracto urinario en gestantes atendidas en el centro
                            de salud Pichari
                        </h4>
                        <div class="opacity-50 text-sm">
                            Tacuri Mescco, Jossep Jhonatan; Zamata Rojas, Dick
                            Franky (UNSAAC 2025)
                        </div>
                        <p>
                            El objetivo principal de este estudio fue evaluar el
                            desempeño sísmico de las viviendas autoconstruidas
                            de concreto armado localizadas en el centro poblado
                            de Compone, frente a tres niveles de demanda
                            sísmica: sismo moderado, ...
                        </p>
                    </div>
                </div>
                <div class="flex gap-8">
                    <div class="p-1 border rounded-md flex">
                        <img
                            src="./portada1.jpg"
                            alt="p1"
                            class="border w-80"
                        />
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-[#9b192d] font-semibold">
                            Prevalencia y factores asociados a infección del
                            tracto urinario en gestantes atendidas en el centro
                            de salud Pichari
                        </h4>
                        <div class="opacity-50 text-sm">
                            Tacuri Mescco, Jossep Jhonatan; Zamata Rojas, Dick
                            Franky (UNSAAC 2025)
                        </div>
                        <p>
                            El objetivo principal de este estudio fue evaluar el
                            desempeño sísmico de las viviendas autoconstruidas
                            de concreto armado localizadas en el centro poblado
                            de Compone, frente a tres niveles de demanda
                            sísmica: sismo moderado, ...
                        </p>
                    </div>
                </div>
            </div>
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
