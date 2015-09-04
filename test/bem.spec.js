'use strict';

import { expect } from 'chai';
const BEM = require('../src/bem').default;
const block = 'test';
const { classNames: cx, css } = BEM(block);

describe('BEM module', () => {

  it('should return block className if classString is empty', () => {

    // ``
    // test
    expect(cx``).to.equal(
      `${block}`
    );

  })

  it('should create root modifier classsNames when prefix char is omitted', () => {

    // default
    // test--default
    expect(cx`default`).to.equal(
      `${block}--default`
    );

    // default, big
    // test--default
    expect(cx`default, big`).to.equal(
      `${block}--default ${block}--big`
    );

    // default, big, big tall
    // test--default
    expect(cx`default, big, big tall`).to.equal(
      `${block}--default ${block}--big ${block}--big--tall`
    );

  });

  it('should create legit classNames in various scenarios with `+@` prefix', () => {

    // +@
    // test
    expect(cx`+@`).to.equal(
      `${block}`
    );

    // +@ default
    // test test--default
    expect(cx`+@ default`).to.equal(
      `${block} ${block}--default`
    );

    // +@ default, tall big
    // test test--default test--tall--big
    expect(cx`+@ default, tall big`).to.equal(
      `${block} ${block}--default ${block}--tall--big`
    );

    // +@content
    // test__content
    expect(cx`+@content`).to.equal(
      `${block}__content`
    );

    // +@content/icon pink light
    // test__content__icon test__content__icon--pink--light
    expect(cx`+@content/icon pink light`).to.equal(
      `${block}__content__icon ${block}__content__icon--pink--light`
    );

    // +@content/text large, purple
    // test__content__text test__content__text--large test__content__text--purple
    expect(cx`+@content/text large, purple`).to.equal(
      `${block}__content__text ${block}__content__text--large ${block}__content__text--purple`
    );

    // +@a/b/c/d/e/f/g
    // test__a__b__c__d__e__f__g
    expect(cx`+@a/b/c/d/e/f/g`).to.equal(
      `${block}__a__b__c__d__e__f__g`
    );

  });

  it('should create legit classNames in various scenarios with `@` prefix', () => {

    // @
    // test
    expect(cx`@`).to.equal(
      `${block}`
    );

    // @ default
    // test test--default
    expect(cx`@ default`).to.equal(
      `${block}--default`
    );

    // @ default, tall big
    // test test--default test--tall--big
    expect(cx`@ default, tall big`).to.equal(
      `${block}--default ${block}--tall--big`
    );

    // @content
    // test__content
    expect(cx`@content`).to.equal(
      `${block}__content`
    );

    // @content/icon pink light
    // test__content__icon test__content__icon--pink--light
    expect(cx`@content/icon pink light`).to.equal(
      `${block}__content__icon--pink--light`
    );

    // @content/text large, purple
    // test__content__text test__content__text--large test__content__text--purple
    expect(cx`@content/text large, purple`).to.equal(
      `${block}__content__text--large ${block}__content__text--purple`
    );

    // @a/b/c/d/e/f/g
    // test__a__b__c__d__e__f__g
    expect(cx`@a/b/c/d/e/f/g`).to.equal(
      `${block}__a__b__c__d__e__f__g`
    );

  });

  it('should apply BEM prefix to css selector text', () => {

    // .test--default {
    //   color: #000;
    // }
    {
      let dec = `color: #000;`;
      expect(css`
        .default ${dec}
      `).to.equal(
        `.${block}--default{${dec.trim()}}`
      );
    }

    // .test--default--big span .test__text--purple {
    //   color: purple;
    // }
    {
      let dec = `color: purple;`;
      expect(css`
        .default.big span .text.purple ${dec}
      `).to.equal(
        `.${block}--default--big span .${block}__text--purple{${dec.trim()}}`
      );
    }

    // .test--default--big span .test__text .test__text__purple {
    //   color: purple;
    // }
    {
      let dec = `
        color: purple;
      `;
      expect(css`
        .default.big span .text .purple ${dec}
      `).to.equal(
        `.${block}--default--big span .${block}__text .${block}__text__purple{${dec.trim()}}`
      );
    }

    // .test--big test__content:hover > div:nth-child(3) + p .test__content__icon--pink--light {
    //   color: pink;
    //   opacity: .1;
    //   border: 1px solid hotpink;
    // }
    {
      let dec = `
        color: pink;
        opacity: .1;
        border: 1px solid hotpink;
      `;
      expect(css`
        .big .content:hover > div:nth-child(3) + p .icon.pink.light ${dec}
      `).to.equal(
        `.${block}--big .${block}__content:hover > div:nth-child(3) + p .${block}__content__icon--pink--light{${dec.trim()}}`
      );
    }

  });

});
