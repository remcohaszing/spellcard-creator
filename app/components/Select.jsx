import PropTypes from 'prop-types';
import React from 'react';


export default class Select extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { label, name } = this.props;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select id={name} {...this.props} />
      </div>
    );
  }
}
