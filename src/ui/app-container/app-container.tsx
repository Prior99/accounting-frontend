import * as React from "react";
import * as style from "./style.scss";
import { Errors } from "../errors";

declare var ACCOUNTING_SOFTWARE_VERSION: string;

export class AppContainer extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <Errors />
                {this.props.children}
                <div className={style.version}>Version {ACCOUNTING_SOFTWARE_VERSION}</div>
            </div>
        );
    }
}
