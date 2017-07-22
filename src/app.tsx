import * as React from "react";
import { AppContainer } from "ui/app-container";
import { PageLogin, PageDashboard } from "pages";
import { Route, Switch, Redirect } from "react-router-dom";

function Container() {
    return (
        <div>
            <Route path="/dashboard" component={PageDashboard} />
        </div>
    );
}

export function App() {
    return (
        <AppContainer>
            <Redirect from="/" to="/login" />
            <Switch>
                <Route path="/login" component={PageLogin} />
                <Route component={Container} />
            </Switch>
        </AppContainer>
    );
}
