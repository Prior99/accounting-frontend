import "mocks/react-router-dom";
import "mocks/react-i18next";

import * as React from "react";
import { StrippedPageSignup, mapStoreToProps } from "..";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { store, resetStore } from "store";

beforeEach(() => {
    resetStore();
});

test("`PageSignup` is rendered correctly initially", () => {
    const mounted = mount(<StrippedPageSignup failed={false} onSignup={jest.fn()} />);
    expect(toJson(mounted)).toMatchSnapshot();
    expect(mounted.find("button").props()["disabled"]).toBe(true);
});

test("`PageSignup` is rendered correctly with all fields filled out", () => {
    const mounted = mount(<StrippedPageSignup failed={false} onSignup={jest.fn()} />);
    mounted.find("input[placeholder='email']").simulate("change", { target: { value: "test@example.com" }});
    mounted.find("input[placeholder='password']").simulate("change", { target: { value: "abcdefgh" }});
    mounted.find("input[placeholder='repeat']").simulate("change", { target: { value: "abcdefgh" }});
    expect(toJson(mounted)).toMatchSnapshot();
    expect(mounted.find("Button").props()["disabled"]).toBe(false);
});

test("`mapStoreToProps()` returns the expected properties", () => {
    const props = mapStoreToProps(store);
    expect(props).toEqual({});
});
