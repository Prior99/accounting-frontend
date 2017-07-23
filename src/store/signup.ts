import { observable, computed, action } from "mobx";
import { api } from "./api";
import { bind } from "bind-decorator";
import { store } from ".";

export class SignupStore {
    @observable public failed = false;
    @observable public succeeded = false;

    @bind
    @action
    public async onSignup(email: string, password: string) {
        const result = await api("/auth/register", { email, password }, "POST", true);
        const { data } = result;
        if (result.okay) {
            this.succeeded = true;
            await store.login.onLogin(email, password);
        } else {
            this.failed = true;
        }
    }
}
