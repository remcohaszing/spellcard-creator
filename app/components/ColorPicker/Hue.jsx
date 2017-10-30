import PropTypes from 'prop-types';
import React from 'react';

import { hue } from './Hue.css';
import Slider from './Slider';


export default class Hue extends React.Component {
  static propTypes = {
    h: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (event, { x }) => {
    const { onChange } = this.props;

    onChange(event, {
      h: x * 360,
    });
  };

  render() {
    const {
      h,
    } = this.props;

    return (
      <Slider
        className={hue}
        onChange={this.onChange}
        x={h / 360}
        y={0.5}
      />
    );
  }
}
