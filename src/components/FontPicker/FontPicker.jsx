import fuzzysearch from 'fuzzysearch';
import PropTypes from 'prop-types';
import React from 'react';

import getWebFonts from '../../util/getWebFonts';
import AutoComplete from '../Autocomplete';
import ColorPicker from '../ColorPicker';
import Option from '../Option';


export default class FontPicker extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape().isRequired,
  };

  state = {
    choices: [],
  };

  async componentWillMount() {
    const choices = await getWebFonts();

    this.setState({
      choices: choices.map(choice => choice.family),
    });
  }

  onChange = (event, val) => {
    const {
      onChange,
      name,
      value,
    } = this.props;

    const [, key] = event.target.name.match(/(\w+)$/);

    function onLoad() {
      onChange({ target: { name } }, {
        ...value,
        [key]: val || event.target.value,
      });
    }
    const url = `https://fonts.googleapis.com/css?family=${val.replace(/ /g, '+')}`;
    if (!document.head.querySelector(`link[href="${url}"]`)) {
      const element = document.createElement('link');
      element.href = url;
      element.rel = 'stylesheet';
      element.addEventListener('load', onLoad);
      document.head.appendChild(element);
    } else {
      onLoad();
    }
  };

  isMatch = (search, family) => fuzzysearch(search.toLowerCase(), family.toLowerCase());

  render() {
    const {
      name,
      value,
    } = this.props;
    const {
      choices,
    } = this.state;

    return (
      <div>
        <ColorPicker
          name={`${name}.color`}
          onChange={this.onChange}
          value={value.color}
        />
        <AutoComplete
          name={`${name}.family`}
          choices={choices}
          isMatch={this.isMatch}
          onChange={this.onChange}
          value={value.family}
        >
          {choices.map(choice => (
            <Option
              key={choice}
              value={choice}
            >
              {choice}
            </Option>
            ))}
        </AutoComplete>
        <input
          name={`${name}.size`}
          type="number"
          onChange={this.onChange}
          value={value.size}
          step={1}
        />
      </div>
    );
  }
}
