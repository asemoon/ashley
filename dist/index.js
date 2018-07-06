'use strict';

var Ashley = require('./ashley');

var TargetResolver = require('./target_resolver');
var CachingTargetResolver = require('./caching_target_resolver');

var InstanceProvider = require('./providers/instance_provider');
var ObjectProvider = require('./providers/object_provider');
var FactoryProvider = require('./providers/factory_provider');
var FunctionProvider = require('./providers/function_provider');

var SingletonScope = require('./scopes/singleton_scope');
var PrototypeScope = require('./scopes/prototype_scope');
var CloneScope = require('./scopes/clone_scope');

var BindFactory = require('./bind_factory');
var BindValidator = require('./bind_validator');
var CompleteBind = require('./binds/complete_bind');
var FactoryBind = require('./binds/factory_bind');
var ClassBind = require('./binds/class_bind');
var ObjectBind = require('./binds/object_bind');

var utils = require('./utils');

module.exports = function (options) {
  var opts = options || {};
  var targetResolver = new CachingTargetResolver(new TargetResolver(opts));

  var bindFactory = new BindFactory({
    Instance: CompleteBind,
    Link: CompleteBind,
    Function: CompleteBind,
    Factory: FactoryBind,
    Object: ObjectBind,
    Provider: ClassBind,
    Scope: ClassBind
  }, BindValidator);

  var ashley = new Ashley(targetResolver, bindFactory, opts);

  ashley.scope('Singleton', SingletonScope);
  ashley.scope('Prototype', PrototypeScope);
  ashley.scope('Clone', CloneScope);
  ashley.provider('Instance', InstanceProvider);
  ashley.provider('Object', ObjectProvider);
  ashley.provider('Factory', FactoryProvider);
  ashley.provider('Function', FunctionProvider);

  ashley.object('@containers/self', ashley);

  if (opts.parent) {
    ashley.object('@containers/parent', opts.parent);
  }

  return ashley;
};

module.exports._ = utils._;