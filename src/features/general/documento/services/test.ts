
export async function test(file: File) {
    const url = 'http://127.0.0.1:8000/general/documentos/uploadfile/'
    console.log(url)

    const form = new FormData()
    form.append('file', file)
    form.append('token', 'hola')

    try {
        const res = await fetch(url, {
            method: 'POST',
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            body: form
        })

        if (!res.ok) throw new Error(`no manada> ${res.status} : ${res.statusText}`)

        const result = await res.json()
        console.log(result)

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido')

    }
}   