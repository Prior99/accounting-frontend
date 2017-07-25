import * as React from "react";
import { mapStoreToProps, StrippedErrors } from "..";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { DisplayableError, store, resetStore } from "store";

const someError: DisplayableError = { dismissed: false, message: "some message", origin: "api" };

beforeEach(() => {
    resetStore();
});

test("The `Errors` component is not rendered if no error is currently active", () => {
    const mounted = mount(<StrippedErrors onDismiss={jest.fn()} />);
    expect(toJson(mounted)).toMatchSnapshot();
});

test("The `Errors` component renders the current error", () => {
    const mounted = mount(<StrippedErrors error={someError} onDismiss={jest.fn()} />);
    expect(toJson(mounted)).toMatchSnapshot();
});

test("`mapStoreToProps` infers an `DisplayableError` if present", () => {
    store.error.apiError("some message");
    const result = mapStoreToProps(store);
    expect(result).toMatchSnapshot();
});
