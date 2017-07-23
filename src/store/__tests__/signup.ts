import "isomorphic-fetch";
import { store, resetStore } from "store";
import * as fetchMock from "fetch-mock";
import { observable } from "mobx";
import * as HTTP from "http-status-codes";
import "mocks/base-url";
import { RequestStatus } from "request-status";
import { browserHistory } from "browser-history";

afterEach(() => {
    resetStore();
    fetchMock.restore();
});

const someEmail = "user@example.com";
const somePassword = "somepassword";
const someAuthToken = "some-auth-token";

test("The `SignupStore` has `status` `SUCCESS` after performing a successfull signup", async () => {
    fetchMock.mock(`about://example.com/auth/register`, {
        status: HTTP.OK,
        body: JSON.stringify({}),
    });
    fetchMock.mock(`about://example.com/auth/login`, {
        status: HTTP.OK,
        body: JSON.stringify({ token: someAuthToken }),
    });
    browserHistory.replace = jest.fn();

    expect(store.signup.status).toBe(RequestStatus.PENDING);
    await store.signup.onSignup(someEmail, somePassword);
    expect(store.signup.status).toBe(RequestStatus.SUCCESS);
    // Redirect to `/login`.
    expect(browserHistory.replace).toHaveBeenCalled();
});

test("The `SignupStore` has `status` `FAIL` after performing a failed signup", async () => {
    expect(store.signup.status).toBe(RequestStatus.PENDING);
    await store.signup.onSignup(someEmail, somePassword);
    expect(store.signup.status).toBe(RequestStatus.FAIL);
});
