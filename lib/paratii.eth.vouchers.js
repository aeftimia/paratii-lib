import { getInfoFromLogs, NULL_ADDRESS } from './utils.js'
let dopts = require('default-options')

export class ParatiiEthVouchers {
  constructor (context) {
    // context is a ParatiiEth instance
    this.eth = context
  }

  async getVouchersContract () {
    let contract = await this.eth.getContract('Vouchers')
    if (contract.options.address === '0x0') {
      throw Error('There is not Vouchers contract known in the registry')
    }
    return contract
  }

  async create (options) {
    let defaults = {
      voucherCode: undefined,
      amount: undefined
    }
    options = dopts(options, defaults)

    if (options.voucherCode === null) {
      let msg = `Voucher Code argument must not be null`
      throw Error(msg)
    }
    if (typeof options.voucherCode !== 'string') {
      let msg = `Voucher Code argument needs to be a string`
      throw Error(msg)
    }
    if (typeof options.amount !== 'number') {
      let msg = `Amount argument needs to be a number`
      throw Error(msg)
    }
    if (options.amount === 0) {
      let msg = `Amount needs to be greater than zero`
      throw Error(msg)
    }

    let contract = await this.getVouchersContract()
    let hashedVoucher = await contract.methods.hashVoucher(options.voucherCode).call()
    let tx = await contract.methods.create(
      hashedVoucher,
      options.amount
    ).send()
    let voucherId = getInfoFromLogs(tx, 'LogCreateVoucher', '_hashedVoucher')

    return voucherId
  }

  async test () {
    throw Error('test error message')
  }

  async redeem (voucherCode) {
    let contract = await this.getVouchersContract()
    let thisVoucher = await contract.methods.vouchers(voucherCode).call()
    let thisVoucherClaimant = String(thisVoucher[0])
    let thisVoucherAmount = Number(thisVoucher[1])
    let voucherContractBalance = Number(await this.eth.balanceOf(contract.options.address, 'PTI'))
    if (thisVoucherClaimant !== String(NULL_ADDRESS)) {
      throw Error(`This voucher was already used`)
    }
    if (thisVoucherAmount > voucherContractBalance) {
      throw Error(`The Vouchers contract doesn't have enough PTI to redeem the voucher`)
    }
    if (thisVoucherAmount === Number(0)) {
      throw Error(`This voucher doesn't exist`)
    }
    let tx = await contract.methods.redeem(voucherCode).send()
    console.log(tx)
    try {
      let claimant = getInfoFromLogs(tx, 'LogRedeemVoucher', '_claimant')
      if (claimant === this.eth.config.account.address) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      throw Error(`An unknown error occurred`)
    }
  }
}