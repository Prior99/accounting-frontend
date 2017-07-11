import * as React from "react";
import { Route, Redirect, browserHistory, IndexRoute } from "react-router";

import {
    PageLogin,
    PageDashboard,
} from "../pages";
import { AppContainer } from "../ui";
import { routeLogin } from "./routes";
import { Store } from "../store";

function requireLogin() {
    if (!Store.login.loggedIn) {
        browserHistory.replace(routeLogin());
    }
}

export const rootRoute = (
    <Route component={AppContainer}>
        <Redirect from="/" to="/login" />
        <Route path="login" component={PageLogin} />
        <Route path="dashboard" component={PageDashboard} onEnter={requireLogin}/>
    </Route>
);
