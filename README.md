# ⚡️ blast64
> Apparently the fastest way of decoding Base64 in Chrome.

## Installation

```
npm install blast64
```

## Usage

```javascript
var blast64 = require('blast64');

// From base64 to UTF-8 string
blast64.decode(base64string);

// From base64 to Uint8Array
blast64.decode_to_array(base64string);
```

## Testing and Benchmark

This is the average time from encoded string to UTF-8 encoded result.

The 💓  was ran `10000000` times.

The ~355kb payload was ran `1000` times.

| Load   | js-base64  | fast64    | base64-js | blast64   | btoa[0]     |
|--------|------------|-----------|-----------|-----------|-----------|
| 💓      | 0.0025 ms  | 0.0031 ms | 0.0018 ms | 0.0010 ms | 0.0009 ms |
| ~355kb | 4.5263 ms  | 2.9529 ms | 1.7501 ms | 1.3920 ms | 1.0423 ms |

Not bad for a few hours of hacking I'd say! But it's still only decoding, would have to sit down and make it encode as well at some point.

[0] btoa has one big caveat explained here: [The Unicode Problem](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem)
