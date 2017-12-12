'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParatiiEth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

var _paratiiEthVids = require('./paratii.eth.vids.js');

var _paratiiEthWallet = require('./paratii.eth.wallet.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Web3 = require('web3');
var dopts = require('default-options');

var ParatiiEth = exports.ParatiiEth = function () {
  function ParatiiEth(config) {
    _classCallCheck(this, ParatiiEth);

    var defaults = {
      provider: 'http://localhost:8545',
      registryAddress: null,
      account: {
        address: null,
        privateKey: null
      },
      web3: null,
      isTestNet: false
    };
    var options = dopts(config, defaults, { allowUnknown: true });
    this.config = config;

    if (options.web3) {
      this.web3 = options.web3;
    } else {
      this.web3 = new Web3();
      this.web3.setProvider(new this.web3.providers.HttpProvider(options.provider));
    }

    this.contracts = {};
    this.contracts.ParatiiToken = this.requireContract('ParatiiToken');
    this.contracts.ParatiiAvatar = this.requireContract('ParatiiAvatar');
    this.contracts.ParatiiRegistry = this.requireContract('ParatiiRegistry');
    this.contracts.SendEther = this.requireContract('SendEther');
    this.contracts.UserRegistry = this.requireContract('UserRegistry');
    this.contracts.VideoRegistry = this.requireContract('VideoRegistry');
    this.contracts.VideoStore = this.requireContract('VideoStore');

    this.vids = new _paratiiEthVids.ParatiiEthVids(this);

    this.wallet = (0, _paratiiEthWallet.patchWallet)(this.web3.eth.accounts.wallet);

    if (this.config.account.privateKey) {
      this.web3.eth.accounts.wallet.add(this.config.account.privateKey);
    }
  }

  _createClass(ParatiiEth, [{
    key: 'requireContract',
    value: function requireContract(contractName) {
      var artifact = require('paratii-contracts/build/contracts/' + contractName + '.json');
      var from = this.config.account.address;

      var contract = new this.web3.eth.Contract(artifact.abi, {
        from: from,
        gas: this.web3.utils.toHex(4e6),
        data: artifact.bytecode
      });
      contract.setProvider(this.web3.currentProvider);
      return contract;
    }
  }, {
    key: 'deployContract',
    value: function deployContract(name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var contract, deployedContract;
      return regeneratorRuntime.async(function deployContract$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contract = this.contracts[name];
              _context.next = 3;
              return regeneratorRuntime.awrap(contract.deploy({ arguments: args }).send());

            case 3:
              deployedContract = _context.sent;
              return _context.abrupt('return', deployedContract);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'deployContracts',
    value: function deployContracts() {
      var paratiiRegistry, paratiiRegistryAddress, paratiiAvatar, paratiiToken, sendEther, userRegistry, videoRegistry, videoStore;
      return regeneratorRuntime.async(function deployContracts$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.deployContract('ParatiiRegistry'));

            case 2:
              paratiiRegistry = _context2.sent;
              paratiiRegistryAddress = paratiiRegistry.options.address;
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.deployContract('ParatiiAvatar', paratiiRegistryAddress));

            case 6:
              paratiiAvatar = _context2.sent;
              _context2.next = 9;
              return regeneratorRuntime.awrap(this.deployContract('ParatiiToken'));

            case 9:
              paratiiToken = _context2.sent;
              _context2.next = 12;
              return regeneratorRuntime.awrap(this.deployContract('SendEther'));

            case 12:
              sendEther = _context2.sent;
              _context2.next = 15;
              return regeneratorRuntime.awrap(this.deployContract('UserRegistry', paratiiRegistryAddress));

            case 15:
              userRegistry = _context2.sent;
              _context2.next = 18;
              return regeneratorRuntime.awrap(this.deployContract('VideoRegistry', paratiiRegistryAddress));

            case 18:
              videoRegistry = _context2.sent;
              _context2.next = 21;
              return regeneratorRuntime.awrap(this.deployContract('VideoStore', paratiiRegistryAddress));

            case 21:
              videoStore = _context2.sent;
              _context2.next = 24;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('ParatiiAvatar', paratiiAvatar.options.address).send());

            case 24:
              _context2.next = 26;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('ParatiiToken', paratiiToken.options.address).send());

            case 26:
              _context2.next = 28;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('SendEther', sendEther.options.address).send());

            case 28:
              _context2.next = 30;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('VideoRegistry', videoRegistry.options.address).send());

            case 30:
              _context2.next = 32;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('VideoStore', videoStore.options.address).send());

            case 32:
              _context2.next = 34;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerAddress('UserRegistry', userRegistry.options.address).send());

            case 34:
              _context2.next = 36;
              return regeneratorRuntime.awrap(paratiiRegistry.methods.registerUint('VideoRedistributionPoolShare', this.web3.utils.toWei('0.3')).send());

            case 36:
              _context2.next = 38;
              return regeneratorRuntime.awrap(paratiiAvatar.methods.addToWhitelist(videoStore.address).send());

            case 38:

              this.contracts = {
                ParatiiAvatar: paratiiAvatar,
                ParatiiRegistry: paratiiRegistry,
                ParatiiToken: paratiiToken,
                SendEther: sendEther,
                UserRegistry: userRegistry,
                VideoRegistry: videoRegistry,
                VideoStore: videoStore
              };
              this.config.registryAddress = paratiiRegistryAddress;

              return _context2.abrupt('return', this.contracts);

            case 41:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'getContracts',
    value: function getContracts() {
      var name, contract, address;
      return regeneratorRuntime.async(function getContracts$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = regeneratorRuntime.keys(this.contracts);

            case 1:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 11;
                break;
              }

              name = _context3.t1.value;
              contract = this.contracts[name];

              if (contract.options.address) {
                _context3.next = 9;
                break;
              }

              _context3.next = 7;
              return regeneratorRuntime.awrap(this.getContractAddress(name));

            case 7:
              address = _context3.sent;

              if (address && address !== '0x0') {
                contract.options.address = address;
              }

            case 9:
              _context3.next = 1;
              break;

            case 11:
              return _context3.abrupt('return', this.contracts);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'getContract',
    value: function getContract(name) {
      var contract, address;
      return regeneratorRuntime.async(function getContract$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              contract = this.contracts[name];

              if (contract) {
                _context4.next = 3;
                break;
              }

              throw Error('No contract with name "' + name + '" is known');

            case 3:
              if (contract.options.address) {
                _context4.next = 8;
                break;
              }

              _context4.next = 6;
              return regeneratorRuntime.awrap(this.getContractAddress(name));

            case 6:
              address = _context4.sent;

              if (address && address !== '0x0') {
                contract.options.address = address;
              }

            case 8:
              return _context4.abrupt('return', contract);

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'getContractAddress',
    value: function getContractAddress(name) {
      var registryAddress, registry, address;
      return regeneratorRuntime.async(function getContractAddress$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              registryAddress = this.getRegistryAddress();

              if (!(name === 'ParatiiRegistry')) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt('return', registryAddress);

            case 3:
              if (registryAddress) {
                _context5.next = 5;
                break;
              }

              throw Error('No registry address configured');

            case 5:
              _context5.prev = 5;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.getContract('ParatiiRegistry'));

            case 8:
              registry = _context5.sent;

              if (registry) {
                _context5.next = 11;
                break;
              }

              throw Error('No registry contract!');

            case 11:
              _context5.next = 13;
              return regeneratorRuntime.awrap(registry.methods.getContract(name).call());

            case 13:
              address = _context5.sent;
              return _context5.abrupt('return', address);

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5['catch'](5);

              console.log(_context5.t0);
              throw _context5.t0;

            case 21:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this, [[5, 17]]);
    }
  }, {
    key: 'getRegistryAddress',
    value: function getRegistryAddress() {
      return this.config.registryAddress;
    }
  }, {
    key: 'setRegistryAddress',
    value: function setRegistryAddress(registryAddress) {
      this.config.registryAddress = registryAddress;
    }
  }, {
    key: 'balanceOf',
    value: function balanceOf(address, symbol) {
      var balance, balances, contract;
      return regeneratorRuntime.async(function balanceOf$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              balance = void 0;
              balances = {};

              // TODO: use default-options for argument type checking

              if (!(symbol && !['PTI', 'ETH'].includes(symbol))) {
                _context6.next = 4;
                break;
              }

              throw Error('Unknown symbol "' + symbol + '", must be one of "ETH", "PTI"');

            case 4:
              if (!(!symbol || symbol === 'ETH')) {
                _context6.next = 9;
                break;
              }

              _context6.next = 7;
              return regeneratorRuntime.awrap(this.web3.eth.getBalance(address));

            case 7:
              balance = _context6.sent;

              balances.ETH = balance;

            case 9:
              if (!(!symbol || symbol === 'PTI')) {
                _context6.next = 17;
                break;
              }

              _context6.next = 12;
              return regeneratorRuntime.awrap(this.getContract('ParatiiToken'));

            case 12:
              contract = _context6.sent;
              _context6.next = 15;
              return regeneratorRuntime.awrap(contract.methods.balanceOf(address).call());

            case 15:
              balance = _context6.sent;

              balances.PTI = balance;

            case 17:
              if (!symbol) {
                _context6.next = 21;
                break;
              }

              return _context6.abrupt('return', balance);

            case 21:
              return _context6.abrupt('return', balances);

            case 22:
            case 'end':
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_transferETH',
    value: function _transferETH(beneficiary, amount) {
      var from, result;
      return regeneratorRuntime.async(function _transferETH$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              // @args amount is in Wei
              // TODO: use the SendEther contract
              // TODO: this will only work on testrpc with unlocked accounts..
              from = this.config.account.address;

              if (from) {
                _context7.next = 3;
                break;
              }

              throw Error('No account set! Cannot send transactions');

            case 3:
              if (beneficiary) {
                _context7.next = 5;
                break;
              }

              throw Error('No beneficiary given.');

            case 5:
              from = (0, _utils.add0x)(from);
              beneficiary = (0, _utils.add0x)(beneficiary);

              _context7.next = 9;
              return regeneratorRuntime.awrap(this.web3.eth.sendTransaction({
                from: from,
                to: beneficiary,
                value: amount,
                gasPrice: 20000000000
              }));

            case 9:
              result = _context7.sent;
              return _context7.abrupt('return', result);

            case 11:
            case 'end':
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_transferPTI',
    value: function _transferPTI(beneficiary, amount) {
      var contract, from, result;
      return regeneratorRuntime.async(function _transferPTI$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.getContract('ParatiiToken'));

            case 2:
              contract = _context8.sent;

              if (!(!contract.options || !contract.options.address)) {
                _context8.next = 5;
                break;
              }

              throw Error('No ParatiiToken contract known - please run paratii.diagnose()');

            case 5:
              from = this.config.account.address;

              if (from) {
                _context8.next = 8;
                break;
              }

              throw Error('No account set! Cannot send transactions');

            case 8:
              from = (0, _utils.add0x)(from);
              beneficiary = (0, _utils.add0x)(beneficiary);

              _context8.next = 12;
              return regeneratorRuntime.awrap(contract.methods.transfer(beneficiary, amount).send({ gas: 200000, from: from }));

            case 12:
              result = _context8.sent;
              return _context8.abrupt('return', result);

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'transfer',
    value: function transfer(beneficiary, amount, symbol) {
      return regeneratorRuntime.async(function transfer$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(symbol === 'ETH')) {
                _context9.next = 4;
                break;
              }

              return _context9.abrupt('return', this._transferETH(beneficiary, amount));

            case 4:
              if (!(symbol === 'PTI')) {
                _context9.next = 6;
                break;
              }

              return _context9.abrupt('return', this._transferPTI(beneficiary, amount));

            case 6:
            case 'end':
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ParatiiEth;
}();