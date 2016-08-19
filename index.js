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
  var array  = new ArrayBuffer(string.length / 4 * 3),
      buffer = new Uint8Array(array),
      enc    = new Uint8Array(4),
      position = -1,
      i = 0
  while(position ^ string.length) {
    enc[0] = table[ string.charCodeAt(++position) ]
    enc[1] = table[ string.charCodeAt(++position) ]
    buffer[i++] = ( enc[0] << 2 ) | ( enc[1] >> 4 )
    enc[2] = table[ string.charCodeAt(++position) ]
    if( enc[2] & 64 )
      break
    buffer[i++] = ( (enc[1] & 15) << 4) | ( enc[2] >> 2 )
    enc[3] = table[ string.charCodeAt(++position) ]
    if( enc[3] & 64 )
      break
    buffer[i++] = ( (enc[2] & 3) << 6 ) | enc[3]
  }
  return decoder.decode( new Uint8Array(array, 0, i) )
}

function asm_decode(stdlib, ffi, heap) {
  "use asm";

  function decode(string) {
      var array  = new ArrayBuffer(string.length / 4 * 3),
          buffer = new Uint8Array(array),
          enc    = new Uint8Array(4),
          position = -1,
          i = 0
      while(position ^ string.length) {
        enc[0] = table[ string.charCodeAt(++position) ]
        enc[1] = table[ string.charCodeAt(++position) ]
        buffer[i++] = ( enc[0] << 2 ) | ( enc[1] >> 4 )
        enc[2] = table[ string.charCodeAt(++position) ]
        if( enc[2] & 64 )
          break
        buffer[i++] = ( (enc[1] & 15) << 4) | ( enc[2] >> 2 )
        enc[3] = table[ string.charCodeAt(++position) ]
        if( enc[3] & 64 )
          break
        buffer[i++] = ( (enc[2] & 3) << 6 ) | enc[3]
      }
      return decoder.decode( new Uint8Array(array, 0, i) )
    }

  return {
    decode: decode
  }
}

module.exports = {
  decode: decode,
  asm: asm_decode(window, null, new ArrayBuffer(0x150000))
}
