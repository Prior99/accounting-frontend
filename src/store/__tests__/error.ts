import { ErrorStore } from "..";
import { observable } from "mobx";

let store: ErrorStore;
beforeEach(() => store = new ErrorStore());

describe("`apiError()`", () => {
    test("appends a new error to the list of errors with origin `api`", () => {
        const nativeError = new Error();
        store.apiError("Some error");
        store.apiError("Another error", nativeError);
        expect(store.errors).toEqual(observable([
            { dismissed: false, message: "Some error", origin: "api", error: undefined },
            { dismissed: false, message: "Another error", origin: "api", error: nativeError }
        ]));
    });
});

describe("`current`", () => {
    test("returns `undefined` if no error has occured", () => {
        expect(store.current).toBeUndefined();
    });

    test("returns `undefined` if all errors are dismissed", () => {
        store.apiError("Some error");
        store.apiError("Another error");
        store.errors.forEach(error => error.dismissed = true);
        expect(store.current).toBeUndefined();
    });

    test("returns the first non-dismissed error", () => {
        store.apiError("Some error");
        store.apiError("Another error");
        expect(store.current).toEqual({
            dismissed: false, message: "Some error", origin: "api", error: undefined
        });
    });
});

describe("`internalError()`", () => {
    test("appends a new error to the list of errors with origin `internal`", () => {
        const nativeError = new Error();
        store.internalError("Some error");
        store.internalError("Another error", nativeError);
        expect(store.errors).toEqual(observable([
            { dismissed: false, message: "Some error", origin: "internal", error: undefined },
            { dismissed: false, message: "Another error", origin: "internal", error: nativeError }
        ]));
    });
});

describe("`dismissCurrent()`", () => {
    test("sets the `dismissed` flag of the current error to `true`", () => {
        store.apiError("Some error");
        store.dismissCurrent();
        expect(store.errors).toEqual(observable([
            { dismissed: true, message: "Some error", origin: "api", error: undefined },
        ]))
    });

    test("handles too many calls gracefully", () => {
        store.apiError("Some error");
        store.dismissCurrent();
        store.dismissCurrent();
    });
});
