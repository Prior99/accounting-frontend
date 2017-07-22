import "mocks/react-router-dom";
import "mocks/react-i18next";

import * as React from "react";
import { StrippedPageLogin, mapStoreToProps } from "..";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { store, resetStore } from "store";

beforeEach(() => {
    resetStore();
});

test("`PageLogin` is rendered correctly initially", () => {
    const mounted = mount(<StrippedPageLogin />);
    expect(toJson(mounted)).toMatchSnapshot();
    expect(mounted.find("button").props()["disabled"]).toBe(true);
});

test("`PageLogin` is rendered correctly with all fields filled out", () => {
    const mounted = mount(<StrippedPageLogin />);
    mounted.find("input[placeholder='email']").simulate("change", { target: { value: "test@example.com" }});
    mounted.find("input[placeholder='password']").simulate("change", { target: { value: "abcdefgh" }});
    expect(toJson(mounted)).toMatchSnapshot();
    expect(mounted.find("Button").props()["disabled"]).toBe(false);
});

test("`mapStoreToProps()` returns the expected properties", () => {
    const props = mapStoreToProps(store);
    expect(props).toEqual({});
});