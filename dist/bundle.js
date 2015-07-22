(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var angular, app, d3;

angular = require('angular');

d3 = require('d3');

app = angular.module('mainApp', [require('angular-material')]).directive('cumChart', require('./components/charts/cumChart')).directive('arrChart', require('./components/charts/arrChart')).directive('mainDer', require('./components/charts/main')).directive('startDer', require('./components/charts/start')).directive('costDer', require('./components/charts/cost')).directive('shifter', require('./directives/shifter')).directive('horAxisDer', require('./directives/xAxis')).directive('verAxisDer', require('./directives/yAxis')).directive('shifter', require('./directives/shifter')).directive('behavior', require('./directives/behavior')).directive('datum', require('./directives/datum')).directive('d3Der', require('./directives/d3Der'));



},{"./components/charts/arrChart":2,"./components/charts/cost":3,"./components/charts/cumChart":4,"./components/charts/main":5,"./components/charts/start":6,"./directives/behavior":7,"./directives/d3Der":8,"./directives/datum":9,"./directives/shifter":10,"./directives/xAxis":11,"./directives/yAxis":12,"angular":undefined,"angular-material":undefined,"d3":undefined}],2:[function(require,module,exports){
var Data, PlotCtrl, Settings, arrCtrl, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.lineFun(vm.minutes)}' />\n			<path class='exit-line' d3-der='{d: vm.lineFun2(vm.minutes)}' />\n		</g>\n	</g>\n</svg>";

arrCtrl = (function(superClass) {
  extend(arrCtrl, superClass);

  function arrCtrl(scope) {
    this.scope = scope;
    arrCtrl.__super__.constructor.call(this, this.scope);
    this.minutes = Data.minutes;
    this.Ver.domain([0, 40]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.lineFun2 = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.target_avg);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
  }

  return arrCtrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', arrCtrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],3:[function(require,module,exports){
var Data, PlotCtrl, Settings, arrCtrl, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='fun total_cost'  d3-der='{d: vm.lineFun(vm.minutes)}' />\n			<path class='fun travel_cost'  d3-der='{d: vm.lineFun2(vm.minutes)}' />\n			<path class='fun schedule_delay'  d3-der='{d: vm.lineFun3(vm.minutes)}' />\n		</g>\n	</g>\n</svg>";

arrCtrl = (function(superClass) {
  extend(arrCtrl, superClass);

  function arrCtrl(scope) {
    this.scope = scope;
    arrCtrl.__super__.constructor.call(this, this.scope);
    this.minutes = Data.minutes;
    this.Ver.domain([0, 100]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.lineFun = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.cost);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
    this.lineFun2 = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.travel_cost);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
    this.lineFun3 = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.sched_delay);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
  }

  return arrCtrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', arrCtrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],4:[function(require,module,exports){
var Data, PlotCtrl, Settings, cumCtrl, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.arr_line(vm.minutes)}' />\n			<path class='arr-line goal' ng-attr-d='{{vm.goal_arrs(vm.minutes)}}' />\n			<path class='exit-line' d3-der='{d: vm.exit_line(vm.minutes)}' />\n			<path class='exit-line goal' ng-attr-d='{{vm.goal_exits(vm.minutes)}}' />\n			<line d3-der='{x1: vm.Hor(vm.S.wish_time), x2: vm.Hor(vm.S.wish_time), y1: vm.Ver(0), y2: 0}' class='wish_time' />\n		</g>\n	</g>\n</svg>";

cumCtrl = (function(superClass) {
  extend(cumCtrl, superClass);

  function cumCtrl(scope) {
    this.scope = scope;
    cumCtrl.__super__.constructor.call(this, this.scope);
    this.minutes = Data.minutes;
    this.Ver.domain([0, Settings.num_cars]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.S = Settings;
    this.arr_line = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.cum_arrivals);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
    this.exit_line = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.cum_exits);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
    this.goal_exits = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.goal_exits);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
    this.goal_arrs = d3.svg.line().y((function(_this) {
      return function(d) {
        return _this.Ver(d.goal_arrivals);
      };
    })(this)).x((function(_this) {
      return function(d) {
        return _this.Hor(d.time);
      };
    })(this));
  }

  return cumCtrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', cumCtrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],5:[function(require,module,exports){
'use strict';
var Ctrl, Data, Settings, _, d3, der, template, timeout;

_ = require('lodash');

d3 = require('d3');

Data = require('../../services/data');

timeout = require('../../helpers').timeout;

Settings = require('../../services/settings');

template = '<div flex=\'50\'>\n	<md-button ng-click=\'vm.play()\'>Play</md-button>\n	<md-button ng-click=\'vm.stop()\'>Stop</md-button>\n	<div layout>\n	    <div flex="30" layout layout-align="center center">\n	       <span class="md-body-1">Memory length</span>\n	    </div>\n	    <md-slider flex ng-model="vm.S.mem_length" min=\'1\' max=\'10\' md-discrete step=\'1\' />\n   </div>\n   	<div layout>\n   	    <div flex="30" layout layout-align="center center">\n   	       <span class="md-body-1">Error</span>\n   	    </div>\n   	    <md-slider flex ng-model="vm.S.var" min=\'1\' max=\'5\' md-discrete step=\'.5\' />\n    </div>\n    	<div layout>\n    	    <div flex="30" layout layout-align="center center">\n    	       <span class="md-body-1">Sample Size</span>\n    	    </div>\n    	    <md-slider flex ng-model="vm.S.sample_size" min=\'10\' max=\'300\' md-discrete step=\'10\' />\n     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Beta</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.beta" min=\'.1\' max=\'.9\' md-discrete step=\'.05\' />\n 	     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Gamma</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.gamma" min=\'1.5\' max=\'3\' md-discrete step=\'.05\' />\n 	     </div>\n</div>';

Ctrl = (function() {
  function Ctrl(scope) {
    this.scope = scope;
    this.paused = false;
    this.Data = Data;
    this.S = Settings;
  }

  Ctrl.prototype.looper = function() {
    return timeout((function(_this) {
      return function() {
        Data.tick();
        _this.scope.$evalAsync();
        if (!_this.paused) {
          _this.looper();
        }
        return _this.paused;
      };
    })(this), Settings.interval);
  };

  Ctrl.prototype.play = function() {
    this.paused = false;
    d3.timer.flush();
    return this.looper();
  };

  Ctrl.prototype.stop = function() {
    return this.paused = true;
  };

  return Ctrl;

})();

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', Ctrl],
    controllerAs: 'vm',
    template: template,
    scope: {},
    restrict: 'A'
  };
};

