import PropTypes from 'prop-types';
import React from 'react';

import { saturation } from './Saturation.css';
import Slider from './Slider';


export default class Saturation extends React.Component {
  static propTypes = {
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    v: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (event, { x, y }) => {
    const { onChange } = this.props;

    onChange(event, {
      s: x * 100,
      v: (1 - y) * 100,
    });
  };

  render() {
    const {
      h,
      s,
      v,
    } = this.props;

    return (
      <Slider
        onChange={this.onChange}
        className={saturation}
        style={{ backgroundColor: `hsl(${h},100%,50%)` }}
        x={s / 100}
        y={1 - (v / 100)}
      />
    );
  }
}
