import { observable, computed, action } from "mobx";
import { api } from "./api";

interface LoginResult {
    readonly authToken?: string;
}

export class LoginStore {
    constructor() {
        this.login = this.login.bind(this);
    }

    @observable public username: string;
    @observable public password: string;
    @observable public authToken: string;
    @observable public failed = false;

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @action
    public async login() {
        const result: LoginResult = await api("/login", {
            username: this.username,
            password: this.password,
        });
        if (result) {
            this.authToken = result.authToken;
        } else {
            this.failed = true;
        }
    }
}
