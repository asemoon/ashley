'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FactoryProvider = function () {
  function FactoryProvider(bindName, container, fn, dependencies) {
    _classCallCheck(this, FactoryProvider);

    this.bindName = bindName;
    this.container = container;
    this.fn = fn;
    this.dependencies = dependencies;
  }

  _createClass(FactoryProvider, [{
    key: 'create',
    value: async function create() {
      var dependencies = await this.container.resolveAll(this.dependencies);
      return this.fn.apply(this, _toConsumableArray(dependencies));
    }
  }]);

  return FactoryProvider;
}();

module.exports = FactoryProvider;