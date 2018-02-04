import fuzzysearch from 'fuzzysearch';
import PropTypes from 'prop-types';
import React from 'react';

import getWebFonts from '../../util/getWebFonts';
import AutoComplete from '../Autocomplete';
import ColorPicker from '../ColorPicker';


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
      choices,
    });
  }

  onChange = (event, val) => {
    const {
      onChange,
      name,
      value,
    } = this.props;

    const [, key] = event.target.name.match(/(\w+)$/);

    onChange({ target: { name } }, {
      ...value,
      [key]: val || event.target.value,
    });
  };

  isMatch = (search, { family }) => fuzzysearch(search.toLowerCase(), family.toLowerCase());

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
        />
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
