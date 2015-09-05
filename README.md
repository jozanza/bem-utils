<p align="center">
  <a href="http://badge.fury.io/js/bem-utils">
    <img alt="npm version" src="https://badge.fury.io/js/bem-utils.svg" />
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
  <a href='https://coveralls.io/github/jozanza/bem-utils?branch=master'>
    <img src='https://coveralls.io/repos/jozanza/bem-utils/badge.svg?branch=master&service=github' alt='Coverage Status' />
  </a>
</p>

# BEM Utils

### Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [classNames](#classnames)
- [CSS](#css)

Installation
------------

`npm install bem-utils`

BEM Utils adds some sugar to writing out BEM-style className and authoring
BEM-style CSS through the use of *tagged template strings*. BEM is great for
your codebase, but it's ugly, and the less you have to think about it, the
better.

Getting Started
---------------

Start by importing the module and setting the block for the classNames or cssText you want to generate.
`bem-utils` has two main methods -- `classNames(...)` and `css(...)`:

```js
import BEM from 'bem-utils'
const BLOCK = 'Button'
let { classNames: cx, css } = BEM(BLOCK)
```

classNames
----------

#### Basic

##### Blocks and Elements
The `@` symbol can be used to produce Block+Element classNames:

```js
cx`@`
// -> Button

cx`@content`
// -> Button__content

cx`@content/text`
// -> Button__content__text
```

##### Modifiers
You may include any number of comma-separated modifiers following a trailing whitespace:

```js
cx`@ default`
// -> Button--default

cx`@ big, active`
// -> Button--big Button--active

cx`@content dark outlined`
// -> Button__content--dark--outlined

cx`@content/text large, purple`
// -> Button__content__text--large Button__content__text--purple
```

#### Advanced

##### Blocks and Elements
When `+@` is used at the start of the classString, the block+element className will *always* be printed in addition to modifier classNames:

```js
cx`+@ default`
// -> Button Button--default

cx`+@content dark outlined`
// -> Button__content Button__content--dark--outlined

cx`+@content/text large, purple`
// -> Button__content__text Button__content__text--large Button__content__text--purple
```

##### Modifiers
If the leading `+@` or `@` is omitted, modifiers will be applied to the block:

```js
cx`default`
// -> Button--default

cx`big, active`
// -> Button--big Button--active

cx`big, active, dark outlined`
// -> Button--big Button--active Button--dark--outlined

```

CSS
---

```js
css`

.default ${`
  color: #000;
`}

.default .content .icon.pink ${`
  color: #fff;
  background: pink;
  border-radius: 4px 8px;
`}

.default.big span .text:hover .purple ${`
  color: purple;
  text-align: center;
  text-decoration: none;
`}

`
```

The code above outputs the following css:

```css
.Button--default {
  color: #000;
}

.Button--default .Button__content .Button__content__icon--pink {
  color: #fff;
  background: pink;
  border-radius: 4px 8px;
}

.Button--default--big span .Button__text:hover .Button__text__purple {
  color: purple;
  text-align: center;
  text-decoration: none;
}
```
