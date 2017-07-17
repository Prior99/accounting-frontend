import * as React from "react";
import { connect } from "../../utils";
import { Store } from "../../store";

export interface PageLoginProps {
    readonly loggedIn: boolean;
}

function mapStoreToProps(store: Store): PageLoginProps {
    const { loggedIn } = store.login;
    return { loggedIn };
}

export function StrippedPageLogin(props: PageLoginProps) {
    return (
        <div>
            <h1>Login</h1>
            {props.loggedIn}
        </div>
    );
}

export const PageLogin = connect(StrippedPageLogin, mapStoreToProps);
