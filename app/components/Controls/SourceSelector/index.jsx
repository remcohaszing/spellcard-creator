import PropTypes from 'prop-types';
import React from 'react';

import SourcePicker from './SourcePicker';


export default class SourceSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { onChange, sources } = this.props;

    return (
      <form>
        <SourcePicker
          name="Advanced Class Guide"
          onChange={onChange}
          sources={sources}
          label="Advanced Class Guide"
        />
        <SourcePicker
          name="APG"
          onChange={onChange}
          sources={sources}
          label="Advanced Player’s guide"
        />
        <SourcePicker
          name="PFRPG Core"
          onChange={onChange}
          sources={sources}
          label="Core Rulebook"
        />
        <SourcePicker
          name="Mythic Adventures"
          onChange={onChange}
          sources={sources}
          label="Mythic Adventures"
        />
        <SourcePicker
          name="Occult Adventures"
          onChange={onChange}
          sources={sources}
          label="Occult Adventures"
        />
        <SourcePicker
          name="Technology Guide"
          onChange={onChange}
          sources={sources}
          label="Technology Guide"
        />
        <SourcePicker
          name="Ultimate Combat"
          onChange={onChange}
          sources={sources}
          label="Ultimate Combat"
        />
        <SourcePicker
          name="Ultimate Magic"
          onChange={onChange}
          sources={sources}
          label="Ultimate Magic"
        />
      </form>
    );
  }
}
