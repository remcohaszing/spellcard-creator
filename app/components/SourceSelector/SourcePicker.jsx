import PropTypes from 'prop-types';
import React from 'react';

import classes from './SourcePicker.css';


export default class SourcePicker extends React.Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const {
      label,
      name,
      onChange,
      sources,
    } = this.props;

    return (
      <label className={classes.sourcePicker} htmlFor={name}>
        <input
          id={name}
          type="checkbox"
          checked={!!sources.includes(name)}
          onChange={(event) => {
            onChange({
              name,
              value: event.target.checked,
            });
          }}
        />
        {label}
      </label>

    );
  }
}
