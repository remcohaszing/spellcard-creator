import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import preventDefault from '../../util/preventDefault';
import styles from './ImagePicker.css';


export default class ImagePicker extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Blob),
    ]),
  };

  static defaultProps = {
    value: null,
  };

  state = {
    enter: false,
    src: null,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value === this.props.value) {
      return;
    }
    this.setState({
      src: URL.createObjectURL(nextProps.value),
    });
  };

  componentWillUnmount = () => {
    const { src } = this.state;

    URL.revokeObjectURL(src);
  };

  onClick = () => {
    const { name, onChange } = this.props;

    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      onChange({ target: { name } }, input.files[0]);
    };
    input.click();
  };

  onDragEnter = () => {
    this.setState({
      enter: true,
    });
  };

  onDragLeave = () => {
    this.setState({
      enter: false,
    });
  };

  onDrop = (event) => {
    preventDefault(event);
    this.setState({
      enter: false,
    });
    const [file] = event.dataTransfer.files;
    if (file == null) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      return;
    }
    const { name, onChange } = this.props;
    onChange({ target: { name } }, file);
  };

  render() {
    const { enter, src } = this.state;

    return (
      <div
        className={classNames(styles.root, {
          [styles.active]: enter,
        })}
        onChange={this.onChange}
        onClick={this.onClick}
        onKeyDown={this.onClick}
        onDragOver={preventDefault}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        role="button"
        tabIndex={0}
      >
        {src ? (
          <img
            className={styles.preview}
            src={src}
            alt="Selected background"
          />
        ) : (
          'Click or drag an image here to select a background for your cards'
        )}
      </div>
    );
  }
}
