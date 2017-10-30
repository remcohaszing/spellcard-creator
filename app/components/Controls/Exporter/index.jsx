import PropTypes from 'prop-types';
import React from 'react';

import ExportButton from './ExportButton';


export default class Exporter extends React.Component {
  static propTypes = {
    theme: PropTypes.shape().isRequired,
  };

  state = {
    url: '',
  };

  createShareableURL = () => {
    const { theme } = this.props;
    const params = new URLSearchParams();
    Object.entries(theme).forEach(([key, value]) => {
      if (value != null) {
        params.set(key, value);
      }
    });
    this.setState({
      url: `${new URL(`?${params}`, window.location)}`,
    });
  };

  render() {
    const { url } = this.state;

    return (
      <form>
        <ExportButton />
        <button
          onClick={this.createShareableURL}
          type="button"
        >
          Share
        </button>
        <input value={url} />
      </form>
    );
  }
}
