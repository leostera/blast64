var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("")
var table = new ArrayBuffer(64)
var decoder = new TextDecoder("utf8")

/* build tables on load */
for(var i=0; i<65; i++) {
  var c = chars[i].charCodeAt(0)
  table[ c ] = i
}

/* internal heap */
var HEAP_SIZE = 1000000000
var HEAP = new ArrayBuffer(HEAP_SIZE)
function decode(string) {
  return decoder.decode(decode_to_array(string))
}

function decode_to_array(string) {
  var len = _base64_decode(string, string.length, HEAP)
  return new Uint8Array(HEAP, 0, len)
}

function _base64_decode(string, length, array) {
  lenght = length | 0
  var buffer = new Uint8Array(array),
      tmp = 0,
      position = -1,
      i = 0,
      pad1 = 0,
      pad2 = 0

  while(position^length) {
    tmp = ((table[string.charCodeAt(++position)]) << 18)
        | ((table[string.charCodeAt(++position)]) << 12)
        | ((pad1=table[string.charCodeAt(++position)]) << 6)
        | ((pad2=table[string.charCodeAt(++position)]) )
    buffer[i++] = (tmp >> 16)
    if(!(pad1^64)) break
    buffer[i++] = (tmp >> 8)
    if(!(pad2^64)) break
    buffer[i++] = tmp
    if(position>length) break
  }

  return i
}

module.exports = {
  decode: decode,
  decode_to_array: decode_to_array
}
