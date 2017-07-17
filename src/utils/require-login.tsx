import * as React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { store } from "../store";
import { routeLogin } from "../routing";

export function requireLogin<Props>(
        component: React.ComponentClass<Props> | React.StatelessComponent<Props>): React.ComponentClass<Props> {
    @observer
    class RequireLogin extends React.Component<Props, undefined> {
        public render() {
            if (!store.login.loggedIn) {
                return (
                    <Redirect to={routeLogin()} />
                );
            }
            return React.createElement(component as any, this.props);
        }
    }
    return RequireLogin;
}
