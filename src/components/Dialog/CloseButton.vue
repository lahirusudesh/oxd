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
    class="oxd-dialog-close-button"
    type="button"
    :aria-label="t('general.close', 'Close')"
  >
    <span aria-hidden="true">×</span>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import usei18n from '@/composables/usei18n';

/**
 * The visible label is a bare "×", which assistive technology announces as
 * "multiplication sign" or skips entirely. aria-label gives the control a real
 * name; aria-hidden keeps the glyph from being read twice. WCAG 4.1.2.
 */
export default defineComponent({
  name: 'OxdDialogCloseButton',

  setup() {
    return {
      ...usei18n(),
    };
  },
});
</script>

<style src="./close-button.scss" lang="scss" scoped></style>
