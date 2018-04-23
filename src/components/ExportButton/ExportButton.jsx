import React from 'react';

import Button from '../Button';


export default class ExportButton extends React.Component {
  render() {
    return (
      <Button onClick={window.print}>
        Export
      </Button>
    );
  }
}
