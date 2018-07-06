'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('Ashley::Container');
var _ = require('lodash');

var errors = require('./errors');

var Ashley = function () {
  function Ashley(targetResolver, bindFactory, options) {
    _classCallCheck(this, Ashley);

    this._targetResolver = targetResolver;
    this._bindFactory = bindFactory;
    this._options = options;

    this._binds = {};
    this._scopesToDeinitialize = [];
  }

  _createClass(Ashley, [{
    key: 'shutdown',
    value: async function shutdown() {
      for (var i = this._scopesToDeinitialize.length - 1; i >= 0; i--) {
        var scope = this._scopesToDeinitialize[i];
        if (scope.deinitialize) {
          await scope.deinitialize();
        }
      }
    }
  }, {
    key: 'createChild',
    value: function createChild() {
      var options = _.merge({}, this._options, { parent: this });
      return new Ashley(this._targetResolver, this._bindFactory, options);
    }
  }, {
    key: 'instance',
    value: function instance(name, target, dependencies, options) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Instance').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies, options);
      var scope = this._createScope(provider, options);

      var bind = this._bind(name, this._bindFactory.create('Instance', this, name, scope, provider));

      this.factory(name, async function instanceFactory() {
        return provider.create();
      });

      if (_.get(options, 'deinitialize')) {
        this._scopesToDeinitialize.push(scope);
      }

      return bind;
    }
  }, {
    key: 'object',
    value: function object(name, target, options) {
      var Provider = this._findBindOrThrow('@providers/Object').get();
      var provider = new Provider(name, this, target, options);
      var scope = this._createScope(provider, _.merge({}, options, { scope: 'Clone' }));

      return this._bind(name, this._bindFactory.create('Object', name, scope));
    }
  }, {
    key: 'function',
    value: function _function(name, target, dependencies, options) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Function').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies);
      var scope = this._createScope(provider, options);

      return this._bind(name, this._bindFactory.create('Function', this, name, scope, provider));
    }
  }, {
    key: 'factory',
    value: function factory(name, target, dependencies) {
      var resolvedTarget = this._targetResolver.resolve(target);

      var Provider = this._findBindOrThrow('@providers/Factory').get();
      var provider = new Provider(name, this, resolvedTarget, dependencies);

      return this._bind('@factories/' + name, this._bindFactory.create('Factory', this, name, provider));
    }
  }, {
    key: 'link',
    value: function link(name, factoryName, options) {
      var provider = this._findBindOrThrow('@factories/' + factoryName).get();
      var scope = this._createScope(provider, options);
      var bind = this._bind(name, this._bindFactory.create('Link', this, name, scope, provider));

      if (_.get(options, 'deinitialize')) {
        this._scopesToDeinitialize.push(scope);
      }

      return bind;
    }
  }, {
    key: 'provider',
    value: function provider(name, target) {
      var resolvedTarget = this._targetResolver.resolve(target);

      return this._bind('@providers/' + name, this._bindFactory.create('Provider', name, resolvedTarget));
    }
  }, {
    key: 'scope',
    value: function scope(name, target) {
      var resolvedTarget = this._targetResolver.resolve(target);

      return this._bind('@scopes/' + name, this._bindFactory.create('Scope', name, resolvedTarget));
    }
  }, {
    key: 'resolve',
    value: async function resolve(name) {
      debug('Resolving "' + name + '".');

      var bind = this.findBind(name);

      if (bind) {
        return bind.get();
      }

      throw new errors.Error('Unable to resolve unbound target "' + name + '".');
    }
  }, {
    key: 'resolveAll',
    value: async function resolveAll(names) {
      var results = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (names || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          results.push((await this.resolve(name)));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return results;
    }
  }, {
    key: 'validate',
    value: function validate() {
      _.forEach(this._binds, function (bind) {
        if (bind.validate) {
          bind.validate();
        }
      });
    }
  }, {
    key: 'findBind',
    value: function findBind(bindName) {
      var bind = this._binds[bindName];

      if (!bind && this._options.parent) {
        bind = this._options.parent.findBind(bindName);
      }

      return bind;
    }
  }, {
    key: '_createScope',
    value: function _createScope(provider, options) {
      var scopeName = _.get(options, 'scope', 'Singleton');
      var Scope = this._findBindOrThrow('@scopes/' + scopeName).get();

      var scope = new Scope(provider, options);
      return scope;
    }
  }, {
    key: '_findBindOrThrow',
    value: function _findBindOrThrow(bindName) {
      var bind = this.findBind(bindName);

      if (!bind) {
        throw new errors.Error('Unable to find a bind called "' + bindName + '".');
      }

      return bind;
    }
  }, {
    key: '_bind',
    value: function _bind(name, bind) {
      if (this._binds[name]) {
        throw new errors.Error('There\'s already a bind called "' + name + '".');
      }

      this._binds[name] = bind;

      return this.resolve.bind(this, name);
    }
  }]);

  return Ashley;
}();

module.exports = Ashley;