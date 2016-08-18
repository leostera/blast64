var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("")
var table = new ArrayBuffer(64)
var decoder = new TextDecoder("utf8")

/* build tables on load */
for(var i=0; i<64; i++) {
  var i = i|0
  var c = chars[i].charCodeAt(0)
  table[ c ] = i
}

// in: T  W  F  u
// out: 77 97 110
function decode(string) {
  "use asm";
  var length = string.length | 0,
      array = new ArrayBuffer(string.length / 4 * 3),
      buffer = new Uint8Array(array)
      enc = [,,,],
      position = -1,
      i = 0 
  while(++position < length) {
    enc[0] = table[ string[position].charCodeAt(0) ] 
    enc[1] = table[ string[++position].charCodeAt(0) ] 
    buffer[i++] = ( enc[0] << 2 ) | ( enc[1] >> 4 ) 
    enc[2] = table[ string[++position].charCodeAt(0) ]
    if( enc[2] === 64 ) {
      break
    }
    buffer[i++] = ( (enc[1] & 15) << 4) | ( enc[2] >> 2 )
    enc[3] = table[ string[++position].charCodeAt(0) ]
    buffer[i++] = ( (enc[2] & 3) << 6 ) | enc[3]
  }
  return decoder.decode(buffer)
}

window.blast64 = {
  decode: decode
}
