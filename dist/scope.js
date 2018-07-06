'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var errors = require('./errors');

var Scope = function () {
  function Scope(provider, options) {
    _classCallCheck(this, Scope);

    this.provider = provider;
    this.options = _.defaults(options, {
      setup: false,
      clone: false
    });
  }

  _createClass(Scope, [{
    key: '_setupInstance',
    value: async function _setupInstance(instance) {
      var setup = this.options.setup;


      if (setup) {
        if (_.isFunction(setup)) {
          return setup(instance);
        } else {
          throw new errors.Error('Expected "setup" be to a function but got "' + setup + '".');
        }
      }
    }
  }]);

  return Scope;
}();

module.exports = Scope;