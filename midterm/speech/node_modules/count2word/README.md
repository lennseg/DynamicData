# count2word
Calculate the number of occurrences of each word in a text.
Words less than two letters are ignored.

## Installation

```sh
$ npm i -S count2word
```


## Example

```js
const count2Word = require('count2word');

console.log(count2Word('We travel not to escape life, but for life not to escape us.'));
// => { we: 1, travel: 1, not: 2, to: 2, escape: 2, life: 2, but: 1, for: 1, us: 1 }
```

## Tests

* clone the repository

* install mocha and chai

```sh
$ npm i
```

* launch the tests

```sh
$ npm run test
```
