'use strict';

// Babel compiler
require('babel-core/register');

// Create JSDOM and `document`/`window` globals
var document = global.document = require('jsdom').jsdom(
  '<!doctype html><html><head></head><body></body></html>'
);
var window = global.window = document.defaultView;

// Attach props from `global` to `window`
for (var key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (key in global) continue;
  global[key] = window[key];
}
