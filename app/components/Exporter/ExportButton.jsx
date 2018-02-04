import React from 'react';

import { card } from '../Card/Card.css';
import { downloadAsPDF } from '../../util/download';
import Modal from '../Modal';


export default class ExportButton extends React.Component {
  state = {
    current: 0,
    total: null,
  };

  onProgress = (current) => {
    this.setState({ current });
  };

  onClick = async () => {
    const nodes = document.getElementsByClassName(card);
    this.setState({
      total: nodes.length,
    });
    await downloadAsPDF(nodes, 'Spells', this.onProgress);
    this.setState({
      current: 0,
      total: null,
    });
  };

  render() {
    const { current, total } = this.state;

    return (
      <button
        onClick={this.onClick}
        type="button"
      >
        Export
        {total == null || (
          <Modal>
            <div>
              Processing {current} / {total}
            </div>
          </Modal>
      )}
      </button>
    );
  }
}
