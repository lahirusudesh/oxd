<!--
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
-->

<template>
  <button
    v-if="withContainer"
    :disabled="disabled"
    :class="classes"
    :aria-label="ariaLabel"
    type="button"
    @click="onClick"
  >
    <oxd-icon
      :class="{'--disabled': disabled}"
      :name="name"
      :type="iconType"
      aria-hidden="true"
    />
  </button>
  <oxd-icon
    v-else
    :name="name"
    :type="iconType"
    :class="{'oxd-icon-button__icon': true, '--disabled': disabled}"
    :aria-label="ariaLabel"
    :role="ariaLabel ? 'img' : null"
    @click="onClick"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import {ICON_TYPES} from './types';
import type {ButtonType} from './types';
import {TYPE_BOOTSTRAP, TYPES} from '../Icon/types';

export default defineComponent({
  name: 'OxdIconButton',

  components: {
    'oxd-icon': Icon,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    // The button holds only an icon, which renders as an empty <i> with no
    // text node — so without this it has no accessible name and announces as
    // just "button". Declared as a prop rather than left to attribute
    // fallthrough so precedence across the v-if/v-else pair is deterministic.
    // WCAG 4.1.2.
    ariaLabel: {
      type: String,
      required: false,
      default: null,
    },
    withContainer: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    displayType: {
      type: String,
      required: false,
      default: null,
      validator: function (value: ButtonType) {
        return !value || ICON_TYPES.indexOf(value) !== -1;
      },
    },
    iconType: {
      type: String,
      required: false,
      default: TYPE_BOOTSTRAP,
      validator: (value: string) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
  },

  emits: ['click'],

  computed: {
    classes(): object {
      return {
        'oxd-icon-button': true,
        [`oxd-icon-button--${this.displayType}`]: Boolean(this.displayType),
      };
    },
  },

  methods: {
    onClick(e: Event) {
      e.preventDefault();
      this.$emit('click', e);
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
