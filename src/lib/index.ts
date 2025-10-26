// place files you want to import through the `$lib` alias in this folder.
export function toSnake(str: string): string {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function decamelize<T>(obj: T): any {
    if (Array.isArray(obj)) {
        return obj.map((item) => decamelize(item));
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [toSnake(k), decamelize(v)])
        );
    }
    return obj;
}

export function formatDateToISO(iso: string): string {
    if (iso.trim() === '') return ''
    const date = new Date(iso);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    let formatted = new Intl.DateTimeFormat("es-ES", options).format(date);

    // Normalizar AM/PM
    formatted = formatted.replace("a. m.", "am").replace("p. m.", "pm");

    // Quitar puntos de abreviaturas y poner mayúscula en mes
    formatted = formatted.replace(/\b(\p{L})/u, (m) => m.toUpperCase());
    formatted = formatted.replace(".", "");

    return formatted;
}
