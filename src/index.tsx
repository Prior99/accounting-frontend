import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { App } from "./app";
import { isProductionEnvironment } from "./utils/environment";
import "semantic-ui-css/semantic.css";
import "./style.scss";

import { store } from "./store";

async function main() {
    ReactDOM.render(
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            {!isProductionEnvironment() && <DevTools />}
        </div>,
        document.getElementById("root"),
    );
}

main();
