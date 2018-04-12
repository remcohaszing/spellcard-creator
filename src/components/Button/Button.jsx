import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.css';


export default class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    type: 'button',
  };

  render() {
    const {
      className,
      ...extraProps
    } = this.props;

    return (
      <button
        className={classNames(styles.root, className)}
        {...extraProps}
      />
    );
  }
}
