import * as React from "react";

jest.mock("react-router-dom", () => ({
    Link: ({ to, children }: { to: string, children: JSX.Element }) => (<a href={to}>{children}</a>),
}));
