import * as React from "react";
import { observer } from "mobx-react";
import * as style from "./style.scss";

declare var ACCOUNTING_SOFTWARE_VERSION: string;

@observer
export class AppContainer extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                {this.props.children}
                <div className={style.version}>Version {ACCOUNTING_SOFTWARE_VERSION}</div>
            </div>
        );
    }
}
