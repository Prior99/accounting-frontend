import * as React from "react";

jest.mock("react-i18next", () => ({
    translate: (namespaces?: string[], options?: any) => <C extends Function>(WrappedComponent: C) => {
        class Translated extends React.Component<{}, undefined> {
            public render() {
                const props = Object.assign({}, this.props, {
                    t: (name: string) => name,
                });
                return React.createElement(WrappedComponent as any, props);
            }
        }
        return Translated;
    },
}));
