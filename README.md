<p align="center">
  <a href="http://badge.fury.io/js/react-classy">
    <img alt="npm version" src="https://badge.fury.io/js/react-classy.svg" />
  </a>
  <a href="https://travis-ci.org/jozanza/bem-utils">
    <img alt="build status" src="https://travis-ci.org/jozanza/bem-utils.svg" />
  </a>
  <a href="https://david-dm.org/jozanza/bem-utils">
    <img alt="dependency status" src="https://david-dm.org/jozanza/bem-utils.svg" />
  </a>
  <a href="https://david-dm.org/jozanza/bem-utils#info=devDependencies">
    <img alt="devdependency status" src="https://david-dm.org/jozanza/bem-utils/dev-status.svg" />
  </a>
</p>
<br />

# BEM Utils

### Table of Contents

- [Install](#install)
- [Intro](#intro)
- [Usage](#usage)
- [API](#api)

Install
-------

##### `npm install bem-utils`

Intro
-----

BEM Utils adds some sugar to writing out BEM-style className and authoring
BEM-style CSS through the use of tagged template strings. BEM is great for
your codebase, but it's ugly, and the less you have to think about it, the
better.

![BEM className shorthand]
(https://pbs.twimg.com/media/CNsJ7GmW8AIt23B.png:large)

Usage
-----

### ClassNames

```js
import BEM from 'bem-utils';
const BLOCK = 'Button';

{

  /*
   * ES2015+
   */

  let { classNames: cx } = BEM(BLOCK);

  cx`@`
  // -> Button

  cx`@ default`
  // -> Button Button--default

  cx`@ default, tall big`
  // -> Button Button--default, Button--tall--big

  cx`@content`
  // -> Button__content

  cx`@content/icon pink light`
  // -> Button__content__icon Button__content__icon--pink--light

  cx`@content/text large, purple`
  // -> Button__content__text Button__content__text--large Button__content__text--purple
}
{

  /*
   * ES5
   */

  var cx = BEM.classNames;

  cx(BLOCK, '@');
  // -> Button

  cx(BLOCK, '@ default');
  // -> Button Button--default

  cx(BLOCK, '@ default, tall big');
  // -> Button Button--default, Button--tall--big

  cx(BLOCK, '@content');
  // -> Button__content

  cx(BLOCK, '@content/icon pink light');
  // -> Button__content__icon Button__content__icon--pink--light

  cx(BLOCK, '@content/text large, purple');
  // -> Button__content__text Button__content__text--large Button__content__text--purple

}
```



### Writing CSS

```js
import BEM from 'bem-utils';
const BLOCK = 'Button';

{

  /*
   * ES2015+
   */

  let { css } = BEM(BLOCK);

  css`
    .default ${`
      color: red;
    `}
    .default.big span .text:hover .purple ${`
      color: purple;
      text-align: center;
    `}
  `

}
{

  /*
   * ES5
   */

  var css = BEM.css;

  css(BLOCK, [
    '.default',
    '.default.big span .text:hover .purple'
  ], [
    'color: red;',
    'color: purple;' +
    'text-align: center;'
  ]);

}

```

will output the following css:

```css
.Button--default {
  color: #000;
}

.Button--default--big span .Button__text:hover .Button__text__purple {
  color: purple;
}
```
