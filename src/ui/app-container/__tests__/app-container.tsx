import * as React from "react";
import { AppContainer } from "..";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { ApiStore } from "store";
import { Provider } from "mobx-react";

const someVersion = "v0.0.0";
(window as any)["ACCOUNTING_SOFTWARE_VERSION"] = someVersion;

test("The `AppContainer` component is rendered as expected", () => {
    const apiStore = new ApiStore(undefined);
    const mounted = mount(
        <Provider api={apiStore}>
            <AppContainer><p>Some Children</p></AppContainer>
        </Provider>,
    );
    expect(toJson(mounted)).toMatchSnapshot();
});
