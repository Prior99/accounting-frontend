import * as React from "react";
import { translate, InjectedTranslateProps } from "react-i18next";
import { RequestStatus } from "request-status";
import { Message } from "semantic-ui-react";

@translate(["login", "common"])
export class StatusMessage extends React.Component<{ status: RequestStatus } & InjectedTranslateProps, undefined> {
    public render() {
        const { status, t } = this.props;
        switch (status) {
            case RequestStatus.FAIL:
                return (
                    <Message
                        warning
                        icon="warning sign"
                        header={t("loginFailed.headline")}
                        content={t("loginFailed.content")}
                    />
                );
            default:
                return null; // tslint:disable-line
        }
    }
}
