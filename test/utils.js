var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

let address = '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275'
let privateKey = '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'

let address1 = '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'

// a valid address
let address99 = '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'

// an address and privatey key not known in testrpc
let address17 = '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
let privateKey17 = '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'

// an address generated from a seed phrase
let mnemonic23 = 'jelly better achieve collect unaware mountain thought cargo oxygen act hood bridge'
// this is the first HD address generated
let address23 = '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275'

// a voucher code and an amount
let voucherCode11 = 'ZJLUaMqLR1'
let voucherAmount11 = 0.3141 * 10 ** 18
let voucherAmountInitial11 = 2 * 10 ** 18
let hashedVoucherCode11 = '0x182b41b125c1c14efaf188d95b6a7e2074d8b746237fc47b48beb63551d742f9'

export { address, address1, address99, privateKey, address17, privateKey17, mnemonic23, address23, voucherAmountInitial11, voucherAmount11, hashedVoucherCode11, voucherCode11 }
