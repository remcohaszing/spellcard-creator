import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Autocomplete.css';


export default class Autocomplete extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isMatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  state = {
    matches: React.Children.map(child => (
      this.props.isMatch(this.props.value, child.value) ? child : null
    )),
    search: this.props.value,
    typing: false,
  };

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
      children,
      isMatch,
    } = this.props;
    const { value } = event.target;

    const matches = React.Children.map(children, child => (
      isMatch(value, child.props.value) ? child : null
    ));

    this.setState({
      matches,
      search: value,
      typing: true,
    });
  };

  onSelected = async (event, value) => {
    const { name, onChange } = this.props;

    onChange({ target: { name } }, value);
  };

  render() {
    const { name } = this.props;
    const { matches, search, typing } = this.state;

    return (
      <div
        className={styles.root}
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
          className={styles.input}
          value={search}
          onChange={this.onTyped}
        />
        <div
          className={classNames(styles.fontList, {
            [styles.fontListClosed]: !typing,
          })}
        >
          {React.Children.map(matches, match => (
            match && React.cloneElement(match, {
              onSelect: this.onSelected,
            })
          ))}
        </div>
      </div>
    );
  }
}
