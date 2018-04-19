import PropTypes from 'prop-types';
import React from 'react';

import IconButton from '../IconButton';
import styles from './Header.css';


export default class Header extends React.Component {
  static propTypes = {
    onMenuToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      onMenuToggle,
    } = this.props;

    return (
      <header className={styles.root}>
        <h1 className={styles.title}>
          Spellcard Generator
        </h1>
        <IconButton
          icon="bars"
          onClick={onMenuToggle}
        />
      </header>
    );
  }
}
