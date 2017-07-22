import "isomorphic-fetch";
import { store, resetStore } from "store";
import * as fetchMock from "fetch-mock";
import { observable } from "mobx";
import * as HTTP from "http-status-codes";
import "mocks/base-url";

afterEach(() => {
    resetStore();
    fetchMock.restore();
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
            data: { auth_token: someAuthToken }
        })
    });
    await store.login.onLogin(someEmail, somePassword);
    expect(store.login.loggedIn).toBe(true);
    expect(store.login.authToken).toBe(someAuthToken);
});

test("The `LoginStore` has `failure` `true` after performing a failed login", async () => {
    await store.login.onLogin(someEmail, somePassword);
    expect(store.login.loggedIn).toBe(false);
    expect(store.login.failed).toBe(true);
});
