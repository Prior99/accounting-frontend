import * as React from "react";
import { AppContainer } from "..";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

const someVersion = "v0.0.0";
(window as any)["ACCOUNTING_SOFTWARE_VERSION"] = someVersion;

test("The `AppContainer` component is rendered as expected", () => {
    const mounted = mount(<AppContainer><p>Some Children</p></AppContainer>);
    expect(toJson(mounted)).toMatchSnapshot();
});
