# blast64

What seems to be a base64 decoder that's faster than [superhuman/fast64](https://github.com/superhuman/fast64).

Benchmark runnable by serving `test/index.html`, and looking at the console output (is nice, I promise):


#### Benchmark

This is the average time from encoded string to UTF-8 encoded result.

The 💓  was ran `10000000` times.

The ~355kb payload was ran `1000` times.

| Load   | js-base64  | fast64    | base64-js | blast64   | btoa*     |
|--------|------------|-----------|-----------|-----------|-----------|
| 💓      | 0.0025 ms  | 0.0031 ms | 0.0018 ms | 0.0010 ms | 0.0009 ms |
| ~355kb | 4.5263 ms  | 2.9529 ms | 1.7501 ms | 1.3920 ms | 1.0423 ms |

Not bad for a few hours of hacking I'd say! But it's still only decoding, would have to sit down and make it encode as well at some point.

* btoa has one big caveat explained here: [The Unicode Problem](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem)
