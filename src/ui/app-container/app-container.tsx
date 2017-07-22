import * as React from "react";
import * as style from "./style.scss";
import { Errors } from "ui/errors";

declare var ACCOUNTING_SOFTWARE_VERSION: string;

export class AppContainer extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <Errors />
                {this.props.children}
                <div className={style.version}>{ACCOUNTING_SOFTWARE_VERSION}</div>
            </div>
        );
    }
}
