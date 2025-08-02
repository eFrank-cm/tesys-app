<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import Info from "@lucide/svelte/icons/info";
    import Propuesta from "./Propuesta.svelte";
</script>

<div class="grid grid-cols-2 gap-8">
    <Accordion.Root type="multiple" value={["item-1"]} class="grid gap-2">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>1. Solicitar asesoramiento</Accordion.Trigger>
            <Accordion.Content class="flex flex-col gap-4 pl-4">
                <p class="text-balance">
                    Este procedimiento permite invitar a un docente a formar
                    parte del proyecto como asesor de tesis. Para ello el
                    estudiante deberá redactar una propuesta que contenga:
                </p>

                <ul class="ml-10 list-disc text-balance">
                    <li>
                        <strong>Título</strong> tentativo de la tesis.
                    </li>
                    <li>
                        <strong>Descripción</strong> breve del tema, destacando el
                        enfoque principal, los objetivos generales y la relevancia
                        académica.
                    </li>
                    <li>
                        <strong>Docente</strong> que será invitado a asesorar la
                        tesis.
                    </li>
                </ul>

                <p>
                    Finalmente docente selecionado recibirá una notificación
                    para su posible aceptación.
                </p>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
            <Accordion.Trigger>2. Redactar Plan de Tesis</Accordion.Trigger>
            <Accordion.Content class="flex flex-col gap-4 text-balance pl-4">
                <p>
                    El <strong>plan de tesis</strong> es un documento breve que describe
                    el tema, objetivos, metodología y justificación de la investigación
                    que se propone realizar.
                </p>
                <ul class="text-balance ml-5">
                    <li class="flex items-center gap-2">
                        <ChevronRight class="inline" size={17} />
                        <p>
                            Usa el <strong>reglamento</strong> de tu Escuela Profesional
                            como guia para redactar tu plan de tesis.
                        </p>
                    </li>
                    <li class="flex items-center gap-2">
                        <ChevronRight class="inline" size={17} />
                        <p>
                            Esta disponible una <strong>plantilla</strong> en Overleaf
                            que te ayudara a acelerar el proceso de redaccion.
                        </p>
                    </li>
                </ul>
                <hr class="w-3/4" />
                <div class="flex gap-2">
                    <Info size={20} />
                    <p>
                        Luego de subir el plan de tesis, el asesor debe
                        revisarlo y, en caso de encontrar observaciones, estas
                        deberán ser absueltas antes de continuar con el proceso.
                    </p>
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
            <Accordion.Trigger>3. Realizar Tramite</Accordion.Trigger>
            <Accordion.Content class="flex flex-col gap-4 pl-4">
                <p class="text-balance">
                    Para continuar, debes realizar el pago de <strong
                        >S/. 200.00</strong
                    >
                    en la <strong>Caja Central de la Universidad</strong>,
                    indicando que es por el trámite:
                </p>
                <div class="mx-auto">
                    <Badge variant="secondary" class="text-md">
                        NOMBRAMIENTO DE ASESOR E INSCRIPCION DE TEMA DE TESIS
                    </Badge>
                </div>
                <p>
                    Seguidamente, debes preparar los siguientes documentos en
                    formato PDF para realizar el tramite mediante la <strong
                        >PLADDES</strong
                    >:
                </p>
                <ul class="ml-10 list-decimal text-balance">
                    <li>
                        <strong>Boucher de pago</strong> (comprobante legible).
                    </li>
                    <li>
                        <strong>Copia de DNI</strong> (ambos lados en un solo archivo)
                    </li>
                    <li>
                        <strong>Ficha de seguimiento</strong> (emitido por la Universidad)
                    </li>
                    <li>
                        <strong>Carta de aceptación de asesoramiento</strong> (firmado
                        por el asesor)
                    </li>
                    <li>
                        <strong>Plan de tesis</strong> (firmado por el asesor)
                    </li>
                    <li>
                        <strong>Informe Turnitin</strong> (emitido por el asesor)
                    </li>
                </ul>
                <p>
                    Una vez que realice el tramite, registre el numero de
                    expediente.
                </p>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-4">
            <Accordion.Trigger>
                4. Levantar observaciones de Revisores
            </Accordion.Trigger>
            <Accordion.Content class="flex flex-col gap-4 pl-4">
                <p class="text-balance">
                    Al concluir el trámite, <strong
                        >se asignarán revisores</strong
                    > responsables de evaluar el plan de tesis, los cuales revisarán
                    el contenido y, si es necesario, emitirán observaciones que deberán
                    ser levantadas.
                </p>

                <div class="flex gap-3 text-balance">
                    <Info size={20} />
                    <p>
                        Una vez absueltas, los revisores elaborarán un <strong
                            >informe</strong
                        >
                        donde indicarán su conformidad con el plan de tesis, permitiendo
                        así continuar con el proceso.
                    </p>
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-5">
            <Accordion.Trigger>5. Aprovacion de Plan de Tesis</Accordion.Trigger
            >
            <Accordion.Content class="flex flex-col gap-4 text-balance pl-4">
                <p>
                    Finalmente solo queda esperar la <strong
                        >resolución de aprobación del plan de tesis</strong
                    >, la cual será emitida por la escuela profesional.
                </p>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>

    <div>
        <Card.Root class="w-full h-full p-4">
            <Propuesta />
        </Card.Root>
    </div>
</div>
