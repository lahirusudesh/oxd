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
import IconButton from '@/components/Button/Icon.vue';

describe('Button > Icon.vue', () => {
  it('should renders OXD icon button', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', withContainer: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD icon button with container', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('exposes an accessible name and hides the decorative glyph', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', ariaLabel: 'Delete record'},
    });
    expect(wrapper.get('button').attributes('aria-label')).toBe(
      'Delete record',
    );
    // the icon carries no text node, so it must not be announced alongside
    // the name it is standing in for
    expect(wrapper.get('i').attributes('aria-hidden')).toBe('true');
  });

  it('keeps its name while disabled', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', ariaLabel: 'Delete record', disabled: true},
    });
    expect(wrapper.get('button').attributes('aria-label')).toBe(
      'Delete record',
    );
  });

  it('names the container-less icon and marks it as an image', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', ariaLabel: 'Delete record', withContainer: false},
    });
    expect(wrapper.get('i').attributes('aria-label')).toBe('Delete record');
    expect(wrapper.get('i').attributes('role')).toBe('img');
  });
});
