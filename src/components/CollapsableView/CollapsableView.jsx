import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import CaretIcon from '../CaretIcon';
import IconButton from '../IconButton';
import classes from './CollapsableView.css';


export default class CollapsableView extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, name } = this.props;
    const { collapsed } = this.state;
    return (
      <div>
        <header>
          <IconButton
            aria-label={`Toggle ${name}`}
            className={classNames(classes.collapseButton, {
              [classes.collapseButtonOpen]: !collapsed,
            })}
            onClick={this.toggle}
          >
            <CaretIcon />
          </IconButton>
          <h2 className={classes.header}>{name}</h2>
        </header>
        <div className={classNames(classes.content, {
          [classes.contentCollapsed]: collapsed,
        })}
        >
          {children}
        </div>
      </div>
    );
  }
}
