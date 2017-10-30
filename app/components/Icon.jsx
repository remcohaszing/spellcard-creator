import PropTypes from 'prop-types';
import React from 'react';


export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    const { name } = this.props;

    return (
      <i className={`fa fa-${name}`} />
    );
  }
}
