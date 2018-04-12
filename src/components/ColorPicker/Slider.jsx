import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { pointer, slider } from './Slider.css';


export default class Slider extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  onMouseMove = function onMouseMove(event) {
    const {
      onChange,
    } = this.props;

    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
    } = this.node.getBoundingClientRect();

    const x = (Math.max(Math.min(event.pageX, right), left) - left) / width;
    const y = (Math.max(Math.min(event.pageY, bottom), top) - top) / height;

    onChange(event, {
      x,
      y,
    });
  }.bind(this);

  onMouseDown = (event) => {
    const { onMouseMove } = this;
    onMouseMove(event);

    window.addEventListener('mousemove', onMouseMove, false);
    function cleanup() {
      window.removeEventListener('mouseup', cleanup, false);
      window.removeEventListener('mousemove', onMouseMove, false);
    }
    window.addEventListener('mouseup', cleanup, false);
  };

  ref = (node) => {
    this.node = node;
  };

  render() {
    const {
      className,
      onChange,
      x,
      y,
      ...extraProps
    } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        {...extraProps}
        className={classNames(slider, className)}
        ref={this.ref}
        onMouseDown={this.onMouseDown}
      >
        <div
          className={pointer}
          style={{
            left: `calc(${x * 100}% - 6px)`,
            top: `calc(${y * 100}% - 6px)`,
          }}
        />
      </div>
    );
  }
}
