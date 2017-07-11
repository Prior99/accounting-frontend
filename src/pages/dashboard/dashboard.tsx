import * as React from "react";
import { observer } from "mobx-react";

@observer
export class PageDashboard extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}
