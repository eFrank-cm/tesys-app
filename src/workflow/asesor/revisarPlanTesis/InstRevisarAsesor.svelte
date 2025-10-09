<script>
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import MessageSquare from "@lucide/svelte/icons/message-square";
    import CircleCheck from "@lucide/svelte/icons/circle-check";
    import CircleX from "@lucide/svelte/icons/circle-x";
    import Info from "@lucide/svelte/icons/info";
</script>

<p>
    El <strong>asesor</strong> debe revisar el <strong>plan de tesis</strong> y registrar
    su decisión. A continuación, las acciones sugeridas:
</p>

<ul class="text-balance ml-5 grid gap-1">
    <li class="flex items-start gap-2">
        <ChevronRight size={17} />
        <p>
            <strong>Revisar</strong>: título, objetivos, metodología,
            cronograma, viabilidad y relevancia académica.
        </p>
    </li>
    <li class="flex items-start gap-2">
        <ChevronRight size={17} />
        <p>
            <strong>Comentar</strong> las observaciones que requiera el documento
            para su pronta corrección.
        </p>
    </li>
    <li class="flex items-start gap-2">
        <ChevronRight size={17} />
        <p class="flex items-center gap-2">
            <span>
                <strong>Aprobar</strong> si el documento cumple lo requerido; se
                habilita el siguiente paso del proceso.
            </span>
        </p>
    </li>
</ul>

<div class="flex gap-2 items-start">
    <Info size={50} />
    <p class="text-balance">
        Una vez <strong>aprobado</strong> el plan de tesis, podrá
        <em>proseguir</em>
        con los pasos siguientes del trámite. Si se
        <strong>solicitan correcciones</strong>, el tesista recibirá la
        notificación correspondiente y el proceso continuará cuando se envíe la
        versión corregida.
    </p>
</div>
