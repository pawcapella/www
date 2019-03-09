import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';

import '../public/android-chrome-192x192.png';
import '../public/android-chrome-512x512.png';
import '../public/apple-touch-icon.png';
import '../public/browserconfig.xml';
import '../public/favicon-16x16.png';
import '../public/favicon-32x32.png';
import '../public/mstile-150x150.png';
import '../public/safari-pinned-tab.svg';
import '../public/site.webmanifest';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

if (module.hot) {
  module.hot.accept();
}
