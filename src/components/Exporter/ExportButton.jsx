import React from 'react';


export default class ExportButton extends React.Component {
  onClick = () => {
    window.print();
  };

  render() {
    return (
      <button
        onClick={this.onClick}
        type="button"
      >
        Export
      </button>
    );
  }
}
