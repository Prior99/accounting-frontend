import * as React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { RequestStatus } from "request-status";
import { Errors } from "..";
import { Provider } from "mobx-react";
import { ApiStore } from "store";

test("\`Errors\` is rendered correctly with a network error", () => {
    tsdi.get(ApiStore).errors.push({ message: "some.message" });
    const mounted = mount(<Errors />);
    expect(toJson(mounted)).toMatchSnapshot();
});

test("\`Errors\` is renders nothing without an error", () => {
    const mounted = mount(<Errors />);
    expect(toJson(mounted)).toMatchSnapshot();
});
