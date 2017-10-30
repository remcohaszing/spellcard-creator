import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

import { backdrop, modal } from './index.css';


export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={backdrop}>
        <div className={modal}>
          {children}
        </div>
      </div>,
      document.body,
    );
  }
}
