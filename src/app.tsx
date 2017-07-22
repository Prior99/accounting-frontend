import * as React from "react";
import { AppContainer } from "ui/app-container";
import { PageLogin, PageDashboard, PageSignup } from "pages";
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
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={PageLogin} />
                <Route path="/signup" component={PageSignup} />
                <Route component={Container} />
            </Switch>
        </AppContainer>
    );
}
