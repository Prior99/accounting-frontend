import * as React from "react";
import { requireLogin } from "utils";

@requireLogin
export class PageDashboard extends React.PureComponent<{}> {
    public render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}
