import * as React from "react";
import { connect } from "..";
import { store, Store, resetStore } from "store";
import { create } from "react-test-renderer";

function mapStoreToProps(argStore: Store) {
    return {
        authToken: argStore.login.authToken,
    };
}

beforeEach(() => {
    resetStore();
    store.login.authToken = "connected";
});

test("`connect()` connects the `Store` to a normal component", () => {
    class UnconnectedComponent extends React.Component<{ authToken: string }, undefined> {
        public render() {
            return (
                <div>{this.props.authToken}</div>
            );
        }
    }

    const ConnectedComponent = connect(UnconnectedComponent, mapStoreToProps);
    expect(create(<ConnectedComponent />)).toMatchSnapshot();
    expect(create(<UnconnectedComponent authToken="unconnected" />)).toMatchSnapshot();
});

test("`connect()` connects the `Store` to a stateless component", () => {
    function UnconnectedComponent ({ authToken }: { authToken: string }) {
        return (
            <div>{authToken}</div>
        );
    }

    const ConnectedComponent = connect(UnconnectedComponent, mapStoreToProps);
    expect(create(<ConnectedComponent />)).toMatchSnapshot();
    expect(create(<UnconnectedComponent authToken="unconnected" />)).toMatchSnapshot();
});
