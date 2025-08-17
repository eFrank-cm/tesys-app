<script>
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import Info from "@lucide/svelte/icons/info";
</script>

<p>
    El <strong>plan de tesis</strong> es un documento breve que describe el tema,
    objetivos, metodología y justificación de la investigación que se propone realizar.
</p>
<ul class="text-balance ml-5">
    <li class="flex items-center gap-2">
        <ChevronRight class="inline" size={17} />
        <p>
            Usa el <strong>reglamento</strong> de tu Escuela Profesional como guia
            para redactar tu plan de tesis.
        </p>
    </li>
    <li class="flex items-center gap-2">
        <ChevronRight class="inline" size={17} />
        <p>
            Esta disponible una <strong>plantilla</strong> en Overleaf que te ayudara
            a acelerar el proceso de redaccion.
        </p>
    </li>
</ul>

<div class="flex gap-2">
    <Info size={20} />
    <p>
        Luego de subir el plan de tesis, el asesor debe revisarlo y, en caso de
        encontrar observaciones, estas deberán ser absueltas antes de continuar
        con el proceso.
    </p>
</div>
