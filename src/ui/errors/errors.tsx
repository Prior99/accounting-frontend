import * as React from "react";
import { Modal } from "semantic-ui-react";
import { Store, DisplayableError } from "store";
import { connect } from "utils";

export interface ErrorsProps {
    error?: DisplayableError;
    onDismiss: () => void;
}

export function mapStoreToProps(store: Store) {
    const { current: error, dismissCurrent } = store.error;
    return { error, onDismiss: dismissCurrent };
}

export function StrippedErrors({ error, onDismiss }: ErrorsProps) {
    if (!error) {
        return null; // tslint:disable-line
    }
    return (
        <Modal onClose={onDismiss} open>
            <Modal.Header>
                An error occured
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {error.message}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}

export const Errors = connect(StrippedErrors, mapStoreToProps);
