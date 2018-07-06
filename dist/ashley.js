'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const debug = require('debug')('Ashley::Container');
const _ = require('lodash');

const errors = require('./errors');

class Ashley {
  constructor(targetResolver, bindFactory, options) {
    this._targetResolver = targetResolver;
    this._bindFactory = bindFactory;
    this._options = options;

    this._binds = {};
    this._scopesToDeinitialize = [];
  }

  shutdown() {
    var _this = this;

    return _asyncToGenerator(function* () {
      for (let i = _this._scopesToDeinitialize.length - 1; i >= 0; i--) {
        const scope = _this._scopesToDeinitialize[i];
        if (scope.deinitialize) {
          yield scope.deinitialize();
        }
      }
    })();
  }

  createChild() {
    const options = _.merge({}, this._options, { parent: this });
    return new Ashley(this._targetResolver, this._bindFactory, options);
  }

  instance(name, target, dependencies, options) {
    const resolvedTarget = this._targetResolver.resolve(target);

    const Provider = this._findBindOrThrow('@providers/Instance').get();
    const provider = new Provider(name, this, resolvedTarget, dependencies, options);
    const scope = this._createScope(provider, options);

    const bind = this._bind(name, this._bindFactory.create('Instance', this, name, scope, provider));

    this.factory(name, (() => {
      var _ref = _asyncToGenerator(function* () {
        return provider.create();
      });

      function instanceFactory() {
        return _ref.apply(this, arguments);
      }

      return instanceFactory;
    })());

    if (_.get(options, 'deinitialize')) {
      this._scopesToDeinitialize.push(scope);
    }

    return bind;
  }

  object(name, target, options) {
    const Provider = this._findBindOrThrow('@providers/Object').get();
    const provider = new Provider(name, this, target, options);
    const scope = this._createScope(provider, _.merge({}, options, { scope: 'Clone' }));

    return this._bind(name, this._bindFactory.create('Object', name, scope));
  }

  function(name, target, dependencies, options) {
    const resolvedTarget = this._targetResolver.resolve(target);

    const Provider = this._findBindOrThrow('@providers/Function').get();
    const provider = new Provider(name, this, resolvedTarget, dependencies);
    const scope = this._createScope(provider, options);

    return this._bind(name, this._bindFactory.create('Function', this, name, scope, provider));
  }

  factory(name, target, dependencies) {
    const resolvedTarget = this._targetResolver.resolve(target);

    const Provider = this._findBindOrThrow('@providers/Factory').get();
    const provider = new Provider(name, this, resolvedTarget, dependencies);

    return this._bind(`@factories/${name}`, this._bindFactory.create('Factory', this, name, provider));
  }

  link(name, factoryName, options) {
    const provider = this._findBindOrThrow(`@factories/${factoryName}`).get();
    const scope = this._createScope(provider, options);
    const bind = this._bind(name, this._bindFactory.create('Link', this, name, scope, provider));

    if (_.get(options, 'deinitialize')) {
      this._scopesToDeinitialize.push(scope);
    }

    return bind;
  }

  provider(name, target) {
    const resolvedTarget = this._targetResolver.resolve(target);

    return this._bind(`@providers/${name}`, this._bindFactory.create('Provider', name, resolvedTarget));
  }

  scope(name, target) {
    const resolvedTarget = this._targetResolver.resolve(target);

    return this._bind(`@scopes/${name}`, this._bindFactory.create('Scope', name, resolvedTarget));
  }

  resolve(name) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      debug(`Resolving "${name}".`);

      const bind = _this2.findBind(name);

      if (bind) {
        return bind.get();
      }

      throw new errors.Error(`Unable to resolve unbound target "${name}".`);
    })();
  }

  resolveAll(names) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const results = [];

      for (const name of names || []) {
        results.push((yield _this3.resolve(name)));
      }

      return results;
    })();
  }

  validate() {
    _.forEach(this._binds, bind => {
      if (bind.validate) {
        bind.validate();
      }
    });
  }

  findBind(bindName) {
    let bind = this._binds[bindName];

    if (!bind && this._options.parent) {
      bind = this._options.parent.findBind(bindName);
    }

    return bind;
  }

  _createScope(provider, options) {
    const scopeName = _.get(options, 'scope', 'Singleton');
    const Scope = this._findBindOrThrow(`@scopes/${scopeName}`).get();

    const scope = new Scope(provider, options);
    return scope;
  }

  _findBindOrThrow(bindName) {
    const bind = this.findBind(bindName);

    if (!bind) {
      throw new errors.Error(`Unable to find a bind called "${bindName}".`);
    }

    return bind;
  }

  _bind(name, bind) {
    if (this._binds[name]) {
      throw new errors.Error(`There's already a bind called "${name}".`);
    }

    this._binds[name] = bind;

    return this.resolve.bind(this, name);
  }
}

module.exports = Ashley;