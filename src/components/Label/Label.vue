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
  <label :for="id" :class="classes">
    {{ label }}
  </label>
</template>

<script lang="ts">
export default {
  name: 'OxdLabel',

  props: {
    label: {
      type: String,
      required: true,
    },
    // Id of the control this label names. A label binds to its control only
    // through for/id, so without it the control has no accessible name.
    // WCAG 1.3.1 / 3.3.2 / 4.1.2.
    id: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-label': true,
      };
    },
  },
};
</script>

<style src="./label.scss" lang="scss" scoped></style>
