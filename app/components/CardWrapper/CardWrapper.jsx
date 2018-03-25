import PropTypes from 'prop-types';
import React from 'react';

import Card from '../Card';
import styles from './CardWrapper.css';


export default class CardWrapper extends React.Component {
  static propTypes = {
    level: PropTypes.string.isRequired,
    spell: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  };

  ref = (card) => {
    this.card = card;
  };

  render() {
    const { level, spell, theme } = this.props;
    const { height, width } = theme;

    return (
      <div
        className={styles.cardWrapper}
        style={{
          width: `${width}in`,
          height: `${height}in`,
          minWidth: `${width}in`,
          minHeight: `${height}in`,
          maxWidth: `${width}in`,
          maxHeight: `${height}in`,
        }}
      >
        <div className={styles.cardTools} />
        <Card
          innerRef={this.ref}
          level={level}
          spell={spell}
          theme={theme}
        />
      </div>
    );
  }
}
