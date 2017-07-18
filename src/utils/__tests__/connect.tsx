import * as React from "react";
import { connect } from "..";
import { store, Store, resetStore } from "../../store";
import { create } from "react-test-renderer";

function mapStoreToProps(argStore: Store) {
    return {
        username: argStore.login.username,
    };
}

beforeEach(() => {
    resetStore();
    store.login.username = "connected";
});

test("`connect()` connects the `Store` to a normal component", () => {
    class UnconnectedComponent extends React.Component<{ username: string }, undefined> {
        public render() {
            return (
                <div>{this.props.username}</div>
            );
        }
    }

    const ConnectedComponent = connect(UnconnectedComponent, mapStoreToProps);
    expect(create(<ConnectedComponent />)).toMatchSnapshot();
    expect(create(<UnconnectedComponent username="unconnected" />)).toMatchSnapshot();
});

test("`connect()` connects the `Store` to a stateless component", () => {
    function UnconnectedComponent ({ username }: { username: string }) {
        return (
            <div>{username}</div>
        );
    }

    const ConnectedComponent = connect(UnconnectedComponent, mapStoreToProps);
    expect(create(<ConnectedComponent />)).toMatchSnapshot();
    expect(create(<UnconnectedComponent username="unconnected" />)).toMatchSnapshot();
});
