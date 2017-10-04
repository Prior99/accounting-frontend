import * as React from "react";
import { RequestStatus } from "request-status";
import { Message, Icon } from "semantic-ui-react";

type Props = {
    readonly status: RequestStatus;
    readonly successHeadline?: string;
    readonly successContent?: string;
    readonly failHeadline?: string;
    readonly failContent?: string;
    readonly inProgressHeadline?: string;
    readonly inProgressContent?: string;
};

export class StatusMessage extends React.Component<Props, undefined> {
    public render() {
        const {
            status,
            successHeadline,
            successContent,
            failHeadline,
            failContent,
            inProgressHeadline,
            inProgressContent,
        } = this.props;
        switch (status) {
            case RequestStatus.SUCCESS:
                return (
                    <Message
                        success
                        icon="checkmark"
                        header={successHeadline}
                        content={successContent}
                    />
                );
            case RequestStatus.FAIL:
                return (
                    <Message
                        warning
                        icon="warning sign"
                        header={failHeadline}
                        content={failContent}
                    />
                );
            case RequestStatus.IN_PROGRESS:
                return (
                    <Message success icon>
                        <Icon name="circle notched" loading />
                        <Message.Content>
                            {
                                typeof inProgressHeadline === "undefined" &&
                                <Message.Header>
                                    {inProgressHeadline}
                                </Message.Header>
                            }
                            {inProgressContent}
                        </Message.Content>
                    </Message>
                );
            default:
                return null; // tslint:disable-line
        }
    }
}
