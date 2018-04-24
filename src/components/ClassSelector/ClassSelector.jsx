import fuzzysearch from 'fuzzysearch';
import PropTypes from 'prop-types';
import React from 'react';

import classes from '../../util/classes';
import AutoComplete from '../Autocomplete';
import Checkbox from '../Checkbox';
import Option from '../Option';


export default class ClassSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape().isRequired,
  };

  onClassSelected = (event, val) => {
    const {
      onChange,
      value,
    } = this.props;

    onChange(null, {
      ...value,
      [val]: {
        levels: [],
      },
    });
  };

  onLevelSelected = (event) => {
    const {
      onChange,
      value,
    } = this.props;
    const {
      checked,
      name,
      value: level,
    } = event.target;

    const checkedLevel = Number(level);

    const levels = Array.from(new Set(checked ? (
      [...value[name].levels, checkedLevel]
    ) : (
      value[name].levels.filter(oldLevel => (oldLevel === Number(checkedLevel) ? checked : true))
    ))).sort();

    onChange(null, {
      ...value,
      [name]: {
        ...value[name],
        levels,
      },
    });
  };

  render() {
    const {
      value,
    } = this.props;

    return (
      <div>
        <AutoComplete
          isMatch={fuzzysearch}
          value=""
          name="class"
          onChange={this.onClassSelected}
        >
          {Object.keys(classes).map(cls => (
            <Option value={cls} key={cls}>
              {cls}
            </Option>
          ))}
        </AutoComplete>
        {Object.entries(value).map(([cls, selected]) => {
          const definition = classes[cls];
          return (
            <div key={cls}>
              <h4>{cls}</h4>
              {definition.levels.map(level => (
                <label key={level}>
                  <Checkbox
                    name={cls}
                    value={level}
                    checked={selected.levels.includes(level)}
                    onChange={this.onLevelSelected}
                  />
                  {level}
                </label>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
