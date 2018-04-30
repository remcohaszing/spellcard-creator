import PropTypes from 'prop-types';
import React from 'react';

import CloseIcon from '../CloseIcon';
import IconButton from '../IconButton';
import styles from './Chip.css';


export default class Chip extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    value: PropTypes.shape().isRequired,
  };

  onClose = (event) => {
    const {
      onClose,
      value,
    } = this.props;

    onClose(event, value);
  };

  render() {
    const {
      children,
      name,
    } = this.props;

    return (
      <div className={styles.root}>
        {children}
        <IconButton
          aria-label={`Remove from ${name}`}
          className={styles.button}
          name={name}
          onClick={this.onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
}
