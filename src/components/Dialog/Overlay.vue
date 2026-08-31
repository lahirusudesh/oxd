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
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The overlay is a backdrop, so it carries no role. It holds none of the
 * dialog's content and never receives the consumer's naming attributes, so
 * the role="dialog" it used to hardcode only added a second, empty dialog to
 * the tree — and one on every non-dialog backdrop too, such as the layout's.
 * The element that owns the content declares the role instead.
 */
export default defineComponent({
  name: 'OxdOverlay',

  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    centered: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-overlay': true,
        'oxd-overlay--flex': true,
        'oxd-overlay--flex-centered': this.centered,
        'oxd-overlay--hide': !this.show,
      };
    },
  },
});
</script>

<style src="./overlay.scss" lang="scss" scoped></style>
