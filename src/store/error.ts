import { observable, computed, action } from "mobx";

export interface DisplayableError {
    dismissed: boolean;
    message: string;
    origin: "api" | "internal";
    error?: Error;
}

export class ErrorStore {
    constructor() {
        this.apiError = this.apiError.bind(this);
        this.internalError = this.internalError.bind(this);
        this.dismissCurrent = this.dismissCurrent.bind(this);
    }

    @observable public errors: DisplayableError[] = [];

    @computed public get current() {
        return this.errors.find(error => !error.dismissed);
    }

    @action
    public dismissCurrent() {
        if (typeof this.current === "undefined") {
            return;
        }
        this.current.dismissed = true;
    }

    @action
    public apiError(message: string, error?: Error) {
        this.errors.push({ dismissed: false, message, origin: "api", error });
    }

    @action
    public internalError(message: string, error?: Error) {
        this.errors.push({ dismissed: false, message, origin: "internal", error });
    }
}
