import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import { observer, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { App } from "app";
import { isProductionEnvironment } from "utils/environment";
import "semantic-ui-css/semantic.css";
import "style.scss";
import { i18n } from "i18n";
import { I18nextProvider } from "react-i18next";
import { ApiStore } from "./store/api";
import { SignupStore } from "./store";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
const api = new ApiStore(browserHistory);
const signUp = new SignupStore(api, browserHistory);

async function main() {
    ReactDOM.render(
        <div>
            <I18nextProvider i18n={i18n}>
                <Provider
                    api={api}
                    signUp={signUp}
                    browserHistory={browserHistory}
                >
                    <Router history={browserHistory}>
                        <App />
                    </Router>
                </Provider>
            </I18nextProvider>
            {!isProductionEnvironment() && <DevTools />}
        </div>,
        document.getElementById("root"),
    );
}

main();
