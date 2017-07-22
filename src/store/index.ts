import { LoginStore } from "./login";
import { ErrorStore } from "./error";
export * from "./error";

export interface Store {
    login: LoginStore;
    error: ErrorStore;
}

export let store: Store;

export function createStore(): Store {
    return {
        login: new LoginStore(),
        error: new ErrorStore(),
    };
}

export function resetStore() {
    store = createStore();
}

resetStore();

if (typeof window !== "undefined") {
    (window as any).store = store;
    (window as any).createStore = createStore;
    (window as any).resetStore = resetStore;
}
