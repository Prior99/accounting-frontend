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

test("The `SignupStore` has `succeeded` `true` after performing a successfull signup", async () => {
    fetchMock.mock(`about://example.com/auth/register`, {
        status: HTTP.OK,
        body: JSON.stringify({})
    });
    await store.signup.onSignup(someEmail, somePassword);
    expect(store.signup.succeeded).toBe(true);
    expect(store.signup.failed).toBe(false);
});

test("The `SignupStore` has `failure` `true` after performing a failed signup", async () => {
    await store.signup.onSignup(someEmail, somePassword);
    expect(store.signup.succeeded).toBe(false);
    expect(store.signup.failed).toBe(true);
});
