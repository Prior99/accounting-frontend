import * as React from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { ApiStore } from "store";
import * as routes from "routing";
import { omit } from "ramda";

type ReactComponent<P> = React.StatelessComponent<P> | React.ComponentClass<P>;

export function requireLogin<P, R extends React.ComponentClass<P | void>>(component: R): R {
    @inject("api")
    @observer
    class RequireLogin extends React.Component<{ api: ApiStore } & P, undefined> {
        public render() {
            if (!this.props.api.loggedIn) {
                return (
                    <Redirect to={routes.login()} />
                );
            }
            return React.createElement(component as any, omit(["api"], this.props));
        }
    }
    return RequireLogin as any;
}
