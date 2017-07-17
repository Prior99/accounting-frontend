import * as React from "react";
import { observer } from "mobx-react";
import { store, Store } from "../store";

export function connect<OwnProps, StoreProps>(
        component: React.ComponentClass<StoreProps & OwnProps> | React.StatelessComponent<StoreProps & OwnProps>,
        mapStoreToProps: (store: Store) => StoreProps): React.ComponentClass<OwnProps> {
    @observer
    class Connect extends React.Component<OwnProps, undefined> {
        public render() {
            const props = Object.assign({}, this.props as OwnProps, mapStoreToProps(store));
            return React.createElement(component as any, props as any);
        }
    }
    return Connect;
}
