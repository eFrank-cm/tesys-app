<script lang="ts">
    let fileInput: HTMLInputElement;

    async function handleSubmit(e: Event) {
        e.preventDefault(); // evita la recarga

        const formData = new FormData();
        if (fileInput.files && fileInput.files[0]) {
            formData.append("file", fileInput.files[0]);
        }

        try {
            const res = await fetch(
                "http://127.0.0.1:8000/general/documentos/uploadfile/",
                {
                    method: "POST",
                    body: formData,
                },
            );

            const data = await res.json();
            console.log("Respuesta del backend:", data);
        } catch (err) {
            console.error("Error en subida:", err);
        }
    }
</script>

<form onsubmit={handleSubmit}>
    <input bind:this={fileInput} type="file" name="file" />
    <button type="submit">Subir archivo</button>
</form>
