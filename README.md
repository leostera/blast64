# blast64

What seems to be a base64 decoder that's faster than [superhuman/fast64](https://github.com/superhuman/fast64).

From running on latest Chrome, 10 rounds of 1000 executions with [their sample HTML string](https://github.com/superhuman/fast64/blob/master/test/sample.js) using the following code:

```javascript
for(var i=0; i<10; i++) {
  var t0 = Date.now()
  for(var j=0; j<1000; j++) {
    decode(sample)
  }
  var t1 = Date.now()
  console.log("#",i,"=>",t1 - t0,"ms")
}
```

we get:

| Round | fast64   | blast64  |
|-------|----------|----------|
| #0    |  3023 ms |  1916 ms |
| #1    |  3072 ms |  1816 ms |
| #2    |  3138 ms |  1817 ms |
| #3    |  3142 ms |  1791 ms |
| #4    |  3178 ms |  1814 ms |
| #5    |  3148 ms |  1831 ms |
| #6    |  2999 ms |  1774 ms |
| #7    |  2988 ms |  2079 ms |
| #8    |  3068 ms |  1888 ms |
| #9    |  3200 ms |  1916 ms |

Not bad for a few hours of hacking I'd say! But it's still only decoding, would have to sit down and make it encode as well at some point.
