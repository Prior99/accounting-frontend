import * as React from "react";
import * as routes from "routing";
import { requireLogin } from "..";
import { createRenderer, ShallowRenderer } from "react-test-renderer/shallow";
import { ApiStore } from "store";
import { Provider } from "mobx-react";

class SomeComponent extends React.PureComponent<{}> {
    public render() {
        return (
            <div>Some Component</div>
        );
    }
}

let DecoratedComponent: React.ComponentClass<{}>;
let renderer: ShallowRenderer;

beforeEach(() => {
    renderer = createRenderer();
    DecoratedComponent = requireLogin(SomeComponent);
});

test("`requireLogin()` redirects to the `login()` route if not logged in", () => {
    const current = renderer.render(<DecoratedComponent />);
    expect(current).toMatchSnapshot();
});

test("`requireLogin()` does not redirect if logged in", () => {
    tsdi.get(ApiStore).authToken = "some-auth-token";
    const current = renderer.render(<DecoratedComponent />);
    expect(current).toMatchSnapshot();
});
