import { observable, computed, action } from "mobx";
import { api } from "./api";
import { bind } from "bind-decorator";
import { browserHistory } from "browser-history";
import { routeDashboard } from "routing";
import { RequestStatus } from "request-status";

const softwareVersion = 1;
const localStorageIdentifier = "accounting-software-login";

interface LocalStorageLogin {
    storageVersion: number;
    date: string;
    authToken: string;
}

export class LoginStore {
    @observable public authToken: string;
    @observable public status = RequestStatus.PENDING;

    constructor() {
        this.load();
    }

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @bind
    @action
    public async onLogin(email: string, password: string) {
        this.status = RequestStatus.IN_PROGRESS;
        const { data, okay } = await api("/auth/login", { email, password }, "POST", true);
        if (okay && data.token) {
            this.authToken = data.token;
            this.save();
            browserHistory.replace(routeDashboard());
            this.status = RequestStatus.SUCCESS;
        } else {
            this.status = RequestStatus.FAIL;
        }
    }

    @bind
    public save() {
        const deserialized: LocalStorageLogin = {
            storageVersion: softwareVersion,
            date: new Date().toString(),
            authToken: this.authToken,
        };
        const serialized = JSON.stringify(deserialized);
        localStorage.setItem(localStorageIdentifier, serialized);
    }

    @bind
    public clearStorage() {
        localStorage.removeItem(localStorageIdentifier);
    }

    @bind
    public load() {
        const serialized = localStorage.getItem(localStorageIdentifier);
        if (serialized === null) { // tslint:disable-line
            return;
        }
        let deserialized: LocalStorageLogin;
        try {
            deserialized = JSON.parse(serialized);
        } catch (err) {
            this.clearStorage();
            return;
        }
        if (deserialized.storageVersion !== softwareVersion) {
            this.clearStorage();
            return;
        }
        this.authToken = deserialized.authToken;
        browserHistory.replace(routeDashboard());
    }
}
