'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Scope = require('../scope');

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
class SingletonScope extends Scope {
  constructor(provider, options) {
    super(provider, options);
    this._instance = null;
    this._creating = false;
  }

  get() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this._instance) {
        return _this._instance;
      }

      while (_this._creating) {
        yield new Promise(function (resolve) {
          return setTimeout(resolve, 50);
        });
      }

      if (!_this._instance) {
        _this._creating = true;

        try {
          const instance = yield _this.provider.create();
          yield _this._setupInstance(instance);
          _this._instance = instance;
        } catch (e) {
          _this._creating = false;
          throw e;
        }

        _this._creating = false;
      }

      return _this._instance;
    })();
  }

  deinitialize() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const instance = _this2._instance;
      _this2._instance = null;
      return _this2.provider.deinitializeInstance(instance);
    })();
  }
}

module.exports = SingletonScope;