module.exports = der;



},{"../../helpers":13,"../../services/data":17,"../../services/settings":18,"d3":undefined,"lodash":undefined}],6:[function(require,module,exports){
var Ctrl, Data, PlotCtrl, Settings, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.lineFun(vm.Data.start_times)}' />\n		</g>\n	</g>\n	<g class='tooltip' ng-attr-transform='translate({{vm.left}},{{vm.top}})'>\n		<text>{{vm.hello | number: 0}}</text>\n	</g>\n</svg>";

Ctrl = (function(superClass) {
  extend(Ctrl, superClass);

  function Ctrl(scope, el) {
    var vm, zoom;
    this.scope = scope;
    Ctrl.__super__.constructor.call(this, this.scope);
    this.Ver.domain([0, 60]);
    this.Hor.domain([0, 5000]);
    this.hello = 50;
    this.left = 0;
    this.top = 0;
    this.Data = Data;
    this.lineFun = d3.svg.line().defined(function(d, i) {
      return !!d;
    }).y((function(_this) {
      return function(d) {
        return _this.Ver(d);
      };
    })(this)).x((function(_this) {
      return function(d, i) {
        return _this.Hor(i);
      };
    })(this));
    zoom = d3.behavior.zoom().x(this.Hor).y(this.Ver).scaleExtent([1, 15]);
    d3.select(el[0]).select('.g-main').call(zoom);
    vm = this;
    d3.select(el[0]).select('.g-main').on('mousemove', function() {
      var loc;
      loc = d3.mouse(this);
      vm.left = loc[0];
      vm.top = loc[1];
      vm.hello = vm.Hor.invert(vm.left);
      return vm.scope.$evalAsync();
    });
  }

  return Ctrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', '$element', Ctrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],7:[function(require,module,exports){
var drag;

drag = function($parse) {
  var directive;
  return directive = {
    link: function(scope, el, attr) {
      var sel;
      sel = d3.select(el[0]);
      return sel.call($parse(attr.behavior)(scope));
    }
  };
};

module.exports = drag;



},{}],8:[function(require,module,exports){
var angular, d3, der;

d3 = require('d3');

angular = require('angular');

der = function($parse) {
  var directive;
  return directive = {
    restrict: 'A',
    scope: {
      d3Der: '=',
      tran: '='
    },
    link: function(scope, el, attr) {
      var sel, u;
      sel = d3.select(el[0]);
      u = 't-' + Math.random();
      return scope.$watch('d3Der', function(v) {
        if (scope.tran) {
          return sel.transition(u).attr(v).call(scope.tran);
        } else {
          return sel.attr(v);
        }
      }, true);
    }
  };
};

module.exports = der;



},{"angular":undefined,"d3":undefined}],9:[function(require,module,exports){
module.exports = function($parse) {
  return function(scope, el, attr) {
    return d3.select(el[0]).datum($parse(attr.datum)(scope));
  };
};



},{}],10:[function(require,module,exports){
var d3, der;

d3 = require('d3');

der = function($parse) {
  var directive;
  return directive = {
    restrict: 'A',
    link: function(scope, el, attr) {
      var reshift, sel, tran, u;
      sel = d3.select(el[0]);
      u = 't-' + Math.random();
      tran = $parse(attr.tran)(scope);
      reshift = function(v) {
        if (tran) {
          sel.transition(u).attr('transform', "translate(" + v[0] + "," + v[1] + ")").call(tran);
        } else {
          sel.attr('transform', "translate(" + v[0] + "," + v[1] + ")");
        }
        return d3.select(el[0]);
      };
      return scope.$watch(function() {
        return $parse(attr.shifter)(scope);
      }, reshift, true);
    }
  };
};

module.exports = der;



},{"d3":undefined}],11:[function(require,module,exports){
var angular, d3, der;

d3 = require('d3');

angular = require('angular');

der = function($window) {
  var directive;
  return directive = {
    controller: angular.noop,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'A',
    templateNamespace: 'svg',
    scope: {
      height: '=',
      fun: '='
    },
    link: function(scope, el, attr, vm) {
      var scale, sel, update;
      scale = vm.fun.scale();
      sel = d3.select(el[0]).classed('x axis', true);
      update = (function(_this) {
        return function() {
          vm.fun.tickSize(-vm.height);
          return sel.call(vm.fun);
        };
      })(this);
      return scope.$watch(function() {
        return [scale.domain(), scale.range(), vm.height];
      }, update, true);
    }
  };
};

module.exports = der;



},{"angular":undefined,"d3":undefined}],12:[function(require,module,exports){
var angular, d3, der;

d3 = require('d3');

angular = require('angular');

der = function($window) {
  var directive;
  return directive = {
    controller: angular.noop,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'A',
    templateNamespace: 'svg',
    scope: {
      width: '=',
      fun: '='
    },
    link: function(scope, el, attr, vm) {
      var scale, sel, update;
      scale = vm.fun.scale();
      sel = d3.select(el[0]).classed('y axis', true);
      update = (function(_this) {
        return function() {
          vm.fun.tickSize(-vm.width);
          return sel.call(vm.fun);
        };
      })(this);
      return scope.$watch(function() {
        return [scale.domain(), scale.range(), vm.width];
      }, update, true);
    }
  };
};

module.exports = der;



},{"angular":undefined,"d3":undefined}],13:[function(require,module,exports){
'use strict';
module.exports.timeout = function(fun, time) {
  return d3.timer((function(_this) {
    return function() {
      fun();
      return true;
    };
  })(this), time);
};

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};



},{}],14:[function(require,module,exports){
var Car, Memories, Memory, S, _, d3;

d3 = require('d3');

S = require('../services/settings');

require('../helpers');

_ = require('lodash');

Memory = (function() {
  function Memory() {
    this.array = [];
  }

  Memory.prototype.remember = function(c) {
    this.array.push(c);
    if (this.array.length > S.mem_length) {
      return this.array.shift();
    }
  };

  Memory.prototype.val = function() {
    return d3.mean(this.array);
  };

  return Memory;

})();

Memories = (function() {
  function Memories() {
    this.map = d3.map();
  }

  Memories.prototype.remember = function(arr_time, cost) {
    var newMem;
    if (this.map.has(arr_time)) {
      return this.map.get(arr_time).remember(cost);
    } else {
      newMem = new Memory;
      this.map.set(arr_time, newMem);
      return newMem.remember(cost);
    }
  };

  Memories.prototype.min = function() {
    var c, candidates;
    c = Infinity;
    candidates = [];
    this.map.forEach(function(time, memory) {
      var cost;
      cost = memory.val();
      if (cost < c) {
        c = cost;
        candidates = [];
        return candidates.push(+time);
      } else if (cost === c) {
        return candidates.push(+time);
      }
    });
    return _.sample(candidates);
  };

  return Memories;

})();

Car = (function() {
  function Car(n, tar_time) {
    this.n = n;
    this.tar_time = tar_time;
    this.sched_pen = Infinity;
    this.cost = Infinity;
    this.travel_pen = Infinity;
    this.exit_time = Infinity;
    this.memories = new Memories;
    this.path = [];
    this.sampled = false;
  }

  Car.prototype.exit = function(time) {
    var sched_del;
    this.exit_time = time;
    this.travel_pen = this.exit_time - this.actual_time;
    sched_del = this.exit_time - S.wish_time;
    this.sched_pen = Math.max(-S.beta * sched_del, S.gamma * sched_del);
    this.cost = this.travel_pen + this.sched_pen;
    return this.memories.remember(this.actual_time, this.cost);
  };

  Car.prototype.choose = function() {
    this.last_tar = this.tar_time;
    return this.tar_time = this.memories.min();
  };

  Car.prototype.guesser = function() {
    var i, ref, ref1, results;
    return _.sample((function() {
      results = [];
      for (var i = ref = -S["var"], ref1 = S["var"]; ref <= ref1 ? i <= ref1 : i >= ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this));
  };

  Car.prototype.arrive = function() {
    var a, e, res;
    e = Math.round(this.guesser());
    a = this.tar_time + e;
    res = Math.max(1, Math.min(a, S.num_minutes - 1));
    this.actual_time = res;
    return res;
  };

  return Car;

})();

module.exports = Car;



},{"../helpers":13,"../services/settings":18,"d3":undefined,"lodash":undefined}],15:[function(require,module,exports){
var Minute, S, blank, d3, max;

S = require('../services/settings');

require('../helpers.coffee');

d3 = require('d3');

max = Math.max;

blank = {
  receive_queue: function() {},
  cum_arrivals: 0,
  cum_exits: 0
};

Minute = (function() {
  function Minute(time) {
    this.time = time;
    this.queue = [];
    this.cum_arrivals = 0;
    this.cum_exits = 0;
    this.arrivals = 0;
    this.exits = 0;
    this.next = void 0;
    this.prev = void 0;
    this.targeted = 0;
    this.past_targets = [];
  }

  Minute.property('variance', {
    get: function() {
      return d3.variance(this.past_arrivals);
    }
  });

  Minute.property('target_avg', {
    get: function() {
      return d3.mean(this.past_targets);
    }
  });

  Minute.prototype.set_next = function(m) {
    return this.next = m != null ? m : blank;
  };

  Minute.prototype.set_prev = function(m) {
    return this.prev = m != null ? m : blank;
  };

  Minute.prototype.serve = function() {
    var delay, exit_time, i, ref, results, travel_time;
    this.goal_exits = Math.min(Math.max(S.rate * (this.time - S.t1), 0), S.num_cars);
    if (this.time < S.ttilde) {
      this.goal_arrivals = S.rate / (1 - S.beta) * (this.time - S.t1);
    } else {
      this.goal_arrivals = (this.time - S.ttilde) * S.rate / (1 + S.gamma) + (S.ttilde - S.t1) * S.rate / (1 - S.beta);
    }
    this.goal_arrivals = Math.min(Math.max(this.goal_arrivals, 0), S.num_cars);
    this.queue_length = this.queue.length;
    travel_time = this.queue_length / S.rate;
    exit_time = this.time + travel_time;
    delay = exit_time - S.wish_time;
    this.travel_cost = travel_time;
    this.sched_delay = Math.max(-S.beta * delay, S.gamma * delay);
    this.cost = travel_time + this.sched_delay;
    (function() {
      results = [];
      for (var i = 0, ref = Math.min(this.queue_length, S.rate); 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this).forEach((function(_this) {
      return function() {
        var car;
        car = _this.queue.pop();
        car.exit(_this.time);
        return _this.exits++;
      };
    })(this));
    this.next.receive_queue(this.queue);
    this.cum_exits = this.prev.cum_exits + this.exits;
    this.cum_arrivals = this.prev.cum_arrivals + this.arrivals;
    this.past_targets.push(this.targeted);
    if (this.past_targets.length > 40) {
      this.past_targets.shift();
    }
    this.queue = [];
    this.arrivals = 0;
    this.exits = 0;
    return this.targeted = 0;
  };

  Minute.prototype.receive_car = function(car) {
    this.queue.push(car);
    return this.arrivals++;
  };

  Minute.prototype.receive_queue = function(queue) {
    return this.queue = this.queue.concat(queue);
  };

  return Minute;

})();

module.exports = Minute;



},{"../helpers.coffee":13,"../services/settings":18,"d3":undefined}],16:[function(require,module,exports){
var PlotCtrl, _, angular;

angular = require('angular');

_ = require('lodash');

PlotCtrl = (function() {
  function PlotCtrl(scope) {
    this.scope = scope;
    this.width = 450;
    this.height = 275;
    this.Ver = d3.scale.linear().domain([0, 8]).range([this.height, 0]);
    this.Hor = d3.scale.linear().domain([0, 8]).range([0, this.width]);
    this.horAxFun = d3.svg.axis().scale(this.Hor).ticks(10).orient('bottom');
    this.verAxFun = d3.svg.axis().scale(this.Ver).ticks(10).orient('left');
    this.mar = {
      left: 30,
      top: 10,
      right: 10,
      bottom: 25
    };
  }

  return PlotCtrl;

})();

module.exports = PlotCtrl;



},{"angular":undefined,"lodash":undefined}],17:[function(require,module,exports){
var Car, Data, Minute, Settings, _;

Settings = require('./settings');

Minute = require('../models/minute');

Car = require('../models/car');

_ = require('lodash');

Data = (function() {
  function Data() {
    var i, j, l, ref, ref1, results, results1;
    this.minutes = (function() {
      results = [];
      for (var j = 0, ref = Settings.num_minutes; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).map((function(_this) {
      return function(time) {
        var newMinute;
        return newMinute = new Minute(time);
      };
    })(this));
    this.minutes.forEach(function(min, i, k) {
      min.set_prev(k[i - 1]);
      return min.set_next(k[i + 1]);
    });
    this.cars = (function() {
      results1 = [];
      for (var l = 0, ref1 = Settings.num_cars; 0 <= ref1 ? l < ref1 : l > ref1; 0 <= ref1 ? l++ : l--){ results1.push(l); }
      return results1;
    }).apply(this).map(function(n) {
      var arr_time, l, newCar, results1;
      arr_time = _.sample((function() {
        results1 = [];
        for (l = 3; l <= 120; l++){ results1.push(l); }
        return results1;
      }).apply(this));
      return newCar = new Car(n, arr_time);
    });
    this.cars.forEach((function(_this) {
      return function(car, i, k) {
        var time;
        time = car.arrive();
        return _this.minutes[time].receive_car(car);
      };
    })(this));
    this.start_times = [];
    i = 0;
    this.record = function() {
      var s;
      s = _.find(this.minutes, (function(_this) {
        return function(d) {
          return d.queue.length > Settings.rate;
        };
      })(this));
      this.start_times.push(s.time);
      if (this.start_times.length > 10000) {
        return this.start_times.shift();
      }
    };
  }

  Data.prototype.cars_choose = function() {
    return _.sample(this.cars, Settings.sample_size).forEach(function(car) {
      return car.choose();
    });
  };

  Data.prototype.cars_arrive = function() {
    return this.cars.forEach((function(_this) {
      return function(car) {
        var time;
        time = car.arrive();
        _this.minutes[time].receive_car(car);
        return _this.minutes[car.tar_time].targeted++;
      };
    })(this));
  };

  Data.prototype.tick = function() {
    this.minutes.forEach(function(minute) {
      return minute.serve();
    });
    this.cars_arrive();
    this.cars_choose();
    return this.record();
  };

  return Data;

})();

module.exports = new Data();



},{"../models/car":14,"../models/minute":15,"./settings":18,"lodash":undefined}],18:[function(require,module,exports){
var S;

require('../helpers');

S = (function() {
  function S() {
    this.num_cars = 1000;
    this.wish_time = 120;
    this.num_minutes = 170;
    this.rate = 10;
    this.beta = .5;
    this.gamma = 2;
    this["var"] = 2;
    this.sample_size = 200;
    this.interval = 25;
    this.mem_length = 2;
  }

  S.property('t1', {
    get: function() {
      return this.wish_time - this.num_cars / this.rate * this.gamma / (this.beta + this.gamma);
    }
  });

  S.property('t2', {
    get: function() {
      return this.wish_time + this.num_cars / this.rate * this.beta / (this.beta + this.gamma);
    }
  });

  S.property('ttilde', {
    get: function() {
      return this.wish_time - this.num_cars / this.rate * this.gamma * this.beta / (this.beta + this.gamma);
    }
  });

  return S;

})();

module.exports = new S;



},{"../helpers":13}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvYXBwLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL2NoYXJ0cy9hcnJDaGFydC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY29zdC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY3VtQ2hhcnQuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL21haW4uY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL3N0YXJ0LmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2JlaGF2aW9yLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2QzRGVyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2RhdHVtLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL3NoaWZ0ZXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveEF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveUF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2hlbHBlcnMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9jYXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9taW51dGUuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9wbG90Q3RybC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvZGF0YS5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvc2V0dGluZ3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBQSxDQUFBO0FBQUEsSUFBQSxnQkFBQTs7QUFBQSxPQUNBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FEVixDQUFBOztBQUFBLEVBRUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsR0FHQSxHQUFNLE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBZixFQUEwQixDQUFDLE9BQUEsQ0FBUSxrQkFBUixDQUFELENBQTFCLENBRUwsQ0FBQyxTQUZJLENBRU0sVUFGTixFQUVrQixPQUFBLENBQVEsOEJBQVIsQ0FGbEIsQ0FHTCxDQUFDLFNBSEksQ0FHTSxVQUhOLEVBR2tCLE9BQUEsQ0FBUSw4QkFBUixDQUhsQixDQUlMLENBQUMsU0FKSSxDQUlNLFNBSk4sRUFJaUIsT0FBQSxDQUFRLDBCQUFSLENBSmpCLENBS0wsQ0FBQyxTQUxJLENBS00sVUFMTixFQUtrQixPQUFBLENBQVEsMkJBQVIsQ0FMbEIsQ0FNTCxDQUFDLFNBTkksQ0FNTSxTQU5OLEVBTWlCLE9BQUEsQ0FBUSwwQkFBUixDQU5qQixDQVFMLENBQUMsU0FSSSxDQVFNLFNBUk4sRUFRa0IsT0FBQSxDQUFRLHNCQUFSLENBUmxCLENBU0wsQ0FBQyxTQVRJLENBU00sWUFUTixFQVNv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LENBZkEsQ0FBQTs7V0FBQTs7SUFGRCxDQUFBOztBQUFBLE1BcUJNLENBQUMsT0FBUCxHQUFpQixHQUFBLENBQUEsQ0FyQmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5hbmd1bGFyID0gcmVxdWlyZSAnYW5ndWxhcidcbmQzID0gcmVxdWlyZSAnZDMnXG5hcHAgPSBhbmd1bGFyLm1vZHVsZSAnbWFpbkFwcCcsIFtyZXF1aXJlICdhbmd1bGFyLW1hdGVyaWFsJ11cblx0IyBjaGFydHNcblx0LmRpcmVjdGl2ZSAnY3VtQ2hhcnQnLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL2N1bUNoYXJ0J1xuXHQuZGlyZWN0aXZlICdhcnJDaGFydCcsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jaGFydHMvYXJyQ2hhcnQnXG5cdC5kaXJlY3RpdmUgJ21haW5EZXInLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL21haW4nXG5cdC5kaXJlY3RpdmUgJ3N0YXJ0RGVyJywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYXJ0cy9zdGFydCdcblx0LmRpcmVjdGl2ZSAnY29zdERlcicsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jaGFydHMvY29zdCdcblx0IyBkaXJlY3RpdmVzXG5cdC5kaXJlY3RpdmUgJ3NoaWZ0ZXInICwgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3NoaWZ0ZXInXG5cdC5kaXJlY3RpdmUgJ2hvckF4aXNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMveEF4aXMnXG5cdC5kaXJlY3RpdmUgJ3ZlckF4aXNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMveUF4aXMnXG5cdC5kaXJlY3RpdmUgJ3NoaWZ0ZXInICwgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3NoaWZ0ZXInXG5cdC5kaXJlY3RpdmUgJ2JlaGF2aW9yJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL2JlaGF2aW9yJ1xuXHQuZGlyZWN0aXZlICdkYXR1bScsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9kYXR1bSdcblx0LmRpcmVjdGl2ZSAnZDNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMvZDNEZXInXG5cdCMgLmRpcmVjdGl2ZSAnY2hhbmdlQ2hhcnQnLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhbmdlcy9jaGFuZ2VDaGFydCdcblx0IyAuZGlyZWN0aXZlICdjaGFuZ2VEZXInLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhbmdlcy9jaGFuZ2VzMiciLCJkMyA9IHJlcXVpcmUoJ2QzJylcblNldHRpbmdzID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvc2V0dGluZ3MnXG5QbG90Q3RybCA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9wbG90Q3RybCdcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xuXG50ZW1wbGF0ZSA9IFwiXCJcIlxuXHQ8c3ZnIG5nLWF0dHItd2lkdGg9J3t7Ojp2bS53aWR0aCArIHZtLm1hci5sZWZ0K3ZtLm1hci5yaWdodH19JyBuZy1hdHRyLWhlaWdodD0ne3s6OnZtLmhlaWdodCArIHZtLm1hci50b3AgKyB2bS5tYXIuYm90dG9tfX0nPlxuXHRcdDxnIGNsYXNzPSdnLW1haW4nIHNoaWZ0ZXI9J3t7Ojpbdm0ubWFyLmxlZnQsIHZtLm1hci50b3BdfX0nPlxuXHRcdFx0PHJlY3QgZDMtZGVyPSd7d2lkdGg6IHZtLndpZHRoLCBoZWlnaHQ6IHZtLmhlaWdodH0nIGNsYXNzPSdiYWNrZ3JvdW5kJyAvPlxuXHRcdFx0PGcgdmVyLWF4aXMtZGVyIHdpZHRoPSd2bS53aWR0aCcgZnVuPSd2bS52ZXJBeEZ1bicgPjwvZz5cblx0XHRcdDxnIGhvci1heGlzLWRlciBmdW49J3ZtLmhvckF4RnVuJyBoZWlnaHQ9J3ZtLmhlaWdodCcgc2hpZnRlcj0ne3s6OlswLHZtLmhlaWdodF19fSc+PC9nPlxuXHRcdFx0PGcgY2xhc3M9J2ctbGluZXMnPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nYXJyLWxpbmUnICBkMy1kZXI9J3tkOiB2bS5saW5lRnVuKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZScgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bjIodm0ubWludXRlcyl9JyAvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcbmNsYXNzIGFyckN0cmwgZXh0ZW5kcyBQbG90Q3RybFxuXHRjb25zdHJ1Y3RvcjogKEBzY29wZSktPlxuXHRcdHN1cGVyIEBzY29wZVxuXHRcdEBtaW51dGVzID0gRGF0YS5taW51dGVzXG5cdFx0QFZlci5kb21haW4gWzAsIDQwXVxuXHRcdEBIb3IuZG9tYWluIFswLCBTZXR0aW5ncy5udW1fbWludXRlc11cblx0XHQjIEBsaW5lRnVuID0gZDMuc3ZnLmxpbmUoKVxuXHRcdCMgXHQueSAoZCk9PiBAVmVyIGQuYXJyaXZhbHNcblx0XHQjIFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRAbGluZUZ1bjIgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQudGFyZ2V0X2F2Z1xuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcbmRlciA9ICgpLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBhcnJDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdmdW4gdG90YWxfY29zdCcgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4odm0ubWludXRlcyl9JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZnVuIHRyYXZlbF9jb3N0JyAgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bjIodm0ubWludXRlcyl9JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZnVuIHNjaGVkdWxlX2RlbGF5JyAgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bjModm0ubWludXRlcyl9JyAvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcbmNsYXNzIGFyckN0cmwgZXh0ZW5kcyBQbG90Q3RybFxuXHRjb25zdHJ1Y3RvcjogKEBzY29wZSktPlxuXHRcdHN1cGVyIEBzY29wZVxuXHRcdEBtaW51dGVzID0gRGF0YS5taW51dGVzXG5cdFx0QFZlci5kb21haW4gWzAsIDEwMF1cblx0XHRASG9yLmRvbWFpbiBbMCwgU2V0dGluZ3MubnVtX21pbnV0ZXNdXG5cblx0XHRAbGluZUZ1biA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC5jb3N0XG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdEBsaW5lRnVuMiA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC50cmF2ZWxfY29zdFxuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRAbGluZUZ1bjMgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuc2NoZWRfZGVsYXlcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5kZXIgPSAtPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsIGFyckN0cmxdXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0c2NvcGU6IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiZDMgPSByZXF1aXJlKCdkMycpXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcblxudGVtcGxhdGUgPSBcIlwiXCJcblx0PHN2ZyBuZy1hdHRyLXdpZHRoPSd7ezo6dm0ud2lkdGggKyB2bS5tYXIubGVmdCt2bS5tYXIucmlnaHR9fScgbmctYXR0ci1oZWlnaHQ9J3t7Ojp2bS5oZWlnaHQgKyB2bS5tYXIudG9wICsgdm0ubWFyLmJvdHRvbX19Jz5cblx0XHQ8ZyBjbGFzcz0nZy1tYWluJyBzaGlmdGVyPSd7ezo6W3ZtLm1hci5sZWZ0LCB2bS5tYXIudG9wXX19Jz5cblx0XHRcdDxyZWN0IGQzLWRlcj0ne3dpZHRoOiB2bS53aWR0aCwgaGVpZ2h0OiB2bS5oZWlnaHR9JyBjbGFzcz0nYmFja2dyb3VuZCcgLz5cblx0XHRcdDxnIHZlci1heGlzLWRlciB3aWR0aD0ndm0ud2lkdGgnIGZ1bj0ndm0udmVyQXhGdW4nID48L2c+XG5cdFx0XHQ8ZyBob3ItYXhpcy1kZXIgZnVuPSd2bS5ob3JBeEZ1bicgaGVpZ2h0PSd2bS5oZWlnaHQnIHNoaWZ0ZXI9J3t7OjpbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzJz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lJyAgZDMtZGVyPSd7ZDogdm0uYXJyX2xpbmUodm0ubWludXRlcyl9JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nYXJyLWxpbmUgZ29hbCcgbmctYXR0ci1kPSd7e3ZtLmdvYWxfYXJycyh2bS5taW51dGVzKX19JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZXhpdC1saW5lJyBkMy1kZXI9J3tkOiB2bS5leGl0X2xpbmUodm0ubWludXRlcyl9JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZXhpdC1saW5lIGdvYWwnIG5nLWF0dHItZD0ne3t2bS5nb2FsX2V4aXRzKHZtLm1pbnV0ZXMpfX0nIC8+XG5cdFx0XHRcdDxsaW5lIGQzLWRlcj0ne3gxOiB2bS5Ib3Iodm0uUy53aXNoX3RpbWUpLCB4Mjogdm0uSG9yKHZtLlMud2lzaF90aW1lKSwgeTE6IHZtLlZlcigwKSwgeTI6IDB9JyBjbGFzcz0nd2lzaF90aW1lJyAvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgY3VtQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QG1pbnV0ZXMgPSBEYXRhLm1pbnV0ZXNcblx0XHRAVmVyLmRvbWFpbiBbMCwgU2V0dGluZ3MubnVtX2NhcnNdIFxuXHRcdEBIb3IuZG9tYWluIFswLCBTZXR0aW5ncy5udW1fbWludXRlc11cblx0XHRAUyA9IFNldHRpbmdzXG5cblx0XHRAYXJyX2xpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY3VtX2Fycml2YWxzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZSBcblxuXHRcdEBleGl0X2xpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY3VtX2V4aXRzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdFxuXHRcdEBnb2FsX2V4aXRzID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmdvYWxfZXhpdHNcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cblx0XHRAZ29hbF9hcnJzID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmdvYWxfYXJyaXZhbHNcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0XHRcblx0XHRcdFxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBjdW1DdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlclxuXG4iLCIndXNlIHN0cmljdCdcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG50aW1lb3V0ID0gcmVxdWlyZSggJy4uLy4uL2hlbHBlcnMnKS50aW1lb3V0XG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xudGVtcGxhdGUgPSAnJydcblx0PGRpdiBmbGV4PSc1MCc+XG5cdFx0PG1kLWJ1dHRvbiBuZy1jbGljaz0ndm0ucGxheSgpJz5QbGF5PC9tZC1idXR0b24+XG5cdFx0PG1kLWJ1dHRvbiBuZy1jbGljaz0ndm0uc3RvcCgpJz5TdG9wPC9tZC1idXR0b24+XG5cdFx0PGRpdiBsYXlvdXQ+XG5cdFx0ICAgIDxkaXYgZmxleD1cIjMwXCIgbGF5b3V0IGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cblx0XHQgICAgICAgPHNwYW4gY2xhc3M9XCJtZC1ib2R5LTFcIj5NZW1vcnkgbGVuZ3RoPC9zcGFuPlxuXHRcdCAgICA8L2Rpdj5cblx0XHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy5tZW1fbGVuZ3RoXCIgbWluPScxJyBtYXg9JzEwJyBtZC1kaXNjcmV0ZSBzdGVwPScxJyAvPlxuXHQgICA8L2Rpdj5cblx0ICAgXHQ8ZGl2IGxheW91dD5cblx0ICAgXHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuXHQgICBcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPkVycm9yPC9zcGFuPlxuXHQgICBcdCAgICA8L2Rpdj5cblx0ICAgXHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy52YXJcIiBtaW49JzEnIG1heD0nNScgbWQtZGlzY3JldGUgc3RlcD0nLjUnIC8+XG5cdCAgICA8L2Rpdj5cbiAgICBcdDxkaXYgbGF5b3V0PlxuXHQgICAgXHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuXHQgICAgXHQgICAgICAgPHNwYW4gY2xhc3M9XCJtZC1ib2R5LTFcIj5TYW1wbGUgU2l6ZTwvc3Bhbj5cblx0ICAgIFx0ICAgIDwvZGl2PlxuXHQgICAgXHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy5zYW1wbGVfc2l6ZVwiIG1pbj0nMTAnIG1heD0nMzAwJyBtZC1kaXNjcmV0ZSBzdGVwPScxMCcgLz5cblx0ICAgICA8L2Rpdj5cbiAgICAgXHQ8ZGl2IGxheW91dD5cbiBcdCAgICBcdCAgICA8ZGl2IGZsZXg9XCIzMFwiIGxheW91dCBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gXHQgICAgXHQgICAgICAgPHNwYW4gY2xhc3M9XCJtZC1ib2R5LTFcIj5CZXRhPC9zcGFuPlxuIFx0ICAgIFx0ICAgIDwvZGl2PlxuIFx0ICAgIFx0ICAgIDxtZC1zbGlkZXIgZmxleCBuZy1tb2RlbD1cInZtLlMuYmV0YVwiIG1pbj0nLjEnIG1heD0nLjknIG1kLWRpc2NyZXRlIHN0ZXA9Jy4wNScgLz5cbiBcdCAgICAgPC9kaXY+XG4gICAgIFx0PGRpdiBsYXlvdXQ+XG4gXHQgICAgXHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuIFx0ICAgIFx0ICAgICAgIDxzcGFuIGNsYXNzPVwibWQtYm9keS0xXCI+R2FtbWE8L3NwYW4+XG4gXHQgICAgXHQgICAgPC9kaXY+XG4gXHQgICAgXHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy5nYW1tYVwiIG1pbj0nMS41JyBtYXg9JzMnIG1kLWRpc2NyZXRlIHN0ZXA9Jy4wNScgLz5cbiBcdCAgICAgPC9kaXY+XG5cdDwvZGl2PlxuJycnXG5cbmNsYXNzIEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRAcGF1c2VkID0gZmFsc2Vcblx0XHRARGF0YSA9IERhdGFcblx0XHRAUyA9IFNldHRpbmdzXG5cblx0bG9vcGVyOiAtPlxuXHRcdHRpbWVvdXQgPT5cblx0XHRcdERhdGEudGljaygpXG5cdFx0XHRAc2NvcGUuJGV2YWxBc3luYygpXG5cdFx0XHRpZiBub3QgQHBhdXNlZCB0aGVuIEBsb29wZXIoKVxuXHRcdFx0QHBhdXNlZFxuXHRcdCwgU2V0dGluZ3MuaW50ZXJ2YWxcblxuXHRwbGF5OiAtPlxuXHRcdEBwYXVzZWQgPSBmYWxzZVxuXHRcdGQzLnRpbWVyLmZsdXNoKClcblx0XHRAbG9vcGVyKClcblxuXHRzdG9wOiAtPiBAcGF1c2VkID0gdHJ1ZVxuXG5kZXIgPSAtPlxuXHRkaXJlY3RpdmUgPVxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblx0XHRyZXN0cmljdDogJ0EnXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyXG4iLCJkMyA9IHJlcXVpcmUoJ2QzJylcblNldHRpbmdzID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvc2V0dGluZ3MnXG5QbG90Q3RybCA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9wbG90Q3RybCdcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xuXG50ZW1wbGF0ZSA9IFwiXCJcIlxuXHQ8c3ZnIG5nLWF0dHItd2lkdGg9J3t7Ojp2bS53aWR0aCArIHZtLm1hci5sZWZ0K3ZtLm1hci5yaWdodH19JyBuZy1hdHRyLWhlaWdodD0ne3s6OnZtLmhlaWdodCArIHZtLm1hci50b3AgKyB2bS5tYXIuYm90dG9tfX0nPlxuXHRcdDxnIGNsYXNzPSdnLW1haW4nIHNoaWZ0ZXI9J3t7Ojpbdm0ubWFyLmxlZnQsIHZtLm1hci50b3BdfX0nPlxuXHRcdFx0PHJlY3QgZDMtZGVyPSd7d2lkdGg6IHZtLndpZHRoLCBoZWlnaHQ6IHZtLmhlaWdodH0nIGNsYXNzPSdiYWNrZ3JvdW5kJyAvPlxuXHRcdFx0PGcgdmVyLWF4aXMtZGVyIHdpZHRoPSd2bS53aWR0aCcgZnVuPSd2bS52ZXJBeEZ1bicgPjwvZz5cblx0XHRcdDxnIGhvci1heGlzLWRlciBmdW49J3ZtLmhvckF4RnVuJyBoZWlnaHQ9J3ZtLmhlaWdodCcgc2hpZnRlcj0ne3s6OlswLHZtLmhlaWdodF19fSc+PC9nPlxuXHRcdFx0PGcgY2xhc3M9J2ctbGluZXMnPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nYXJyLWxpbmUnICBkMy1kZXI9J3tkOiB2bS5saW5lRnVuKHZtLkRhdGEuc3RhcnRfdGltZXMpfScgLz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdFx0PGcgY2xhc3M9J3Rvb2x0aXAnIG5nLWF0dHItdHJhbnNmb3JtPSd0cmFuc2xhdGUoe3t2bS5sZWZ0fX0se3t2bS50b3B9fSknPlxuXHRcdFx0PHRleHQ+e3t2bS5oZWxsbyB8IG51bWJlcjogMH19PC90ZXh0PlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlLCBlbCktPlxuXHRcdHN1cGVyIEBzY29wZVxuXHRcdEBWZXIuZG9tYWluIFswLCA2MF0gXG5cdFx0QEhvci5kb21haW4gWzAsIDUwMDBdXG5cdFx0QGhlbGxvID0gNTBcblx0XHRAbGVmdCA9IDBcblx0XHRAdG9wID0gMFxuXG5cdFx0QERhdGEgPSBEYXRhXG5cblx0XHRAbGluZUZ1biA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC5kZWZpbmVkIChkLGkpLT5cblx0XHRcdFx0KCEhZClcblx0XHRcdC55IChkKT0+IEBWZXIgZFxuXHRcdFx0LnggKGQsaSk9PiBASG9yIGlcblxuXHRcdHpvb20gPSBkMy5iZWhhdmlvci56b29tKClcblx0XHQgICAgLnggQEhvclxuXHRcdCAgICAueSBAVmVyXG5cdFx0ICAgIC5zY2FsZUV4dGVudCBbMSwgMTVdXG5cblx0XHRkMy5zZWxlY3QgZWxbMF1cblx0XHRcdC5zZWxlY3QgJy5nLW1haW4nXG5cdFx0XHQuY2FsbCB6b29tXG5cdFx0dm0gPSB0aGlzXG5cblx0XHRkMy5zZWxlY3QgZWxbMF1cblx0XHRcdC5zZWxlY3QgJy5nLW1haW4nXG5cdFx0XHQub24gJ21vdXNlbW92ZScsIC0+XG5cdFx0XHRcdGxvYyA9IGQzLm1vdXNlIHRoaXNcblx0XHRcdFx0dm0ubGVmdCA9IGxvY1swXVxuXHRcdFx0XHR2bS50b3AgPSBsb2NbMV1cblx0XHRcdFx0dm0uaGVsbG8gPSB2bS5Ib3IuaW52ZXJ0IHZtLmxlZnRcblx0XHRcdFx0dm0uc2NvcGUuJGV2YWxBc3luYygpXG5cdFx0XHRcbmRlciA9IC0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRlbGVtZW50JywgQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblxubW9kdWxlLmV4cG9ydHMgPSBkZXJcblxuIiwiZHJhZyA9ICgkcGFyc2UpLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0bGluazogKHNjb3BlLGVsLGF0dHIpLT5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdChlbFswXSlcblx0XHRcdHNlbC5jYWxsKCRwYXJzZShhdHRyLmJlaGF2aW9yKShzY29wZSkpXG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZyIsImQzID0gcmVxdWlyZSAnZDMnXG5hbmd1bGFyID0gcmVxdWlyZSAnYW5ndWxhcidcblxuZGVyID0gKCRwYXJzZSktPiAjZ29lcyBvbiBhIHN2ZyBlbGVtZW50XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdHJlc3RyaWN0OiAnQSdcblx0XHRzY29wZTogXG5cdFx0XHRkM0RlcjogJz0nXG5cdFx0XHR0cmFuOiAnPSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyKS0+XG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QgZWxbMF1cblx0XHRcdHUgPSAndC0nICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0c2NvcGUuJHdhdGNoICdkM0Rlcidcblx0XHRcdFx0LCAodiktPlxuXHRcdFx0XHRcdGlmIHNjb3BlLnRyYW5cblx0XHRcdFx0XHRcdHNlbC50cmFuc2l0aW9uIHVcblx0XHRcdFx0XHRcdFx0LmF0dHIgdlxuXHRcdFx0XHRcdFx0XHQuY2FsbCBzY29wZS50cmFuXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0c2VsLmF0dHIgdlxuXG5cdFx0XHRcdCwgdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJtb2R1bGUuZXhwb3J0cyA9ICgkcGFyc2UpLT5cblx0KHNjb3BlLCBlbCwgYXR0ciktPlxuXHRcdGQzLnNlbGVjdChlbFswXSkuZGF0dW0gJHBhcnNlKGF0dHIuZGF0dW0pKHNjb3BlKSIsImQzID0gcmVxdWlyZSAnZDMnXG5cbmRlciA9ICgkcGFyc2UpLT5cblx0ZGlyZWN0aXZlID1cblx0XHRyZXN0cmljdDogJ0EnXG5cdFx0bGluazogKHNjb3BlLCBlbCwgYXR0ciktPlxuXHRcdFx0c2VsID0gZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHR1ID0gJ3QtJyArIE1hdGgucmFuZG9tKClcblx0XHRcdHRyYW4gPSAkcGFyc2UoYXR0ci50cmFuKShzY29wZSlcblx0XHRcdHJlc2hpZnQgPSAodiktPiBcblx0XHRcdFx0aWYgdHJhblxuXHRcdFx0XHRcdHNlbC50cmFuc2l0aW9uIHVcblx0XHRcdFx0XHRcdC5hdHRyICd0cmFuc2Zvcm0nICwgXCJ0cmFuc2xhdGUoI3t2WzBdfSwje3ZbMV19KVwiXG5cdFx0XHRcdFx0XHQuY2FsbCB0cmFuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRzZWwuYXR0ciAndHJhbnNmb3JtJyAsIFwidHJhbnNsYXRlKCN7dlswXX0sI3t2WzFdfSlcIlxuXG5cdFx0XHRcdGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0XHRcdFxuXG5cdFx0XHRzY29wZS4kd2F0Y2ggLT5cblx0XHRcdFx0XHQkcGFyc2UoYXR0ci5zaGlmdGVyKShzY29wZSlcblx0XHRcdFx0LCByZXNoaWZ0XG5cdFx0XHRcdCwgdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSAnZDMnXG5hbmd1bGFyID0gcmVxdWlyZSAnYW5ndWxhcidcblxuZGVyID0gKCR3aW5kb3cpLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogYW5ndWxhci5ub29wXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0YmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuXHRcdHJlc3RyaWN0OiAnQSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHRzY29wZTogXG5cdFx0XHRoZWlnaHQ6ICc9J1xuXHRcdFx0ZnVuOiAnPSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyLCB2bSktPlxuXHRcdFx0c2NhbGUgPSB2bS5mdW4uc2NhbGUoKVxuXG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QgZWxbMF1cblx0XHRcdFx0LmNsYXNzZWQgJ3ggYXhpcycsIHRydWVcblxuXHRcdFx0dXBkYXRlID0gPT5cblx0XHRcdFx0dm0uZnVuLnRpY2tTaXplIC12bS5oZWlnaHRcblx0XHRcdFx0c2VsLmNhbGwgdm0uZnVuXG5cdFx0XHRcdFxuXHRcdFx0c2NvcGUuJHdhdGNoIC0+XG5cdFx0XHRcdFtzY2FsZS5kb21haW4oKSwgc2NhbGUucmFuZ2UoKSAsdm0uaGVpZ2h0XVxuXHRcdFx0LCB1cGRhdGVcblx0XHRcdCwgdHJ1ZVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiZDMgPSByZXF1aXJlICdkMydcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuXG5kZXIgPSAoJHdpbmRvdyktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBhbmd1bGFyLm5vb3Bcblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHRiaW5kVG9Db250cm9sbGVyOiB0cnVlXG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHNjb3BlOiBcblx0XHRcdHdpZHRoOiAnPSdcblx0XHRcdGZ1bjogJz0nXG5cdFx0bGluazogKHNjb3BlLCBlbCwgYXR0ciwgdm0pLT5cblx0XHRcdHNjYWxlID0gdm0uZnVuLnNjYWxlKClcblxuXHRcdFx0c2VsID0gZDMuc2VsZWN0KGVsWzBdKS5jbGFzc2VkICd5IGF4aXMnLCB0cnVlXG5cblx0XHRcdHVwZGF0ZSA9ID0+XG5cdFx0XHRcdHZtLmZ1bi50aWNrU2l6ZSggLXZtLndpZHRoKVxuXHRcdFx0XHRzZWwuY2FsbCB2bS5mdW5cblxuXHRcdFx0c2NvcGUuJHdhdGNoIC0+XG5cdFx0XHRcdFtzY2FsZS5kb21haW4oKSwgc2NhbGUucmFuZ2UoKSAsdm0ud2lkdGhdXG5cdFx0XHQsIHVwZGF0ZVxuXHRcdFx0LCB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzLnRpbWVvdXQgPSAoZnVuLCB0aW1lKS0+XG5cdFx0ZDMudGltZXIoKCk9PlxuXHRcdFx0ZnVuKClcblx0XHRcdHRydWVcblx0XHQsdGltZSlcblxuXG5GdW5jdGlvbjo6cHJvcGVydHkgPSAocHJvcCwgZGVzYykgLT5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5IEBwcm90b3R5cGUsIHByb3AsIGRlc2MiLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuUyA9IHJlcXVpcmUgJy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xucmVxdWlyZSAnLi4vaGVscGVycydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cblxuY2xhc3MgTWVtb3J5XG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdEBhcnJheSA9IFtdXG5cdHJlbWVtYmVyOiAoYyktPlxuXHRcdEBhcnJheS5wdXNoIGNcblx0XHRpZiBAYXJyYXkubGVuZ3RoID4gUy5tZW1fbGVuZ3RoIHRoZW4gQGFycmF5LnNoaWZ0KClcblx0dmFsOiAtPlxuXHRcdGQzLm1lYW4gQGFycmF5XG5cbmNsYXNzIE1lbW9yaWVzXG5cdGNvbnN0cnVjdG9yOiAoKS0+XG5cdFx0QG1hcCA9IGQzLm1hcCgpXG5cblx0cmVtZW1iZXI6IChhcnJfdGltZSwgY29zdCktPlxuXHRcdGlmIEBtYXAuaGFzIGFycl90aW1lXG5cdFx0XHRAbWFwLmdldCBhcnJfdGltZVxuXHRcdFx0XHQucmVtZW1iZXIgY29zdFxuXHRcdGVsc2Vcblx0XHRcdG5ld01lbSA9IG5ldyBNZW1vcnlcblx0XHRcdEBtYXAuc2V0IGFycl90aW1lICwgbmV3TWVtXG5cdFx0XHRuZXdNZW0ucmVtZW1iZXIgY29zdCBcblxuXHRtaW46IC0+XG5cdFx0YyA9IEluZmluaXR5XG5cdFx0Y2FuZGlkYXRlcyA9IFtdXG5cdFx0QG1hcC5mb3JFYWNoICh0aW1lLCBtZW1vcnkpLT5cblx0XHRcdGNvc3Q9IG1lbW9yeS52YWwoKVxuXHRcdFx0aWYgY29zdCA8IGNcblx0XHRcdFx0YyA9IGNvc3Rcblx0XHRcdFx0Y2FuZGlkYXRlcyA9IFtdXG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCArdGltZVxuXHRcdFx0ZWxzZSBpZiBjb3N0ID09IGNcblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoICt0aW1lXG5cdFx0Xy5zYW1wbGUgY2FuZGlkYXRlc1xuXG5jbGFzcyBDYXIgXG5cdGNvbnN0cnVjdG9yOiAoQG4sIEB0YXJfdGltZSktPlxuXHRcdEBzY2hlZF9wZW4gPSBJbmZpbml0eVxuXHRcdEBjb3N0ID0gSW5maW5pdHlcblx0XHRAdHJhdmVsX3BlbiA9IEluZmluaXR5XG5cdFx0QGV4aXRfdGltZSA9IEluZmluaXR5XG5cdFx0QG1lbW9yaWVzID0gbmV3IE1lbW9yaWVzXG5cdFx0QHBhdGggPSBbXVxuXHRcdEBzYW1wbGVkID0gZmFsc2VcblxuXHRleGl0Oih0aW1lKS0+IFxuXHRcdEBleGl0X3RpbWUgPSB0aW1lXG5cdFx0QHRyYXZlbF9wZW4gPSBAZXhpdF90aW1lIC0gQGFjdHVhbF90aW1lXG5cdFx0c2NoZWRfZGVsID0gQGV4aXRfdGltZSAtIFMud2lzaF90aW1lXG5cdFx0QHNjaGVkX3BlbiA9IE1hdGgubWF4KC1TLmJldGEgKiBzY2hlZF9kZWwsIFMuZ2FtbWEgKiBzY2hlZF9kZWwpXG5cdFx0QGNvc3QgPSBAdHJhdmVsX3BlbiArIEBzY2hlZF9wZW5cblx0XHRAbWVtb3JpZXMucmVtZW1iZXIgQGFjdHVhbF90aW1lICwgQGNvc3RcblxuXHRjaG9vc2U6IC0+XG5cdFx0QGxhc3RfdGFyID0gQHRhcl90aW1lXG5cdFx0QHRhcl90aW1lID0gQG1lbW9yaWVzLm1pbigpXG5cblx0Z3Vlc3NlcjogLT5cblx0XHQjIGQzLnJhbmRvbS5ub3JtYWwoIDAsIFMudmFyKSgpXG5cdFx0Xy5zYW1wbGUgWy1TLnZhci4uUy52YXJdXG5cblx0YXJyaXZlOiAtPlxuXHRcdGUgPSBNYXRoLnJvdW5kIEBndWVzc2VyKClcblx0XHRhID0gQHRhcl90aW1lICsgZVxuXHRcdHJlcyA9IE1hdGgubWF4IDEgLCBNYXRoLm1pbiggYSwgUy5udW1fbWludXRlcyAtIDEpXG5cdFx0QGFjdHVhbF90aW1lID0gcmVzXG5cdFx0cmVzXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyIiwiUyA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3NldHRpbmdzJylcbnJlcXVpcmUoJy4uL2hlbHBlcnMuY29mZmVlJylcbmQzID0gcmVxdWlyZSAnZDMnXG57bWF4fSA9IE1hdGhcblxuYmxhbmsgPSBcblx0cmVjZWl2ZV9xdWV1ZTogKCktPiBcblx0Y3VtX2Fycml2YWxzOiAwXG5cdGN1bV9leGl0czogMFxuXG5jbGFzcyBNaW51dGUgXG5cdGNvbnN0cnVjdG9yOiAoQHRpbWUpLT5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBjdW1fYXJyaXZhbHMgPSAwXG5cdFx0QGN1bV9leGl0cyA9IDBcblx0XHRAYXJyaXZhbHMgPSAwXG5cdFx0QGV4aXRzID0gMFxuXHRcdEBuZXh0ID0gdW5kZWZpbmVkXG5cdFx0QHByZXYgPSB1bmRlZmluZWRcblx0XHRAdGFyZ2V0ZWQgPSAwXG5cdFx0QHBhc3RfdGFyZ2V0cyA9IFtdXG5cblx0QHByb3BlcnR5ICd2YXJpYW5jZScsIGdldDogLT4gZDMudmFyaWFuY2UgQHBhc3RfYXJyaXZhbHNcblx0QHByb3BlcnR5ICd0YXJnZXRfYXZnJywgZ2V0OiAtPiBkMy5tZWFuIEBwYXN0X3RhcmdldHNcblxuXHRzZXRfbmV4dDogKG0pLT4gXG5cdFx0QG5leHQgPSBtID8gYmxhbmtcblxuXHRzZXRfcHJldjogKG0pLT5cblx0XHRAcHJldiA9IG0gPyBibGFua1xuXG5cdHNlcnZlOiAtPlxuXHRcdEBnb2FsX2V4aXRzID0gTWF0aC5taW4oIE1hdGgubWF4KCBTLnJhdGUgKiAoQHRpbWUgLSBTLnQxICkgLCAwKSAsIFMubnVtX2NhcnMpXG5cdFx0aWYgQHRpbWUgPCBTLnR0aWxkZSBcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gUy5yYXRlIC8oMSAtUy5iZXRhKSooQHRpbWUgLSBTLnQxKVxuXHRcdGVsc2Vcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gKEB0aW1lIC0gUy50dGlsZGUpICogUy5yYXRlIC8gKDEgKyBTLmdhbW1hKSArIChTLnR0aWxkZSAtIFMudDEpKiBTLnJhdGUgLygxIC1TLmJldGEpXG5cdFx0QGdvYWxfYXJyaXZhbHMgPSBNYXRoLm1pbiBNYXRoLm1heChAZ29hbF9hcnJpdmFscyAsIDApLCBTLm51bV9jYXJzXG5cblx0XHRcblx0XHRAcXVldWVfbGVuZ3RoID0gQHF1ZXVlLmxlbmd0aFxuXHRcdHRyYXZlbF90aW1lID0gQHF1ZXVlX2xlbmd0aCAvIFMucmF0ZVxuXHRcdGV4aXRfdGltZSA9IEB0aW1lICsgdHJhdmVsX3RpbWVcblx0XHRkZWxheSA9IGV4aXRfdGltZSAtIFMud2lzaF90aW1lXG5cdFx0QHRyYXZlbF9jb3N0ID0gdHJhdmVsX3RpbWVcblx0XHRAc2NoZWRfZGVsYXkgPSBNYXRoLm1heCAtUy5iZXRhICogZGVsYXksIFMuZ2FtbWEgKiBkZWxheVxuXHRcdEBjb3N0ID0gdHJhdmVsX3RpbWUgKyBAc2NoZWRfZGVsYXlcblxuXHRcdFswLi4uTWF0aC5taW4oQHF1ZXVlX2xlbmd0aCwgUy5yYXRlKV1cblx0XHRcdC5mb3JFYWNoICgpPT5cblx0XHRcdFx0Y2FyID0gQHF1ZXVlLnBvcCgpXG5cdFx0XHRcdGNhci5leGl0IEB0aW1lXG5cdFx0XHRcdEBleGl0cysrXG5cblx0XHRAbmV4dC5yZWNlaXZlX3F1ZXVlIEBxdWV1ZVxuXHRcdEBjdW1fZXhpdHMgPUBwcmV2LmN1bV9leGl0cyArIEBleGl0c1xuXHRcdEBjdW1fYXJyaXZhbHMgPSBAcHJldi5jdW1fYXJyaXZhbHMgKyBAYXJyaXZhbHNcblxuXHRcdEBwYXN0X3RhcmdldHMucHVzaCBAdGFyZ2V0ZWRcblx0XHRpZiBAcGFzdF90YXJnZXRzLmxlbmd0aCA+IDQwIHRoZW4gQHBhc3RfdGFyZ2V0cy5zaGlmdCgpXG5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBhcnJpdmFscyA9IDBcblx0XHRAZXhpdHMgPSAwXG5cdFx0QHRhcmdldGVkID0gMFxuXG5cdHJlY2VpdmVfY2FyOiAoY2FyKS0+IFxuXHRcdEBxdWV1ZS5wdXNoKGNhcilcblx0XHRAYXJyaXZhbHMrK1xuXG5cdHJlY2VpdmVfcXVldWU6IChxdWV1ZSktPiBAcXVldWUgPSBAcXVldWUuY29uY2F0IHF1ZXVlXG5cbm1vZHVsZS5leHBvcnRzID0gTWludXRlIiwiYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuY2xhc3MgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpIC0+XG5cdFx0QHdpZHRoID0gNDUwXG5cdFx0QGhlaWdodCA9IDI3NVxuXHRcdEBWZXIgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdFx0LmRvbWFpbiBbMCw4XVxuXHRcdFx0LnJhbmdlIFtAaGVpZ2h0LCAwXVxuXG5cdFx0QEhvciA9IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0XHQuZG9tYWluIFswLDhdXG5cdFx0XHQucmFuZ2UgWzAsIEB3aWR0aF1cblxuXHRcdEBob3JBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBASG9yXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2JvdHRvbSdcblxuXHRcdEB2ZXJBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBAVmVyXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2xlZnQnXG5cblx0XHRAbWFyID0gXG5cdFx0XHRsZWZ0OiAzMFxuXHRcdFx0dG9wOiAxMFxuXHRcdFx0cmlnaHQ6IDEwXG5cdFx0XHRib3R0b206IDI1XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdEN0cmwiLCJTZXR0aW5ncyA9IHJlcXVpcmUgJy4vc2V0dGluZ3MnXG5NaW51dGUgPSByZXF1aXJlICcuLi9tb2RlbHMvbWludXRlJ1xuQ2FyID0gcmVxdWlyZSAnLi4vbW9kZWxzL2Nhcidcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbmNsYXNzIERhdGFcblx0Y29uc3RydWN0b3I6ICgpLT5cblx0XHRAbWludXRlcyA9IFswLi4uU2V0dGluZ3MubnVtX21pbnV0ZXNdLm1hcCAodGltZSk9PiBcblx0XHRcdFx0bmV3TWludXRlID0gbmV3IE1pbnV0ZSB0aW1lXG5cblx0XHRAbWludXRlcy5mb3JFYWNoIChtaW4saSxrKS0+XG5cdFx0XHRtaW4uc2V0X3ByZXYga1tpLTFdXG5cdFx0XHRtaW4uc2V0X25leHQga1tpKzFdXG5cblx0XHRAY2FycyA9IFswLi4uU2V0dGluZ3MubnVtX2NhcnNdLm1hcCAobiktPlxuXHRcdFx0XHRhcnJfdGltZSA9IF8uc2FtcGxlIFszLi4xMjBdXG5cdFx0XHRcdG5ld0NhciA9IG5ldyBDYXIgbiwgYXJyX3RpbWVcblxuXHRcdEBjYXJzLmZvckVhY2ggKGNhcixpLGspID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cblx0XHRAc3RhcnRfdGltZXMgPSBbXVxuXHRcdGkgPSAwXG5cblx0XHRAcmVjb3JkID0gLT5cblx0XHRcdFx0cyA9IF8uZmluZCBAbWludXRlcyAsIChkKT0+XG5cdFx0XHRcdFx0ZC5xdWV1ZS5sZW5ndGggPiBTZXR0aW5ncy5yYXRlXG5cdFx0XHRcdEBzdGFydF90aW1lcy5wdXNoIHMudGltZVxuXHRcdFx0XHRpZiBAc3RhcnRfdGltZXMubGVuZ3RoID4gMTAwMDAgdGhlbiBAc3RhcnRfdGltZXMuc2hpZnQoKVxuXG5cdGNhcnNfY2hvb3NlOiAtPlxuXHRcdF8uc2FtcGxlIEBjYXJzLCBTZXR0aW5ncy5zYW1wbGVfc2l6ZVxuXHRcdFx0LmZvckVhY2ggKGNhciktPlxuXHRcdFx0XHRjYXIuY2hvb3NlKClcblxuXHRjYXJzX2Fycml2ZTogLT5cblx0XHRAY2Fycy5mb3JFYWNoIChjYXIpID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cdFx0XHRAbWludXRlc1tjYXIudGFyX3RpbWVdLnRhcmdldGVkKytcblxuXHR0aWNrOiAtPlxuXHRcdCMgcGh5c2ljcyBzdGFnZVxuXHRcdEBtaW51dGVzLmZvckVhY2ggKG1pbnV0ZSktPiBtaW51dGUuc2VydmUoKVxuXHRcdCMgY2hvaWNlIHN0YWdlXG5cdFx0QGNhcnNfYXJyaXZlKClcblx0XHRAY2Fyc19jaG9vc2UoKVxuXHRcdEByZWNvcmQoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGEoKVxuIiwicmVxdWlyZSAnLi4vaGVscGVycydcbmNsYXNzIFNcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QG51bV9jYXJzID0gMTAwMFxuXHRcdEB3aXNoX3RpbWUgPSAxMjBcblx0XHRAbnVtX21pbnV0ZXM9IDE3MFxuXHRcdEByYXRlID0gMTBcblx0XHRAYmV0YSA9IC41XG5cdFx0QGdhbW1hID0gMlxuXHRcdEB2YXIgPSAyXG5cdFx0QHNhbXBsZV9zaXplID0gMjAwXG5cdFx0QGludGVydmFsID0gMjVcblx0XHRAbWVtX2xlbmd0aCA9IDJcblx0QHByb3BlcnR5ICd0MScsIGdldDogLT5cblx0XHRAd2lzaF90aW1lIC0gQG51bV9jYXJzIC8gQHJhdGUgKiBAZ2FtbWEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cdEBwcm9wZXJ0eSAndDInLCBnZXQ6IC0+XG5cdFx0QHdpc2hfdGltZSArIEBudW1fY2FycyAvIEByYXRlICogQGJldGEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cdEBwcm9wZXJ0eSAndHRpbGRlJywgZ2V0Oi0+XG5cdFx0QHdpc2hfdGltZSAtIEBudW1fY2FycyAvIEByYXRlICogQGdhbW1hICogQGJldGEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUyAiXX0=
