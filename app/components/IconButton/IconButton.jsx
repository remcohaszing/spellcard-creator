import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './IconButton.css';


export default class IconButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: null,
    type: 'button',
  };

  render() {
    const {
      className,
      icon,
      ...extraProps
    } = this.props;

    return (
      <button
        {...extraProps}
        className={classNames('fa', `fa-${icon}`, styles.root, className)}
      />
    );
  }
}
