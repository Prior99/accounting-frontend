import { observable, computed, action } from "mobx";
import { api } from "./api";
import { bind } from "bind-decorator";
import { store } from ".";
import { RequestStatus } from "request-status";

export class SignupStore {
    @observable public status = RequestStatus.PENDING;

    @bind
    @action
    public async onSignup(email: string, password: string) {
        this.status = RequestStatus.IN_PROGRESS;
        const result = await api("/auth/register", { email, password }, "POST", true);
        const { data } = result;
        if (result.okay) {
            await store.login.onLogin(email, password);
            this.status = store.login.status;
        } else {
            this.status = RequestStatus.FAIL;
        }
    }
}
