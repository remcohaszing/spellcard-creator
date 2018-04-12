import fuzzysearch from 'fuzzysearch';
import PropTypes from 'prop-types';
import React from 'react';

import Autocomplete from '../Autocomplete';
import Chip from '../Chip';
import Option from '../Option';
import books from './sources.json';


function isMatch(search, { name }) {
  const result = fuzzysearch(search.toLowerCase(), name.toLowerCase());
  return result;
}


export default class SourceSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  onSelected = (event, value) => {
    const {
      onChange,
    } = this.props;

    onChange({
      name: value.id,
      value: true,
    });
  };

  onDelete = (event) => {
    const {
      onChange,
    } = this.props;

    onChange({
      name: event.target.name,
      value: false,
    });
  };

  render() {
    const { sources } = this.props;

    return (
      <form>
        <div>
          {books.filter(book => sources.includes(book.id)).map(book => (
            <Chip key={book.id} name={book.id} onClose={this.onDelete}>
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
          {books.map(book => (
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
