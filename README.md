# @rsbuild/plugin-umd

An Rsbuild plugin to generate outputs in [UMD](https://github.com/umdjs/umd) format.

<p>
  <a href="https://npmjs.com/package/@rsbuild/plugin-umd">
   <img src="https://img.shields.io/npm/v/@rsbuild/plugin-umd?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p>

## Usage

Install:

```bash
npm add @rsbuild/plugin-umd -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginUmd } from "@rsbuild/plugin-umd";

export default {
  plugins: [pluginUmd()],
};
```

## Options

### foo

Some description.

- Type: `string`
- Default: `undefined`
- Example:

```js
pluginUmd({
  foo: "bar",
});
```

## License

[MIT](./LICENSE).
