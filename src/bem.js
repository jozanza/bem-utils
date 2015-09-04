/**
 *
 * Classy - BEM Helpers
 *
 * @module lib/misc
 * @description
 *   Helpers for generating BEM-style CSS and classNames
 */

/**
 *
 * Returns namespaced template string methods
 *
 * @param {String} block The 'B' in BEM
 */
export default function BEM(block) {
  let methods = {};
  if (block) {
    Object.keys(BEM.methods).forEach(fn => {
      methods[fn] = BEM.methods[fn].bind(null, block);
    });
  }
  return methods;
}

/**
 *
 * Contains public util methods
 *
 * @type {Object}
 */
BEM.methods = {
  css: (...args) => bemifyCSS(...args),
  classNames: (...args) => stingifyClassStringTokens(
    ...tokenizeClassString(...args)
  )
};

/**
 *
 * BEMifies classString DSL
 *
 * @type {Function}
 */
Object.defineProperty(BEM, 'classNames', {
  get: function () {
    return BEM.methods.css;
  },
  set: function () {}
});

/**
 *
 * BEMifies css selector + style declarations
 *
 * @type {Function}
 */
Object.defineProperty(BEM, 'css', {
  get: function () {
    return BEM.methods.css;
  },
  set: function () {}
});

/**
 *
 * Tokenizes a bem-utils' DSL-formatted classString
 *
 * @param  {String} block       The 'B' in BEM
 * @param  {String} classString The classString
 * @param  {*}      ...props    Template string interpolated vars
 * @return {Array}              prefix, block, element, modifiers
 */
export function tokenizeClassString(block, classString, ...props) {
  classString = classString.map((x, i) => x + (props[i] || '')).join('').trim();
  let prefix = '';
  let element;
  let modifiers;
  // Prefix
  if (/\+|@/.test(classString[0])) {
    if ('+@' === classString.substr(0, 2)) {
      prefix = classString.substr(0, 2);
    }
    if ('@' === classString[0]) {
      prefix = '@';
    }
  }
  // Element
  if (prefix) {
    let start = 1;
    let end = !!~classString.indexOf(' ')
      ? classString.indexOf(' ')-1
      : undefined;
    element = classString
      .substr(start, end)
      .replace(/\//g, '__')
      .replace(/\+|@/g, '');
  }
  // Modifiers
  if (prefix) {
    modifiers = classString
      .substr(
      !!~classString.indexOf(' ')
        ? classString.indexOf(' ')+1
        : classString.length)
      .split(',')
      .map(x => x.trim().replace(/\+|@/g, ''))
      .filter(x => x);
  } else {
    modifiers = classString
      .split(',')
      .map(x => x.trim())
      .filter(x => x);
  }
  return [prefix, block, element, modifiers];
}

/**
 *
 * Converts tokenized classString into an actual BEM classstring
 *
 * @param  {String} prefix    DSL prefix
 * @param  {String} block     The 'B' in BEM
 * @param  {String} element   The 'E' in BEM
 * @param  {String} modifiers The 'M' in BEM
 * @return {String}           Formatted BEM classstring
 */
export function stingifyClassStringTokens(prefix, block, element, modifiers) {
  let root = block + (element ? `__${element}` : '');
  return [
    prefix[0] === '+' ||
    !modifiers.length
      ? root
      : undefined,
    modifiers
      .map(x => `${root}--${x.replace(/\s+/g, '--')}`)
      .join(' ')
  ]
    .filter(x => x)
    .join(' ');
}

/**
 *
 * BEMifies css selector + style declarations
 *
 * @param  {String} block    The 'B' in BEM
 * @param  {Array}  slectors CSS selector declaration text
 * @return {String}          cssText
 * @example
 *   BEM('blockName').css
 *   `
 *    .default ${`
 *      color: red;
 *    `}
 *  `
 */
export function bemifyCSS(block, selectors, ...props) {
  selectors = selectors.map(x => bemifySelector(block, x));
  return props
    .map(x => x.trim())
    .filter(x => x)
    .map((x, i) => selectors[i] + `{${x.trim()}}`)
    .join('\n');
}

/**
 *
 * Parses and converts css selector + style declarations
 *
 * @param  {String} block     The 'B' in BEM
 * @param  {String} selector  css selector delcaration
 * @return {String}           The BEMified string
 */
export function bemifySelector(block, selector) {
  return selector
    .trim()
    .split(' ')
    .filter(x => x)
    .map((x, i) => [x]
      .map(x => x.replace(/\./g, '\\.'))
      .join('')
      .split(/\\/g)
      .filter(x => x)
      .map((y, j, map) => y[0] !== '.'
        ? y
        /**
         * BEM conversion
         */
        // is start of selector
        : i === 0 ||
        // or is a modifier
          j > 0
            ? `${
                // is start of selector
                i === 0 &&
                // and not a modifier
                j === 0
                  // use block prefix
                  ? `.${block}`
                  // no prefix
                  : ''
              }--${
                // append modifier
                y.substr(1)
              }`
            // start of selector segment
            : `.${
              // each level into the map,
              // append block with current element
              block += '__' + y.substr(1,
                // has pseudo selector
                !!~y.indexOf(':')
                  // append element - pseudo selector
                  ? y.indexOf(':') - 1
                  // append element
                  : undefined
              )}${
                // has pseudo selector
                !!~y.indexOf(':')
                  // add pseudo selector part back in
                  ? y.substr(y.indexOf(':'))
                  : ''
            }`))
    .map(x => x.join(''))
    .join(' ');
}
