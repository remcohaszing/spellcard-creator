import PropTypes from 'prop-types';
import React from 'react';

import ColorPicker from '../../ColorPicker';
import ImagePicker from '../../ImagePicker';
import Input from '../../Input';
import FontPicker from '../../FontPicker';


export default class ThemeSelector extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.shape().isRequired,
  };

  onChange = (event, value) => {
    const { onChange, theme } = this.props;

    onChange({
      ...theme,
      [event.target.name]: value === undefined ? event.target.value : value,
    });
  };

  render() {
    const { theme } = this.props;
    const {
      backgroundColor,
      backgroundImage,
      borderColor,
      contentFont,
      headerFont,
      height,
      levelFont,
      width,
    } = theme;

    return (
      <form>
        <fieldset>
          <legend>Colors</legend>
          <ColorPicker
            value={backgroundColor}
            label="Color"
            name="backgroundColor"
            onChange={this.onChange}
          />
          <ColorPicker
            value={borderColor}
            label="Border Color"
            name="borderColor"
            onChange={this.onChange}
          />
          <FontPicker
            value={contentFont}
            label="Card font"
            name="contentFont"
            onChange={this.onChange}
          />
          <FontPicker
            value={headerFont}
            label="Header font"
            name="headerFont"
            onChange={this.onChange}
          />
          <FontPicker
            value={levelFont}
            label="Level font"
            name="levelFont"
            onChange={this.onChange}
          />
        </fieldset>
        <fieldset>
          <legend>Card size</legend>
          <Input
            defaultValue={width}
            label="Width (inch)"
            name="width"
            onChange={this.onChange}
            type="number"
            step="0.1"
          />
          <Input
            defaultValue={height}
            label="Height (inch)"
            name="height"
            onChange={this.onChange}
            type="number"
            step="0.1"
          />
        </fieldset>
        <ImagePicker
          value={backgroundImage}
          label="Background"
          name="backgroundImage"
          onChange={this.onChange}
        />
      </form>
    );
  }
}
