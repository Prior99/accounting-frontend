import * as React from "react";
import { AppContainer } from "./ui/app-container";
import { PageLogin, PageDashboard } from "./pages";
import { Route } from "react-router-dom";

export function App() {
    return (
        <AppContainer>
            <Route path="/dashboard" component={PageDashboard} />
            <Route path="/login" component={PageLogin} />
        </AppContainer>
    );
}
