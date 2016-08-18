var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("")
var encoding_table = new ArrayBuffer(64)
var decoding_table = new Uint8Array(64) 

/* build tables on load */
for(var i=0; i<64; i++) {
  var i = i|0
  var c = chars[i].charCodeAt(0)
  encoding_table[ c ] = i
  decoding_table[ i ] = c 
}

function decode(string) {
  "use asm";
  var length = string.length
  var buffer = new ArrayBuffer(string.length / 4 * 3)
  var enc = [,,,];
  var position = -1
  while(++position < length) {
     
  }
  return buffer;
}

window.blast64 = {
  decode: decode
}
