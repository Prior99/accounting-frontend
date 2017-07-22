import { observable, computed, action } from "mobx";
import { api } from "./api";
import { bind } from "bind-decorator";

interface LoginResult {
    readonly authToken?: string;
}

export class LoginStore {

    @observable public authToken: string;
    @observable public failed = false;

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @bind
    @action
    public async login(email: string, password: string) {
        const result = await api("/login", { email, password });
        const { data } = result;
        if (result.okay && data.auth_token) {
            this.authToken = data.auth_token;
        } else {
            this.failed = true;
        }
    }
}
