import "mocks/base-url";

import "isomorphic-fetch";
import { store, resetStore } from "store";
import * as fetchMock from "fetch-mock";
import { observable } from "mobx";
import * as HTTP from "http-status-codes";
import { RequestStatus } from "request-status";
import { browserHistory } from "browser-history";

afterEach(() => {
    fetchMock.restore();
    localStorage.clear();
    resetStore();
});

const someEmail = "user@example.com";
const somePassword = "somepassword";
const someAuthToken = "some-auth-token";

test("The `LoginStore` has `loggedIn` `true` when an `authToken` is present", () => {
    store.login.authToken = someAuthToken;
    expect(store.login.loggedIn).toBe(true);
});

test("The `LoginStore` has `loggedIn` `true` after performing a successfull login", async () => {
    fetchMock.mock(`about://example.com/auth/login`, {
        status: HTTP.OK,
        body: JSON.stringify({
            token: someAuthToken
        }),
    });
    browserHistory.replace = jest.fn();

    expect(store.login.status).toBe(RequestStatus.PENDING);
    await store.login.onLogin(someEmail, somePassword);
    expect(store.login.status).toBe(RequestStatus.SUCCESS);
    expect(store.login.loggedIn).toBe(true);
    expect(store.login.authToken).toBe(someAuthToken);
    // `localStorage` is getting updated.
    expect(localStorage["accounting-software-login"]).toMatchSnapshot();
    // Redirect to `/login`.
    expect(browserHistory.replace).toHaveBeenCalled();
});

test("The `LoginStore` has `status` `FAIL` after performing a failed login", async () => {
    expect(store.login.status).toBe(RequestStatus.PENDING);
    await store.login.onLogin(someEmail, somePassword);
    expect(store.login.status).toBe(RequestStatus.FAIL);
    expect(store.login.loggedIn).toBe(false);
});

test("The `LoginStore` loads the `localStorage`", () => {
    const someDateString = new Date().toString();
    localStorage.setItem("accounting-software-login", JSON.stringify({
        date: someDateString,
        storageVersion: 1,
        authToken: someAuthToken,
    }));
    resetStore();
    expect(store.login.authToken).toBe(someAuthToken);
});

test("The `LoginStore` doesn't load a `localStorage` with an invalid version", () => {
    const someDateString = new Date().toString();
    localStorage.setItem("accounting-software-login", JSON.stringify({
        date: someDateString,
        storageVersion: -90,
        authToken: someAuthToken,
    }));
    resetStore();
    expect(store.login.authToken).toBeUndefined();
    expect(localStorage.getItem("accounting-software-login")).toBeUndefined();
});

test("The `LoginStore` doesn't load a corrupted `localStorage`", () => {
    const someDateString = new Date().toString();
    localStorage.setItem("accounting-software-login", JSON.stringify({
        date: someDateString,
        storageVersion: 1,
        authToken: someAuthToken,
    }).substr(0, 10));
    resetStore();
    expect(store.login.authToken).toBeUndefined();
    expect(localStorage.getItem("accounting-software-login")).toBeUndefined();
});
