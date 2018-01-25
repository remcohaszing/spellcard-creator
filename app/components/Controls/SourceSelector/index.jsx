import PropTypes from 'prop-types';
import React from 'react';

import books from './sources.json';
import SourcePicker from './SourcePicker';


export default class SourceSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { onChange, sources } = this.props;

    return (
      <form>
        {books.map(source => (
          <SourcePicker
            name={source.id}
            onChange={onChange}
            sources={sources}
            label={source.name}
          />
        ))}
      </form>
    );
  }
}
