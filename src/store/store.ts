import { ApiStore } from "./api";
import { History } from "history";

export class Store {
    protected api: ApiStore;
    protected browserHistory: History;

    constructor(api: ApiStore, browserHistory: History) {
        this.api = api;
        this.browserHistory = browserHistory;
    }
}
