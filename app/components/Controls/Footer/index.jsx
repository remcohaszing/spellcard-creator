import React from 'react';

import { footer } from './index.css';


export default function Footer() {
  return (
    <footer className={footer}>
      <a
        className="github-button"
        href="https://github.com/remcohaszing/spellcard-creator"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star remcohaszing/spellcard-creator on GitHub"
      >
        Star
      </a>
      <p>
        This website uses trademarks and/or copyrights owned by Paizo Inc., which are used under
        Paizo’s Community Use Policy. We are expressly prohibited from charging you to use or access
        this content. This website is not published, endorsed, or specifically approved by Paizo
        Inc. For more information about Paizo’s Community Use Policy, please
        visit <a href="https://paizo.com/communityuse">paizo.com/communityuse</a>. For more
        information about Paizo Inc. and Paizo products, please
        visit <a href="http://paizo.com">paizo.com</a>.
      </p>
    </footer>
  );
}
