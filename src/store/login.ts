import { observable, computed, action } from "mobx";

export class LoginState {
    @observable public loggedIn = false;
}
