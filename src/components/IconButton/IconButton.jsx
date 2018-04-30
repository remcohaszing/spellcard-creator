import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './IconButton.css';


export default class IconButton extends React.Component {
  static propTypes = {
    'aria-label': PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
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
        {...extraProps}
        className={classNames(styles.root, className)}
      />
    );
  }
}
