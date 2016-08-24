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

| Load   | atob+TextDecoder | js-base64  | fast64    | base64-js | blast64   |
|--------|------------------|------------|-----------|-----------|-----------|
| 💓      | 0.0019 ms        | 0.0025 ms  | 0.0031 ms | 0.0018 ms | 0.0010 ms |
| ~355kb | 31.257 ms        | 4.5263 ms  | 2.9529 ms | 1.7501 ms | 1.3920 ms |

And this are the average times without the `TextDecoder` step where relevant:

| Load   | fast64[0] | atob      | blast64.decode_to_array   |
|--------|-----------|-----------|---------------------------|
| 💓      | 0.0017 ms | 0.0008 ms | 0.0005 ms                 |
| ~355kb | 2.5336 ms | 1.7580 ms | 1.0701 ms                 |

[0] `fast64.decode(str, {uint8Array: true})`

Not bad for a few hours of hacking I'd say! But it's still only decoding, would have to sit down and make it encode as well at some point.

