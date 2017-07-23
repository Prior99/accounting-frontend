import * as React from "react";
import { translate, InjectedTranslateProps } from "react-i18next";
import { RequestStatus } from "request-status";
import { Message, Icon } from "semantic-ui-react";

@translate(["login", "common"])
export class StatusMessage extends React.Component<{ status: RequestStatus } & InjectedTranslateProps, undefined> {
    public render() {
        const { status, t } = this.props;
        switch (status) {
            case RequestStatus.SUCCESS:
                return (
                    <Message
                        success
                        icon="checkmark"
                        header={t("signupSuccess.headline")}
                        content={t("signupSuccess.content")}
                    />
                );
            case RequestStatus.FAIL:
                return (
                    <Message
                        warning
                        icon="warning sign"
                        header={t("signupFailed.headline")}
                        content={t("signupFailed.content")}
                    />
                );
            case RequestStatus.IN_PROGRESS:
                return (
                    <Message success icon>
                        <Icon name="circle notched" loading />
                        <Message.Content>
                            <Message.Header>
                                {t("inProgress.headline")}
                            </Message.Header>
                            {t("inProgress.content")}
                        </Message.Content>
                    </Message>
                );
            default:
                return null; // tslint:disable-line
        }
    }
}
