import * as React from "react";
import { observer } from "mobx-react";

@observer
export class PageLogin extends React.Component<{}, undefined> {
    public render() {
        return (
            <div>
                <h1>Login</h1>
            </div>
        );
    }
}
