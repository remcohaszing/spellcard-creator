import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.css';


export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          {children}
        </div>
      </div>,
      document.body,
    );
  }
}
