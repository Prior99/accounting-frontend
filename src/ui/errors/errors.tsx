import * as React from "react";
import { Modal } from "semantic-ui-react";
import { observer } from "mobx-react";
import { ApiStore } from "store";
import { inject, external } from "tsdi";

@observer @external
export class Errors extends React.PureComponent<{}> {
    @inject private api: ApiStore;

    public render() {
        const { latestError, doDismiss } = this.api;
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
