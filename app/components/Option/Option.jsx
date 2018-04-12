import PropTypes from 'prop-types';
import React from 'react';

import styles from './Option.css';


export default class Option extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    onSelect() {},
  };

  onSelect = (event) => {
    const {
      onSelect,
      value,
    } = this.props;

    onSelect(event, value);
  };

  render() {
    const {
      children,
      onSelect,
      value,
      ...extraProps
    } = this.props;

    return (
      <div
        className={styles.root}
        role="menu"
        tabIndex={0}
        {...extraProps}
        onKeyDown={this.onSelect}
        onClick={this.onSelect}
      >
        {children}
      </div>
    );
  }
}
