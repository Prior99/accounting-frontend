import "isomorphic-fetch";
import * as HTTP from "http-status-codes";
import * as fetchMock from "fetch-mock";
import { store, resetStore } from "store";
import { observable } from "mobx";
import { api } from "../api";
import "mocks/base-url";

afterEach(() => {
    fetchMock.restore();
    resetStore();
});

const someUrl = "/some/url";
const someAuthToken = "some-auth-token";
const someData = {
    someKey: "some value"
};
const someBody = {
    someOtherKey: "some value",
    someNumber: 8.0
};
const someMessage = "Some error message";
const someBrokenUrl = "somebrokenurl";
const mockUrl = `about://example.com${someUrl}`;

test("The `api()` utility calls routes with the correct parameters and returns a correct result", async () => {
    store.login.authToken = someAuthToken;
    fetchMock.mock(mockUrl, {
        status: HTTP.OK,
        body: JSON.stringify({
            data: someData
        })
    });
    const result = await api(someUrl, someBody, "POST");
    const call = fetchMock.lastCall(mockUrl)[1];
    expect(result).toEqual({
        okay: true,
        data: someData
    });
    expect(call.headers._headers).toEqual({
        "authorization": [ someAuthToken ],
        "content-type": [ "application/json"]
    });
    expect(call.method).toEqual("POST");
    expect((call as any).body).toEqual(JSON.stringify(someBody));
});

test("The `api()` handles non-2xx status responses gracefully", async () => {
    store.login.authToken = someAuthToken;
    const route = fetchMock.mock(mockUrl, {
        status: HTTP.BAD_GATEWAY,
        body: JSON.stringify({
            message: someMessage
        })
    });
    const result = await api(someUrl, someBody, "GET");
    expect(result).toEqual({
        okay: false
    });
    expect(store.error.errors).toEqual(observable([
        {
            dismissed: false,
            message: `Fetching from url "about://example.com/some/url" resulted in error: "Some error message"`,
            origin: "api",
            error: undefined
        }
    ]));
});

test("The `api()` fetching failures gracefully", async () => {
    store.login.authToken = someAuthToken;
    const result = await api(someBrokenUrl, someBody, "GET");
    expect(result).toEqual({
        okay: false
    });
    expect(store.error.errors[0].message).toEqual(`Failed to fetch from url "about://example.comsomebrokenurl".`);
});
