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

import {vi, beforeEach} from 'vitest';

/**
 * `nanoid` backs the `uuid` mixin, which InputField uses to generate the id
 * that binds a <label> to its control. Real nanoid output is random, so any
 * snapshot containing a rendered input field would pass once and then fail on
 * the next run. Hand out a deterministic sequence instead, reset per test.
 */
let sequence = 0;

vi.mock('nanoid', () => ({
  nanoid: () => `test-${++sequence}`,
}));

beforeEach(() => {
  sequence = 0;
});
