# tiny-function

The tiny function compute framework for Node.js.

[![Node.js CI](https://github.com/JacksonTian/tiny-function/actions/workflows/ci.yml/badge.svg)](https://github.com/JacksonTian/tiny-function/actions/workflows/ci.yml)
[![codecov][cov-image]][cov-url]
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@jacksontian/tiny-function.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@jacksontian/tiny-function
[cov-image]: https://codecov.io/gh/JacksonTian/tiny-function/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/JacksonTian/tiny-function
[download-image]: https://img.shields.io/npm/dm/@jacksontian/tiny-function.svg?style=flat-square
[download-url]: https://npmjs.org/package/@jacksontian/tiny-function

## Installation

```bash
npm install @jacksontian/tiny-function --save
```

## Usage

```js
import { createFunction, read } from '@jacksontian/tiny-function';

const fun = createFunction(async (req, res) => {
    res.writeHead(200);
    const body = await read(req, 'utf8');
    res.end(body);
});

// start function
await fun.start();

// call the function
const { body } = await fun.call({
    message: 'Hello world!'
});
console.log(body);
```

## License

The [MIT License](./LICENSE).
