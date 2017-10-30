import PropTypes from 'prop-types';
import React from 'react';

import classes from './Card.css';
import Attribute from './Attribute';


export default class Card extends React.Component {
  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    level: PropTypes.string.isRequired,
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
        className={classes.card}
        ref={innerRef}
        style={{
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
          color: contentFont.color,
          fontFamily: contentFont.family,
          fontSize: `${contentFont.size}px`,
        }}
      >
        <section
          className={classes.properties}
          style={{
            backgroundColor,
            boxShadow: `inset 0 0 ${borderSize * 2}px ${borderSize}px ${borderColor}`,
            padding: `${borderSize}px`,
          }}
        >
          <h3
            className={classes.header}
            style={{
              color: headerFont.color,
              fontFamily: headerFont.family,
              fontSize: `${headerFont.size}px`,
            }}
          >
            {title}
          </h3>
          <h4
            className={classes.level}
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
          <Attribute name="School" value={school} />
          <Attribute name="Casting Time" value={time} />
          <Attribute name="Duration" value={duration} />
          <Attribute name="Components" value={components} />
          <Attribute name="Effect" value={effect} />
          <Attribute name="Range" value={range} />
          <Attribute name="Saving Throw" value={save} />
          <Attribute name="Area" value={area} />
          <Attribute name="Spell Resistance" value={resist} />
          <Attribute name="Target" value={target} />
        </section>
        <section
          className={classes.descriptionWrapper}
          style={{
            backgroundColor,
            boxShadow: `inset 0 0 ${borderSize * 2}px ${borderSize}px ${borderColor}`,
          }}
        >
          <div
            className={classes.description}
            style={{
              padding: `${borderSize + 1}px`,
            }}
          >
            {table ? (
              <table className={classes.summoningTable}>
                <tbody>
                  {table.map(({ name, subtype }) => (
                    <tr key={name}>
                      <td
                        className={classes.summoningTableRow}
                        style={{ borderColor }}
                      >
                        {name}
                      </td>
                      <td
                        className={classes.summoningSubtype}
                        style={{ borderColor }}
                      >
                        {subtype}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={classes.descriptionInner}>
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
