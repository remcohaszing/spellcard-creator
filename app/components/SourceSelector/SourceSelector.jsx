import PropTypes from 'prop-types';
import React from 'react';

import books from './sources.json';
import SourcePicker from './SourcePicker';


export default class SourceSelector extends React.Component {
  allSelected = false;
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onAllChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
  }

  selectAll = (box) => {
    this.allSelected = box.value;
    this.props.onAllChange({books: books, value: box.value});
  };

  selectOne = (box) => {
    this.props.onChange({name: box.name, value: box.value});
  }

  render() {
    const { onChange, sources } = this.props;

    return (
      <form>
        <SourcePicker
        key={"all"}
        name={"all"}
        onChange={this.selectAll}
        sources={sources}
        label={"Select all"}
        checked={this.allSelected}
        />
        {books.map(source => (
          <SourcePicker
            key={source.id}
            name={source.id}
            onChange={this.selectOne}
            sources={sources}
            label={source.name}
          />
        ))}
      </form>
    );
  }
}
