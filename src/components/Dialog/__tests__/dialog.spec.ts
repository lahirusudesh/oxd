/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import Dialog from '@/components/Dialog/Dialog.vue';

describe('Dialog > Dialog.vue', () => {
  it('should renders OXD Dialog > Dialog', () => {
    const wrapper = mount(Dialog, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog show', () => {
    const wrapper = mount(Dialog, {
      props: {show: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog no shadow', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, shadow: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog witout close', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, withClose: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog persistent', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, persistent: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog dialogContainer-div', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, dialogContainer: 'div'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('puts dialog semantics on the element that receives $attrs', () => {
    const wrapper = mount(Dialog, {
      props: {},
      attrs: {'aria-labelledby': 'dialog-title'},
    });
    const dialog = wrapper.get('[role="dialog"]');
    expect(dialog.attributes('aria-modal')).toBe('true');
    // the whole point: a consumer's naming has to land on the dialog itself,
    // not on a sibling element where it silently does nothing
    expect(dialog.attributes('aria-labelledby')).toBe('dialog-title');
    expect(dialog.classes()).toContain('oxd-dialog-sheet');
  });

  it('exposes exactly one dialog and no stray document role', () => {
    const wrapper = mount(Dialog, {props: {}});
    expect(wrapper.findAll('[role="dialog"]')).toHaveLength(1);
    expect(wrapper.findAll('[role="document"]')).toHaveLength(0);
  });

  it('gives the close button a name rather than a bare glyph', () => {
    const wrapper = mount(Dialog, {props: {withClose: true}});
    const close = wrapper.get('.oxd-dialog-close-button');
    expect(close.attributes('aria-label')).toBe('Close');
    expect(close.get('span').attributes('aria-hidden')).toBe('true');
  });

  // Overlay.vue lost its hardcoded role in the a11y change; make sure the
  // backdrop still behaves as a dismissal target.
  it('still closes when the backdrop is clicked', async () => {
    const wrapper = mount(Dialog, {props: {}});
    await wrapper.get('.oxd-overlay').trigger('click');
    expect(wrapper.emitted('update:show')).toStrictEqual([[false]]);
  });

  it('does not close a persistent dialog from the backdrop', async () => {
    const wrapper = mount(Dialog, {props: {persistent: true}});
    await wrapper.get('.oxd-overlay').trigger('click');
    expect(wrapper.emitted('update:show')).toBeUndefined();
  });
});
