import React from 'react';

import getThemeFromURL from '../../util/getThemeFromURL';
import { mapByClass } from '../../util/spells';
import Controls from '../Controls';
import Preview from '../Preview';


export default class App extends React.Component {
  state = {
    theme: getThemeFromURL(),
    selection: {},
    sources: ['/pathfinderRPG/prd/coreRulebook'],
    spellMap: {},
  };

  async componentWillMount() {
    const spellMap = await mapByClass();
    const selection = {};
    Object.entries(spellMap).forEach(([cls, levels]) => {
      selection[cls] = {};
      Object.keys(levels).forEach((level) => {
        selection[cls][level] = false;
      });
    });
    selection.druid['2'] = true;
    this.setState({
      spellMap,
      selection,
    });
  }

  onSelectionChange = ({ cls, level, value }) => {
    this.setState({
      selection: {
        ...this.state.selection,
        [cls]: {
          ...this.state.selection[cls],
          [level]: value,
        },
      },
    });
  };

  onSourcesChange = ({ name, value }) => {
    const set = new Set(this.state.sources);
    if (value) {
      set.add(name);
    } else {
      set.delete(name);
    }
    this.setState({
      sources: Array.from(set).sort(),
    });
  };

  onThemeChange = (theme) => {
    this.setState({ theme });
  };

  render() {
    const {
      selection,
      sources,
      spellMap,
      theme,
    } = this.state;

    return [
      <Preview
        key="preview"
        selection={selection}
        sources={sources}
        spellMap={spellMap}
        theme={theme}
      />,
      <Controls
        key="controls"
        onSelectionChange={this.onSelectionChange}
        onSourcesChange={this.onSourcesChange}
        onThemeChange={this.onThemeChange}
        selection={selection}
        sources={sources}
        spellMap={spellMap}
        theme={theme}
      />,
    ];
  }
}
