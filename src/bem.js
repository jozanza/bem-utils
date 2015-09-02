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
 * [BEM description]
 *
 * @param {[type]} block [description]
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
 * [methods description]
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
 * [css description]
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
 * [classNames description]
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
 * [tokenizeClassString description]
 *
 * @param  {[type]} block    [description]
 * @param  {[type]} classes  [description]
 * @param  {[type]} ...props [description]
 * @return {[type]}          [description]
 */
export function tokenizeClassString(block, classes, ...props) {
  classes = classes.map((x, i) => x + (props[i] || '')).join('').trim();
  let element = classes
    .substr(
      classes.indexOf('@')+1,
      !!~classes.indexOf(' ')
        ? classes.indexOf(' ')-1
        : undefined)
    .replace(/\//g, '__');
  let modifiers = classes
    .substr(
    !!~classes.indexOf(' ')
      ? classes.indexOf(' ')+1
      : classes.length)
    .split(',')
    .map(x => x.trim().replace('@', ''))
    .filter(x => x);
  return [block, element, modifiers];
}

/**
 *
 * [stingifyClassStringTokens description]
 *
 * @param  {[type]} block     [description]
 * @param  {[type]} element   [description]
 * @param  {[type]} modifiers [description]
 * @return {[type]}           [description]
 */
export function stingifyClassStringTokens(block, element, modifiers) {
  let root = block + (element ? `__${element}` : '');
  return [
    root,
    modifiers
      .map(x => `${root}--${x.replace(/\s+/g, '--')}`)
      .join(' ')
  ]
    .filter(x => x)
    .join(' ');
}

/**
 *
 * [bemifyCSS description]
 *
 * @param {[type]} name [description]
 * @example
 *   BEM('blockName').css
 *   `
 *    .default ${`
 *      color: red;
 *    `}
 *  `
 *  // outputs: .blockName--default{color:red;}
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
 * [bemifySelector description]
 *
 * @param  {[type]} block    [description]
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
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
