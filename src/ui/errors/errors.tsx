import * as React from "react";
import { Modal } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { ApiStore } from "store";

type Props = { api?: ApiStore };

@inject("api")
@observer
export class Errors extends React.PureComponent<Props> {
    public render() {
        const { latestError, doDismiss } = this.props.api;
        if (!latestError) {
            return null; // tslint:disable-line
        }
        return (
            <Modal onClose={doDismiss} open>
                <Modal.Header>
                    An error occured
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {latestError.message}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
