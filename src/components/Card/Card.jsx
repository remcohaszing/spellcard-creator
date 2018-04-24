import PropTypes from 'prop-types';
import React from 'react';

import styles from './Card.css';
import CardAttribute from '../CardAttribute';


export default class Card extends React.Component {
  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    spell: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  };

  render() {
    const {
      innerRef,
      level,
      spell,
      theme,
    } = this.props;
    const {
      area,
      components,
      description,
      duration,
      effect,
      range,
      resist,
      save,
      school,
      table,
      target,
      time,
      title,
    } = spell;
    const {
      backgroundColor,
      backgroundImage,
      borderColor,
      borderSize,
      contentFont,
      headerFont,
      levelFont,
    } = theme;

    return (
      <div
        className={styles.card}
        ref={innerRef}
        style={{
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
          color: contentFont.color,
          fontFamily: contentFont.family,
          fontSize: `${contentFont.size}px`,
        }}
      >
        <section
          className={styles.properties}
          style={{
            backgroundColor,
            boxShadow: `inset 0 0 ${borderSize * 2}px ${borderSize}px ${borderColor}`,
            padding: `${borderSize}px`,
          }}
        >
          <h3
            className={styles.header}
            style={{
              color: headerFont.color,
              fontFamily: headerFont.family,
              fontSize: `${headerFont.size}px`,
            }}
          >
            {title}
          </h3>
          <h4
            className={styles.level}
            style={{
              backgroundColor,
              boxShadow: `inset 0 0 ${borderSize * 2}px ${borderSize}px ${borderColor}`,
              color: levelFont.color,
              fontFamily: levelFont.family,
              fontSize: `${levelFont.size}px`,
            }}
          >
            {level}
          </h4>
          <CardAttribute name="School" value={school} />
          <CardAttribute name="Casting Time" value={time} />
          <CardAttribute name="Duration" value={duration} />
          <CardAttribute name="Components" value={components} />
          <CardAttribute name="Effect" value={effect} />
          <CardAttribute name="Range" value={range} />
          <CardAttribute name="Saving Throw" value={save} />
          <CardAttribute name="Area" value={area} />
          <CardAttribute name="Spell Resistance" value={resist} />
          <CardAttribute name="Target" value={target} />
        </section>
        <section
          className={styles.descriptionWrapper}
          style={{
            backgroundColor,
            boxShadow: `inset 0 0 ${borderSize * 2}px ${borderSize}px ${borderColor}`,
          }}
        >
          <div
            className={styles.description}
            style={{
              padding: `${borderSize + 1}px`,
            }}
          >
            {table ? (
              <table className={styles.summoningTable}>
                <tbody>
                  {table.map(({ name, subtype }) => (
                    <tr key={name}>
                      <td
                        className={styles.summoningTableRow}
                        style={{ borderColor }}
                      >
                        {name}
                      </td>
                      <td
                        className={styles.summoningSubtype}
                        style={{ borderColor }}
                      >
                        {subtype}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.descriptionInner}>
                {description.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
