import fuzzysearch from 'fuzzysearch';
import PropTypes from 'prop-types';
import React from 'react';

import Autocomplete from '../Autocomplete';
import Chip from '../Chip';
import Option from '../Option';
import allSources from './sources.json';


function isMatch(search, { name }) {
  const result = fuzzysearch(search.toLowerCase(), name.toLowerCase());
  return result;
}


export default class SourceSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  onSelected = (event, value) => {
    const {
      onChange,
      sources,
    } = this.props;

    onChange(event, [...sources, value]);
  };

  onDelete = (event, value) => {
    const {
      onChange,
      sources,
    } = this.props;

    onChange(event, sources.filter(source => source !== value));
  };

  render() {
    const { sources } = this.props;

    return (
      <form>
        <div>
          {sources.map(book => (
            <Chip key={book.id} name={book.id} onClose={this.onDelete} value={book}>
              {book.name}
            </Chip>
        ))}
        </div>
        <Autocomplete
          name="Books"
          isMatch={isMatch}
          onChange={this.onSelected}
          value=""
        >
          {allSources.filter(source => !sources.includes(source)).map(book => (
            <Option
              key={book.id}
              value={book}
            >
              {book.name}
            </Option>
          ))}
        </Autocomplete>
      </form>
    );
  }
}
