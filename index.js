var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("")
var table = new ArrayBuffer(64)
var decoder = new TextDecoder("utf8")

/* build tables on load */
for(var i=0; i<65; i++) {
  var c = chars[i].charCodeAt(0)
  table[ c ] = i
}

// in: T  W  F  u
// out: 77 97 110
function decode(string) {

}

function decode(string) {
  var array = new ArrayBuffer((string.length) / 4 * 3)
  var len   = _base64_decode(string, string.length, array)
  return decoder.decode( new Uint8Array(array, 0, len) )
}

function _base64_decode(string, length, array) {
  var buffer = new Uint8Array(array),
      tmp = 0,
      position = -1,
      i = 0

  var placeholders = '=' === string.charAt(length - 2) ? 2 :
                     '=' === string.charAt(length - 1) ? 1 : 0
  length = placeholders > 0 ? length-4 : length

  while(position^length) {
    tmp = ((table[string.charCodeAt(++position)]) << 18)
        | ((table[string.charCodeAt(++position)]) << 12)
        | ((table[string.charCodeAt(++position)]) << 6)
        | ((table[string.charCodeAt(++position)]) )
    buffer[i++] = (tmp >> 16)
    buffer[i++] = (tmp >> 8)
    if(position>length) break
    buffer[i++] = tmp & 0xFF
    console.log(string, length, position, buffer)
  }

  return i
}

module.exports = {
  decode: decode
}
