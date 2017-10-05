import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import DevTools from "mobx-react-devtools";
import "semantic-ui-css/semantic.css";
import "style.scss";
import "factories";
import "store";
import { i18n } from "i18n";
import { TSDI, component, factory } from "tsdi";
import { I18nextProvider } from "react-i18next";
import { History } from "history";
import { isProductionEnvironment } from "utils/environment";
import { App } from "app";

function main() {
    const tsdi: TSDI = new TSDI();
    tsdi.enableComponentScanner();

    ReactDOM.render(
        <div>
            <I18nextProvider i18n={i18n}>
                <Router history={tsdi.get("history")}>
                    <App />
                </Router>
            </I18nextProvider>
            {!isProductionEnvironment() && <DevTools />}
        </div>,
        document.getElementById("root"),
    );
}

main();
