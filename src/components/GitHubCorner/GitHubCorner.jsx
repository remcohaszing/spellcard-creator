import React from 'react';

import styles from './GitHubCorner.css';


/**
 * A slightly modified version of Tim Holman’s GitHub corner icon.
 *
 * https://github.com/tholman/github-corners
 */
export default class GitHubCorner extends React.Component {
  render() {
    return (
      <a href="https://github.com/remcohaszing/spellcard-creator" title="See project on GitHub">
        <svg viewBox="0 0 250 250" className={styles.root}>
          <path
            d="M0 0l115 115h15l12 27 108 108V0z"
          />
          <path
            className={styles.arm}
            d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"
          />
          <path
            className={styles.body}
            d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
          />
        </svg>
      </a>
    );
  }
}
