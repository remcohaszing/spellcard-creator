import React from 'react';

import getThemeFromURL from '../../util/getThemeFromURL';
import { mapByClass } from '../../util/spells';
import Controls from '../Controls';
import GitHubCorner from '../GitHubCorner';
import Header from '../Header';
import Preview from '../Preview';
import allSources from '../SourceSelector/sources.json';
import styles from './App.css';


export default class App extends React.Component {
  state = {
    menuOpen: false,
    theme: getThemeFromURL(),
    selection: {
      druid: { levels: [0] },
    },
    sources: [allSources.find(source => source.id === 'PFRPG Core')],
    spellMap: {},
  };

  async componentWillMount() {
    const spellMap = await mapByClass();
    this.setState({
      spellMap,
    });
  }

  onSelectionChange = (event, value) => {
    this.setState({
      selection: value,
    });
  };

  onSourcesChange = (event, value) => {
    this.setState({
      sources: value,
    });
  };

  onThemeChange = (theme) => {
    this.setState({ theme });
  };

  onMenuToggle = () => {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen,
    }));
  };

  render() {
    const {
      menuOpen,
      selection,
      sources,
      spellMap,
      theme,
    } = this.state;

    return (
      <React.Fragment>
        <Header onMenuToggle={this.onMenuToggle} />
        <div className={styles.body}>
          <Preview
            selection={selection}
            sources={sources}
            spellMap={spellMap}
            theme={theme}
          />
          <Controls
            menuOpen={menuOpen}
            onSelectionChange={this.onSelectionChange}
            onSourcesChange={this.onSourcesChange}
            onThemeChange={this.onThemeChange}
            selection={selection}
            sources={sources}
            spellMap={spellMap}
            theme={theme}
          />
        </div>
        <GitHubCorner />
      </React.Fragment>
    );
  }
}
