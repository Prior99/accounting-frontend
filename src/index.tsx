import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { App } from "app";
import { isProductionEnvironment } from "utils/environment";
import "semantic-ui-css/semantic.css";
import "style.scss";
import { i18n } from "i18n";
import { I18nextProvider } from "react-i18next";

import { store } from "./store";

async function main() {
    ReactDOM.render(
        <div>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
            {!isProductionEnvironment() && <DevTools />}
        </div>,
        document.getElementById("root"),
    );
}

main();
