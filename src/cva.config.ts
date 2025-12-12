import { defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

export type { VariantProps } from 'cva';

const themedTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ['floating-card'],
      leading: ['base'],
    },
  },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => themedTwMerge(className),
  },
});
