import { observable, computed, action } from "mobx";
import { api } from "./api";
import { bind } from "bind-decorator";

export class LoginStore {
    @observable public authToken: string;
    @observable public failed = false;

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @bind
    @action
    public async onLogin(email: string, password: string) {
        const result = await api("/auth/login", { email, password }, "POST", true);
        const { data } = result;
        if (result.okay && data.auth_token) {
            this.authToken = data.auth_token;
        } else {
            this.failed = true;
        }
    }
}
