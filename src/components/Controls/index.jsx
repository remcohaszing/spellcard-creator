import PropTypes from 'prop-types';
import React from 'react';

import classes from './index.css';
import CardSelector from '../CardSelector';
import CollapsableView from '../CollapsableView';
import Exporter from '../Exporter';
import Footer from '../Footer';
import SourceSelector from '../SourceSelector';
import ThemeSelector from '../ThemeSelector';


export default class Controls extends React.Component {
  static propTypes = {
    onSelectionChange: PropTypes.func.isRequired,
    onSourcesChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired,
    selection: PropTypes.shape().isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    spellMap: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  };

  render() {
    const {
      onSelectionChange,
      onSourcesChange,
      onThemeChange,
      selection,
      sources,
      spellMap,
      theme,
    } = this.props;

    return (
      <div className={classes.sideBar}>
        <div className={classes.controls}>
          <CollapsableView name="Sources">
            <SourceSelector
              onChange={onSourcesChange}
              sources={sources}
            />
          </CollapsableView>
          <CollapsableView name="Selection">
            <CardSelector
              onChange={onSelectionChange}
              selection={selection}
              spellMap={spellMap}
            />
          </CollapsableView>
          <CollapsableView name="Theme" >
            <ThemeSelector
              onChange={onThemeChange}
              theme={theme}
            />
          </CollapsableView>
          <CollapsableView name="Export" >
            <Exporter
              theme={theme}
            />
          </CollapsableView>
        </div>
        <Footer />
      </div>
    );
  }
}
