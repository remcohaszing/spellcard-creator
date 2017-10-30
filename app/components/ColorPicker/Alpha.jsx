import PropTypes from 'prop-types';
import React from 'react';

import { alpha, alphaSlider } from './Alpha.css';
import Slider from './Slider';


export default class Alpha extends React.Component {
  static propTypes = {
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (event, { x }) => {
    const { onChange } = this.props;

    onChange(event, {
      a: x,
    });
  };

  render() {
    const {
      r,
      g,
      b,
      a,
    } = this.props;

    return (
      <div className={alpha}>
        <Slider
          style={{
            backgroundImage: `linear-gradient(to left,rgb(${r},${g},${b}),transparent)`,
          }}
          className={alphaSlider}
          onChange={this.onChange}
          x={a}
          y={0.5}
        />
      </div>
    );
  }
}
