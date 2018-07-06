'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errors = require('./errors');

/*
 * Holds all of the configured binds and creates their instances by name. It's
 * used by the container to create binds for the individual "binds". It's
 * abstracted so that the container doesn't depend on specific implementations
 * and can be configured with a different set implementations if necessary.
 */

var BindFactory = function () {
  function BindFactory(mapping, BindValidator) {
    _classCallCheck(this, BindFactory);

    this._mapping = mapping;
    this._BindValidator = BindValidator;
  }

  _createClass(BindFactory, [{
    key: 'create',
    value: function create(bindType) {
      if (this._mapping[bindType]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        args.push(this._BindValidator);
        return new (Function.prototype.bind.apply(this._mapping[bindType], [null].concat(args)))();
      }

      throw new errors.Error('Unknown bind "' + bindType + '".');
    }
  }]);

  return BindFactory;
}();

module.exports = BindFactory;