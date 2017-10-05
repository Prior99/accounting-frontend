import { observable, computed, action } from "mobx";
import { bind } from "bind-decorator";
import * as Api from "../../generated/api/api";
import * as isomorphicFetch from "isomorphic-fetch";
import { RequestStatus } from "../request-status";
import { History } from "history";
import * as routes from "../routing";
import { Store } from "./store";

declare var baseUrl: string;
const prefixedBaseUrl = `${window.location.protocol}//${baseUrl}`;

const softwareVersion = 1;
const localStorageIdentifier = "accounting-software-login";

interface LocalStorageApi {
    storageVersion: number;
    date: string;
    authToken: string;
}

interface ApiError {
    message: string;
}

interface Requests {
    [key: string]: {
        error?: ApiError;
        requestStatus: RequestStatus;
    };
}

export class ApiStore extends Store {
    @observable public authToken: string;
    @observable public requests: Requests = {};
    @observable public errors: ApiError[] = [];

    public auth = new Api.AuthApi(this.wrappedFetch, prefixedBaseUrl);
    public info = new Api.InfoApi(this.wrappedFetch, prefixedBaseUrl);
    public login = new Api.LoginApi(this.wrappedFetch, prefixedBaseUrl);
    public member = new Api.MemberApi(this.wrappedFetch, prefixedBaseUrl);
    public registration = new Api.RegistrationApi(this.wrappedFetch, prefixedBaseUrl);
    public teams = new Api.TeamsApi(this.wrappedFetch, prefixedBaseUrl);
    public timer = new Api.TimerApi(this.wrappedFetch, prefixedBaseUrl);
    public user = new Api.UserApi(this.wrappedFetch, prefixedBaseUrl);

    constructor(browserHistory: History) {
        super(undefined, browserHistory);
        this.load();
    }

    @computed
    public get loggedIn() {
        return typeof this.authToken !== "undefined";
    }

    @bind
    private wrappedFetch(url: string, options: any) {
        const headers = options.headers || new Headers();
        if (this.loggedIn) {
            headers.append("authorization", this.authToken);
        }
        return isomorphicFetch(url, { ...options, headers });
    }

    @bind @action
    public async call<T>(identifier: string, request: () => Promise<T>): Promise<T> {
        try {
            this.requests[identifier] = { requestStatus: RequestStatus.IN_PROGRESS };
            const response = await request();
            this.requests[identifier] = { requestStatus: RequestStatus.SUCCESS };
            return response;
        } catch (error) {
            this.requests[identifier] = { requestStatus: RequestStatus.FAIL, error };
            this.errors.push(error);
            throw error;
        }
    }

    @bind @action
    public async doLogin(email: string, password: string) {
        const body = { email, password };
        const response = await this.call("doLogin", () => this.login.v1AuthLoginPost({ body }));
        if (response) {
            const { token } = response;
            this.authToken = token;
            this.save();
            this.browserHistory.replace(routes.dashboard());
        }
    }

    @bind
    private save() {
        const deserialized: LocalStorageApi = {
            storageVersion: softwareVersion,
            date: new Date().toString(),
            authToken: this.authToken,
        };
        const serialized = JSON.stringify(deserialized);
        localStorage.setItem(localStorageIdentifier, serialized);
    }

    @bind
    private clearStorage() {
        localStorage.removeItem(localStorageIdentifier);
    }

    @bind
    private load() {
        const serialized = localStorage.getItem(localStorageIdentifier);
        if (serialized === null) { // tslint:disable-line
            return;
        }
        let deserialized: LocalStorageApi;
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
        this.browserHistory.replace(routes.dashboard());
    }

    public getRequestStatus(identifier: string): RequestStatus {
        const request = this.requests[identifier];
        if (typeof request === "undefined") {
            return RequestStatus.NONE;
        }
        return request.requestStatus;
    }

    public getError(identifier: string): ApiError {
        const request = this.requests[identifier];
        if (typeof request === "undefined") {
            return undefined;
        }
        return request.error;
    }

    @bind @action
    public doDismiss() {
        this.errors.pop();
    }

    @computed
    public get latestError() {
        return this.errors[this.errors.length - 1];
    }
}
