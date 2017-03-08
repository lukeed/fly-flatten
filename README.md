# fly-flatten [![][travis-badge]][travis-link]

> Flatten all sources files to specified maximum of sub-directories.

A source's directory structure isn't always desirable in the output. With `fly-flatten`, you may dictate how many _parent directories_ of a file to keep.

## Install

```a
npm install --save-dev fly-flatten
```

## Usage

```sh
src
├── images
│   ├── img.jpg
│   ├── foo
│      ├── foo.jpg
│      ├── bar
│         ├── bar.jpg
```

```js
exports.images = function * (fly) {
  yield fly.source('src/images/**/*.jpg').flatten({ levels: 1 }).target('dist/img');
}
```

```sh
# output
dist
├── img
│   ├── img.jpg
│   ├── foo
│      ├── foo.jpg
│   ├── bar
│      ├── bar.jpg
```

## API

### .flatten(options)

#### options.levels

Type: `Number`<br>
Default: `0`

The number of sub-directories allowed **in relation to** your glob root.


## Examples

All examples use the [demo file tree](#usage) listed above.

### Level: 0

No parent directories are kept.

> **Note:** The `img` directory is kept because we've used `.target('dist/img')`.

```
dist
├── img
│   ├── img.jpg
│   ├── foo.jpg
│   ├── bar.jpg
```

### Level: 1

Each file is allowed to keep 1 parent directory.

```
dist
├── img
│   ├── img.jpg
│   ├── foo
│      ├── foo.jpg
│   ├── bar
│      ├── bar.jpg
```

### Level: 5

Our file tree is **only** 2 levels deep (`images [0]/foo [1]/bar [2]/bar.jpg`). Because our "allowed levels" exceeds our tree depth, `fly-flatten` won't do anthing and so the entire structure will be copied.

```sh
dist
├── img
│   ├── img.jpg
│   ├── foo
│      ├── foo.jpg
│      ├── bar
│         ├── bar.jpg
```


## License

MIT © [Luke Edwards](https://lukeed.com)

[travis-link]:  https://travis-ci.org/lukeed/fly-flatten
[travis-badge]: http://img.shields.io/travis/lukeed/fly-flatten.svg?style=flat-square
