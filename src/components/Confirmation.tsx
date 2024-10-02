import * as React from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from '@nextui-org/react';

import { confirmable, ConfirmDialogProps } from 'react-confirm';

export interface Props {
  okLabel?: string;
  cancelLabel?: string;
  title?: string;
  confirmation?: string;
}

const Confirmation: React.FC<ConfirmDialogProps<Props, boolean>> = (props) => (
  <div className="static-modal">
    <Modal
      animation={false}
      show={props.show}
      onHide={() => props.proceed(false)}
      backdrop={true}
    >
      <Modal.Body>{props.confirmation}</Modal.Body>
      <Modal.Footer>
        <Button size='sm' color='primary' onClick={() => props.proceed(true)}>
          {props.okLabel || 'Yes'}
        </Button>
        <Button size='sm' color='danger' onClick={() => props.proceed(false)}>
          {props.cancelLabel || 'Cancel'}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default confirmable(Confirmation);
