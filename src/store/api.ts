import { store } from ".";

declare var baseUrl: string;

type HTTPMethod = "DELETE" | "GET" | "PUT" | "POST";

export async function api(url: string, body?: any, method: HTTPMethod = "GET", noError = false): Promise<any> {
    const headers = new Headers();
    if (store.login.loggedIn) {
        headers.append("authorization", store.login.authToken);
    }
    headers.append("content-type", "application/json");
    const fullUrl = `${window.location.protocol}//${baseUrl}${url}`;
    try {
        const response = await fetch(fullUrl, {
            method,
            headers,
            body: JSON.stringify(body),
        });
        const data = await response.json();
        const okay = response.status >= 200 && response.status <= 299;
        if (!okay) {
            if (!noError) {
                store.error.apiError(`Fetching from url "${fullUrl}" resulted in error: "${data.message}"`);
            }
            return { okay };
        }
        return { okay, data };
    } catch (err) {
        store.error.apiError(`Failed to fetch from url "${fullUrl}".`, err);
        return { okay: false };
    }
}
