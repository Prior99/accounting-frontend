import * as React from "react";
import { routeLogin } from "routing";
import { requireLogin } from "..";
import { store, resetStore } from "store";
import { createRenderer, ShallowRenderer } from "react-test-renderer/shallow";

function SomeComponent(props: {}) {
    return (
        <div>Some Component</div>
    );
}

let DecoratedComponent: React.ComponentClass<{}>;
let renderer: ShallowRenderer;

beforeEach(() => {
    renderer = createRenderer();
    DecoratedComponent = requireLogin(SomeComponent);
    resetStore();
});

test("`requireLogin()` redirects to the `routeLogin()` route if not logged in", () => {
    store.login.authToken = undefined;
    const current = renderer.render(
        <DecoratedComponent />,
    );
    expect(current).toMatchSnapshot();
});

test("`requireLogin()` does not redirect if logged in", () => {
    store.login.authToken = "";
    const current = renderer.render(
        <DecoratedComponent />,
    );
    expect(current).toMatchSnapshot();
});
