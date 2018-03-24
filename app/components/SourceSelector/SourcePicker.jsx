import PropTypes from 'prop-types';
import React from 'react';

import classes from './SourcePicker.css';


export default class SourcePicker extends React.Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    checked:PropTypes.bool
  };

  render() {
    const {
      label,
      name,
      onChange,
      sources,
      checked
    } = this.props;
    
    var selected = false;
    if (checked != undefined){
      selected = checked;
    }
    else {
      selected = !!sources.includes(name);
    }

    return (
      <label className={classes.sourcePicker} htmlFor={name}>
        <input
          id={name}
          type="checkbox"
          checked={selected}
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
