import { defineConfig, definePattern } from '@pandacss/dev';

const ellipsis = definePattern({
  description: 'Adds text overflow ellipsis style with line clamp',
  defaultValues: {
    lines: 1,
    maxWidth: undefined,
  },
  properties: {
    lines: { type: 'number' },
    maxWidth: { type: 'string' },
  },
  transform(props) {
    const { lines, maxWidth, ...rest } = props;
    return {
      ...rest,
      lineClamp: lines,
      WebkitLineClamp: lines,
      maxWidth,
      display: 'flex',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      wordBreak: 'break-word',
    };
  },
});

const scrollable = definePattern({
  description: 'A container that allows for scrolling',
  defaultValues: {
    direction: 'vertical',
    hideScrollbar: true,
  },
  properties: {
    // The direction of the scroll
    direction: { type: 'enum', value: ['horizontal', 'vertical'] },
    // Whether to hide the scrollbar
    hideScrollbar: { type: 'boolean' },
  },
  // disallow the `overflow` property (in TypeScript)
  blocklist: ['overflow'],
  transform(props) {
    const { direction, hideScrollbar, ...rest } = props;
    return {
      overflow: 'auto',
      height: direction === 'horizontal' ? '100%' : 'auto',
      width: direction === 'vertical' ? '100%' : 'auto',
      scrollbarWidth: hideScrollbar ? 'none' : 'auto',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: hideScrollbar ? 'none' : 'auto',
      },
      ...rest,
    };
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  syntax: 'object-literal',
  jsxFramework: 'react',
  // The output directory for your css system
  outdir: 'styled-system',
  patterns: {
    extend: {
      ellipsis,
      scrollable,
    },
  },
});
