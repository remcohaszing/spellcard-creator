import PropTypes from 'prop-types';
import React from 'react';

import MenuIcon from '../MenuIcon';
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
          aria-label="Toggle menu"
          className={styles.menuButton}
          onClick={onMenuToggle}
        >
          <MenuIcon />
        </IconButton>
      </header>
    );
  }
}
