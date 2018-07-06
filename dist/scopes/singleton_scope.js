'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scope = require('../scope');

/*
 * Singleton scope makes sure that only one instance of the target object is
 * created within the associated container.
 *
 * Note that the creation process needs to be synchronized. While it's true that
 * Node.js runs user code on a single thread and thus it's not necessary to
 * worry about data races or race conditions in the traditional sense, it's
 * still possible to have synchronization issues when an asynchronous IO is
 * involved (applies to timers, callbacks and others as well).
 *
 * In this particular case, the call to "provider.create()" might be
 * asynchronous. For example, the instance might have an "initialize" method
 * which will attempt to establish a connection to a database. The runtime will
 * handle the case by asking the OS to be notified when the connection is ready
 * and process other items on the event loop in the meantime. However, the next
 * item on the event loop might be another request for the instance. This can
 * happen very easily when the application is starting up. One possible solution
 * (used here) is to create what's essentially a spin lock and wait for the
 * instance to become available. The contract here is that it's up to the
 * programmer to ensure that the "initialize" method succeeds or throws an
 * exception.
 *
 */

var SingletonScope = function (_Scope) {
  _inherits(SingletonScope, _Scope);

  function SingletonScope(provider, options) {
    _classCallCheck(this, SingletonScope);

    var _this = _possibleConstructorReturn(this, (SingletonScope.__proto__ || Object.getPrototypeOf(SingletonScope)).call(this, provider, options));

    _this._instance = null;
    _this._creating = false;
    return _this;
  }

  _createClass(SingletonScope, [{
    key: 'get',
    value: async function get() {
      if (this._instance) {
        return this._instance;
      }

      while (this._creating) {
        await new Promise(function (resolve) {
          return setTimeout(resolve, 50);
        });
      }

      if (!this._instance) {
        this._creating = true;

        try {
          var instance = await this.provider.create();
          await this._setupInstance(instance);
          this._instance = instance;
        } catch (e) {
          this._creating = false;
          throw e;
        }

        this._creating = false;
      }

      return this._instance;
    }
  }, {
    key: 'deinitialize',
    value: async function deinitialize() {
      var instance = this._instance;
      this._instance = null;
      return this.provider.deinitializeInstance(instance);
    }
  }]);

  return SingletonScope;
}(Scope);

module.exports = SingletonScope;