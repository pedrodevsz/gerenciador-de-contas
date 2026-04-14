const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function buildUrl(endpoint: string) {
    if (!endpoint) return BASE_URL;

    const normalizedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;

    return `${BASE_URL}${normalizedEndpoint}`;
}

export async function apiFetch(
    endpoint: string,
    options?: RequestInit
) {
    const url = buildUrl(endpoint);

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    console.log("URL:", url);
    console.log("BODY:", options?.body);

    if (!response.ok) {
        let error;

        try {
            error = await response.json();
        } catch {
            error = { message: "Erro desconhecido" };
        }

        throw error;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}