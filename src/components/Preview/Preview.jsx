import PropTypes from 'prop-types';
import React from 'react';

import classes from './Preview.css';
import CardWrapper from '../CardWrapper';


export default class Preview extends React.Component {
  static propTypes = {
    selection: PropTypes.shape().isRequired,
    sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    spellMap: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  };

  state = {
    backgroundImage: this.props.theme.backgroundImage,
  };

  componentWillReceiveProps(nextProps) {
    const nextBackgroundImage = nextProps.theme.backgroundImage;
    if (nextBackgroundImage === this.props.theme.backgroundImage) {
      return;
    }
    URL.revokeObjectURL(this.state.backgroundImage);
    let backgroundImage;
    if (nextBackgroundImage instanceof Blob) {
      backgroundImage = URL.createObjectURL(nextBackgroundImage);
    }
    if (typeof backgroundImage === 'string') {
      this.setState({ backgroundImage });
    }
  }

  render() {
    const {
      selection,
      sources,
      spellMap,
      theme,
    } = this.props;
    const { backgroundImage } = this.state;

    return (
      <div className={classes.preview}>
        {Object.keys(spellMap).length === 0 ? (
          null
        ) : (
          Object.entries(selection).map(([cls, definition]) => (
            definition.levels.map(level => (
              spellMap[cls][level]
                .filter(spell => sources.find(source => source.id === spell.source))
                .map(spell => (
                  <CardWrapper
                    key={spell.title}
                    cls={cls}
                    level={level}
                    spell={spell}
                    theme={{
                      ...theme,
                      backgroundImage,
                    }}
                  />
                ))
            ))
          ))
        )}
      </div>
    );
  }
}
