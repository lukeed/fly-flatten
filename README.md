<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> [Flatten](https://github.com/lukeed/fly-flatten) plugin for _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]
[![][mit-badge]][mit]

## Usage
> Check out the [documentation](PLUGIN_DOCUMENTATION) to see the available options.

### Install

```a
npm install -D fly-flatten
```

### API
#### levels

*The number of parent directory levels to include.*

Default: 0

### Example

```js
export function* images() {
  const src = ['app/images/**/*.{jpg,png,gif}']

  yield this.source(src)
    .flatten({
      levels: 1
    })
    .target('dist/img')
}
```

## License

[MIT][mit] © [Luke Edwards][author] et [al][contributors]


[mit]:          http://opensource.org/licenses/MIT
[author]:       https://lukeed.com
[contributors]: https://github.com/lukeed/fly-flatten/graphs/contributors
[releases]:     https://github.com/lukeed/fly-flatten/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-flatten
[npm-ver-link]: https://img.shields.io/npm/v/fly-flatten.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-flatten.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-flatten
[travis-badge]: http://img.shields.io/travis/lukeed/fly-flatten.svg?style=flat-square
