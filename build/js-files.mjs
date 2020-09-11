/**
 * @file JS minify process.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

import { minify } from 'terser';
