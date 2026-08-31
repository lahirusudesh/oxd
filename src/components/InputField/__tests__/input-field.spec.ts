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
import {formKey} from '@/composables/types';
import type {FormAPI} from '@/composables/types';
import {describe, expect, it, vi} from 'vitest';
import InputField from '@/components/InputField/InputField.vue';

describe('InputField.vue', () => {
  const mockFormAPI: FormAPI = {
    searchErrors: vi.fn(() => []),
    purgeErrors: vi.fn(),
    addError: vi.fn(),
    registerField: vi.fn(),
    unregisterField: vi.fn(),
  };
  it('renders OXD InputField', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `input`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'file',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file` with button', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'file',
        buttonLabel: 'Browse',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `textarea`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'textarea',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  const mountField = (props: Record<string, unknown>) =>
    mount(InputField, {
      props: {modelValue: null, ...props},
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });

  it('associates the label with its control when no id is passed', () => {
    const wrapper = mountField({label: 'First Name'});
    const id = wrapper.get('input').attributes('id');
    expect(id).toBeTruthy();
    expect(wrapper.get('label').attributes('for')).toBe(id);
  });

  it('uses a consumer supplied id verbatim', () => {
    const wrapper = mountField({label: 'First Name', id: 'first-name'});
    expect(wrapper.get('input').attributes('id')).toBe('first-name');
    expect(wrapper.get('label').attributes('for')).toBe('first-name');
  });

  it('generates a distinct id per instance', () => {
    const first = mountField({label: 'First Name'});
    const second = mountField({label: 'Last Name'});
    expect(first.get('input').attributes('id')).not.toBe(
      second.get('input').attributes('id'),
    );
  });

  it('associates the label for every labelable type', () => {
    ['input', 'password', 'textarea', 'file'].forEach((type) => {
      const wrapper = mountField({label: 'Field', type});
      const control = wrapper.get(type === 'textarea' ? 'textarea' : 'input');
      expect(wrapper.get('label').attributes('for')).toBe(
        control.attributes('id'),
      );
    });
  });

  it('does not point `for` at a wrapper that is not a form control', () => {
    // a `for` resolving to a <div> leaves the control unnamed and adds an
    // orphaned-label failure on top; those types need naming of their own
    const wrapper = mountField({label: 'Choose', type: 'select', options: []});
    expect(wrapper.get('label').attributes('for')).toBeUndefined();
  });
});
