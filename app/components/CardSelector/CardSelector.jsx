import PropTypes from 'prop-types';
import React from 'react';


export default class CardSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selection: PropTypes.shape().isRequired,
    spellMap: PropTypes.shape().isRequired,
  };

  render() {
    const { onChange, selection, spellMap } = this.props;

    if (!spellMap) {
      return null;
    }

    return (
      <form>
        {Object.entries(spellMap)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([cls, levels]) => (
            <fieldset key={cls}>
              <legend>{cls}</legend>
              Levels:
              {Object.keys(levels).map(level => parseInt(level, 10)).sort().map((level) => {
                const id = `${cls}-${level}`;
                return (
                  <label htmlFor={id} key={id}>
                    <input
                      id={id}
                      type="checkbox"
                      checked={!!selection[cls][level]}
                      onChange={(event) => {
                        onChange({
                          cls,
                          level,
                          value: event.target.checked,
                        });
                      }}
                    />
                    {level}
                  </label>
                );
              })}
            </fieldset>
          ))}
      </form>
    );
  }
}
