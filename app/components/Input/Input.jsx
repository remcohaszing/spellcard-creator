import PropTypes from 'prop-types';
import React from 'react';


export default class Input extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { label, name } = this.props;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input key={name} id={name} {...this.props} />
      </div>
    );
  }
}
