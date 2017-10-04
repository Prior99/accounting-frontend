import { observable, computed, action } from "mobx";
import { bind } from "bind-decorator";
import { ApiStore } from ".";
import { History } from "history";
import { Store } from "./store";

export class SignupStore extends Store {
    @observable
    public signupResult: Boolean;

    @bind @action
    public async doSignup(email: string, password: string) {
        const body = { email, password };
        const response = await this.api.call("doSignup", () => this.api.registration.v1AuthRegisterPost({ body }));
        if (response) {
            await this.api.doLogin(email, password);
            this.signupResult = true;
        } else {
            this.signupResult = false;
        }
    }
}
