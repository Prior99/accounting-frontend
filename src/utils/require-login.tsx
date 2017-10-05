import * as React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { ApiStore } from "store";
import * as routes from "routing";
import { inject, external } from "tsdi";

type ReactComponent<P> = React.StatelessComponent<P> | React.ComponentClass<P>;

export function requireLogin<P, R extends React.ComponentClass<P | void>>(component: R): R {
    @observer @external
    class RequireLogin extends React.Component<P, undefined> {
        @inject private api: ApiStore;

        public render() {
            if (!this.api.loggedIn) {
                return (
                    <Redirect to={routes.login()} />
                );
            }
            return React.createElement(component as any, this.props);
        }
    }
    return RequireLogin as any;
}
