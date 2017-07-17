import * as React from "react";
import { connect, requireLogin } from "../../utils";
import { Store } from "../../store";

export interface PageDashboardProps {
}

function mapStoreToProps(store: Store): PageDashboardProps {
    return {};
}

export class StrippedPageDashboard extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export const PageDashboard = requireLogin(connect(StrippedPageDashboard, mapStoreToProps));
