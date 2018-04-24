import React from 'react';


export default class Checkbox extends React.Component {
  render() {
    return (
      <input
        {...this.props}
        type="checkbox"
      />
    );
  }
}
