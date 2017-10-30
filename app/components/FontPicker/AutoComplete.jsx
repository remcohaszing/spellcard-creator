import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import loadFont from '../../util/loadFont';
import { fontList, fontListClosed, option, root, input } from './AutoComplete.css';


export default class FontPicker extends React.Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.any).isRequired,
    isMatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  state = {
    matches: [],
    search: this.props.value,
    typing: false,
  };

  async componentWillMount() {
    const {
      choices,
      isMatch,
    } = this.props;
    const { search } = this.state;

    const matches = choices.filter(choice => isMatch(search, choice));

    this.setState({
      matches,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (nextProps.value !== value) {
      this.setState({
        search: nextProps.value,
        typing: false,
      });
    }
  }

  onBlur = () => {
    // If this runs without a timeout, the click event of the selected font will not be called.
    setTimeout(() => {
      this.setState({
        typing: false,
      });
    }, 300);
  };

  onFocus = async () => {
    this.setState({
      typing: true,
    });
  };

  onTyped = async (event) => {
    const {
      choices,
      isMatch,
    } = this.props;
    const { value } = event.target;

    const matches = choices.filter(choice => isMatch(value, choice));

    this.setState({
      matches,
      search: value,
      typing: true,
    });
  };

  onSelected = async ({ family }) => {
    const { name, onChange } = this.props;

    await loadFont(family);
    onChange({ target: { name } }, family);
  };

  render() {
    const { name } = this.props;
    const { matches, search, typing } = this.state;

    return (
      <div
        className={root}
        tabIndex={0}
        role="combobox"
        aria-expanded={typing}
        aria-controls={name}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        <input
          id={name}
          name={name}
          className={input}
          value={search}
          onChange={this.onTyped}
        />
        <div
          className={classNames(fontList, {
            [fontListClosed]: !typing,
          })}
        >
          {matches.map(font => (
            <div
              className={option}
              key={font.family}
              onClick={() => this.onSelected(font)}
              onKeyDown={() => this.onSelected(font)}
              role="menuitem"
              tabIndex={0}
            >
              {font.family}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
