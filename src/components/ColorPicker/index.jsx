import classNames from 'classnames';
import PropTypes from 'prop-types';
import hsv2rgb from 'pure-color/convert/hsv2rgb';
import rgb2hsv from 'pure-color/convert/rgb2hsv';
import rgb2string from 'pure-color/convert/rgb2string';
import parseRgb from 'pure-color/parse/rgb';
import React from 'react';

import Alpha from './Alpha';
import { opened, picker, header, root, toggle } from './index.css';
import Hue from './Hue';
import Saturation from './Saturation';


export default class CustomColorPicker extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    label: null,
  };

  state = {
    open: false,
  };

  onChange = (event, values) => {
    const {
      name,
      onChange,
      value,
    } = this.props;

    const rgba = parseRgb(value);
    let [, , , a] = rgba;
    let [h, s, v] = rgb2hsv(rgba);
    ({
      h = h,
      s = s,
      v = v,
      a = a,
    } = values);

    onChange({ target: { name } }, rgb2string([...hsv2rgb([h, s, v]), a]));
  };

  onToggle = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  };

  render() {
    const {
      label,
      value,
    } = this.props;
    const {
      open,
    } = this.state;
    const rgba = parseRgb(value);
    const [r, g, b, a] = rgba;
    const [h, s, v] = rgb2hsv(rgba);

    return (
      <div className={root}>
        <label className={header}>
          <button
            type="button"
            className={toggle}
            style={{ backgroundColor: value }}
            onClick={this.onToggle}
          />
          {label}
        </label>
        <div
          className={classNames(picker, {
            [opened]: open,
          })}
        >
          <Saturation
            h={h}
            s={s}
            v={v}
            onChange={this.onChange}
          />
          <Hue
            h={h}
            onChange={this.onChange}
          />
          <Alpha
            r={r}
            g={g}
            b={b}
            a={a}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
