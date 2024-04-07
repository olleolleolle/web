import { compile } from '@storybook/mdx2-csf';
import type { Options } from '@storybook/types';
import { readFile } from 'fs-extra';
import remarkExternalLinks from 'remark-external-links';
import remarkSlug from 'remark-slug';
import type { Plugin } from 'rollup';

export function rollupPluginMdx(storybookOptions: Options): Plugin {
  let mdxPluginOptions: Record<string, any>;
  let jsxOptions: Record<string, any>;

  return {
    name: 'rollup-plugin-mdx',

    async buildStart() {
      ({ mdxPluginOptions, jsxOptions } = await storybookOptions.presets.apply<Record<string, any>>(
        'options',
        {},
      ));
    },

    async resolveId(id) {
      if (id.endsWith('.mdx.js')) {
        return id;
      }
    },

    async load(id) {
      if (!id.endsWith('.mdx.js')) return;

      const mdxPath = id.replace(/\.js$/, '');
      const mdxCode = await readFile(mdxPath, 'utf8');

      const mdxLoaderOptions = await storybookOptions.presets.apply('mdxLoaderOptions', {
        ...mdxPluginOptions,
        mdxCompileOptions: {
          providerImportSource: '@mdx-js/react',
          ...mdxPluginOptions?.mdxCompileOptions,
          remarkPlugins: [remarkSlug, remarkExternalLinks].concat(
            mdxPluginOptions?.mdxCompileOptions?.remarkPlugins ?? [],
          ),
        },
        jsxOptions,
      });

      const jsCode = compile(mdxCode, {
        skipCsf: true,
        ...mdxLoaderOptions,
      });

      return jsCode;
    },
  };
}
