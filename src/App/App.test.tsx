/**
 * THIS IS NOT A USEFUL TEST!!!!
 * It's only being used to verify Jest is working.
 * Write meaningful tests and delete this one!
 */

import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

it('renders the app', () => {
  expect(shallow(<App />)).toBeTruthy();
});
