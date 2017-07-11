import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { Router, browserHistory } from "react-router";

import { PageLogin } from "./pages";
import { Store } from "./store";
import { rootRoute } from "./routing";
import { isProductionEnvironment } from "./utils/environment";
import "./style.scss";

@observer
class App extends React.Component<{}, undefined> {
    public render() {
        const { loggedIn } = Store.login;
        return (
            <div>
                <Router history={browserHistory} routes={rootRoute} />
                {!isProductionEnvironment() && <DevTools />}
            </div>
        );
     }
}

async function main() {
    ReactDOM.render(
        <App />,
        document.getElementById("root"),
    );
}

main();
