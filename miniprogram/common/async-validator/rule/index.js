import enumRule from './enum.js';
import pattern from './pattern.js';
import range from './range.js';
import required from './required.js';
import type from './type.js';
import whitespace from './whitespace.js';

export default {
    required,
    whitespace,
    type,
    range,
    enum: enumRule,
    pattern,
};
