import PropTypes from 'prop-types';
import React from 'react';


export default class Attribute extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  };

  static defaultProps = {
    value: null,
  };

  render() {
    const { name } = this.props;
    let { value } = this.props;

    if (value instanceof Array) {
      value = value.join('; ');
    }

    if (!value) {
      return null;
    }

    return (
      <div>
        <b>{name}:</b> {value}
      </div>
    );
  }
}
