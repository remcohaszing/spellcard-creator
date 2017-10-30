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
          name="/pathfinderRPG/prd/advancedClassGuide"
          onChange={onChange}
          sources={sources}
          label="Advanced Class Guide"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/advancedPlayersGuide"
          onChange={onChange}
          sources={sources}
          label="Advanced Player’s guide"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/coreRulebook"
          onChange={onChange}
          sources={sources}
          label="Core Rulebook"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/mythicAdventures"
          onChange={onChange}
          sources={sources}
          label="Mythic Adventures"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/occultAdventures"
          onChange={onChange}
          sources={sources}
          label="Occult Adventures"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/technologyGuide"
          onChange={onChange}
          sources={sources}
          label="Technology Guide"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/ultimateCombat"
          onChange={onChange}
          sources={sources}
          label="Ultimate Combat"
        />
        <SourcePicker
          name="/pathfinderRPG/prd/ultimateMagic"
          onChange={onChange}
          sources={sources}
          label="Ultimate Magic"
        />
      </form>
    );
  }
}
