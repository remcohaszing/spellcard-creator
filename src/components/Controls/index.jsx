import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './index.css';
import CardSelector from '../CardSelector';
import CollapsableView from '../CollapsableView';
import ExportButton from '../ExportButton';
import Footer from '../Footer';
import SourceSelector from '../SourceSelector';
import ThemeSelector from '../ThemeSelector';


export default class Controls extends React.Component {
  static propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    onSourcesChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired,
    selection: PropTypes.shape().isRequired,
    sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    spellMap: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  };

  render() {
    const {
      menuOpen,
      onSelectionChange,
      onSourcesChange,
      onThemeChange,
      selection,
      sources,
      spellMap,
      theme,
    } = this.props;

    return (
      <div
        className={classNames(classes.sideBar, {
          [classes.closed]: !menuOpen,
        })}
      >
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
          <ExportButton />
        </div>
        <Footer />
      </div>
    );
  }
}
