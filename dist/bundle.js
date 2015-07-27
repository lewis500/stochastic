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
var Data, PlotCtrl, Settings, Shadows, cumCtrl, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.arr_line(vm.minutes)}' />\n			<path class='arr-line goal' ng-attr-d='{{vm.goal_arrs(vm.minutes)}}' />\n			<path class='exit-line' d3-der='{d: vm.exit_line(vm.minutes)}' />\n			<path class='exit-line goal' ng-attr-d='{{vm.goal_exits(vm.minutes)}}' />\n			<line d3-der='{x1: vm.Hor(vm.S.wish_time), x2: vm.Hor(vm.S.wish_time), y1: vm.Ver(0), y2: 0}' class='wish_time' />\n		</g>\n		<g class='g-lines2'>\n			<path ng-repeat ='p in vm.shad.array track by $index' ng-attr-d='{{p}}' class='arr-line' ng-attr-opacity='{{::.5 - .05 * $index}}'/>\n		</g>\n	</g>\n</svg>";

Shadows = (function() {
  function Shadows() {
    this.array = [];
    this.counter = 0;
  }

  Shadows.prototype.add = function(path) {
    this.counter++;
    if (this.counter % 20 !== 0) {
      return;
    }
    this.array.unshift('M' + path);
    if (this.array.length > 10) {
      return this.array.pop();
    }
  };

  return Shadows;

})();

cumCtrl = (function(superClass) {
  extend(cumCtrl, superClass);

  function cumCtrl(scope) {
    this.scope = scope;
    cumCtrl.__super__.constructor.call(this, this.scope);
    this.minutes = Data.minutes;
    this.Ver.domain([0, Settings.num_cars]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.S = Settings;
    this.shad = new Shadows;
    this.arr_line = d3.svg.line().interpolate((function(_this) {
      return function(points) {
        var path;
        path = points.join('L');
        _this.shad.add(path);
        return path;
      };
    })(this)).y((function(_this) {
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

template = '<div flex=\'50\'>\n	<md-button ng-click=\'vm.play()\'>Play</md-button>\n	<md-button ng-click=\'vm.stop()\'>Stop</md-button>\n	<md-button ng-click=\'vm.reset()\'>Reset</md-button>\n	<md-checkbox ng-model=\'vm.S.tolling\'>Toggle Toll</md-checkbox>\n	<div layout>\n	    <div flex="30" layout layout-align="center center">\n	       <span class="md-body-1">Memory length</span>\n	    </div>\n	    <md-slider flex ng-model="vm.S.mem_length" min=\'1\' max=\'10\' md-discrete step=\'1\' />\n   </div>\n   	<div layout>\n   	    <div flex="30" layout layout-align="center center">\n   	       <span class="md-body-1">Error</span>\n   	    </div>\n   	    <md-slider flex ng-model="vm.S.var" min=\'1\' max=\'5\' md-discrete step=\'.5\' />\n    </div>\n</div>\n<div flex=\'45\'>\n    	<div layout>\n    	    <div flex="30" layout layout-align="center center">\n    	       <span class="md-body-1">Sample Size</span>\n    	    </div>\n    	    <md-slider flex ng-model="vm.S.sample_size" min=\'10\' max=\'300\' md-discrete step=\'10\' />\n     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Beta</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.beta" min=\'.1\' max=\'.9\' md-discrete step=\'.05\' />\n 	     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Gamma</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.gamma" min=\'1.5\' max=\'3\' md-discrete step=\'.05\' />\n 	     </div>\n</div>';

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
    d3.timer.flush();
    return this.paused = true;
  };

  Ctrl.prototype.reset = function() {
    return Data.reset();
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

  Car.prototype.toll = function(time) {
    return Math.max(S.num_cars / S.rate * (S.beta * S.gamma) / (S.beta + S.gamma) - this.sched_pen, 0);
  };

  Car.prototype.exit = function(time) {
    var c, sched_del;
    this.exit_time = time;
    this.travel_pen = this.exit_time - this.actual_time;
    sched_del = this.exit_time - S.wish_time;
    this.sched_pen = Math.max(-S.beta * sched_del, S.gamma * sched_del);
    c = S.tolling ? this.toll(time) : 0;
    this.cost = this.travel_pen + this.sched_pen + c;
    return this.memories.remember(this.actual_time, this.cost);
  };

  Car.prototype.choose = function() {
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
    this.reset();
    this.next = void 0;
    this.prev = void 0;
  }

  Minute.prototype.reset = function() {
    this.queue = [];
    this.cum_arrivals = 0;
    this.cum_exits = 0;
    this.arrivals = 0;
    this.exits = 0;
    this.targeted = 0;
    return this.past_targets = [];
  };

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
    this.height = 200;
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
    var j, ref, results;
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
    this.reset();
    this.start_times = [];
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

  Data.prototype.reset = function() {
    var cands, j, l, ref, results, results1;
    cands = (function() {
      results = [];
      for (j = 10; j <= 100; j++){ results.push(j); }
      return results;
    }).apply(this);
    this.minutes.forEach(function(m) {
      return m.reset();
    });
    this.cars = (function() {
      results1 = [];
      for (var l = 0, ref = Settings.num_cars; 0 <= ref ? l < ref : l > ref; 0 <= ref ? l++ : l--){ results1.push(l); }
      return results1;
    }).apply(this).map(function(n) {
      var newCar, tar_time;
      tar_time = _.sample(cands);
      return newCar = new Car(n, tar_time);
    });
    return this.cars.forEach((function(_this) {
      return function(car, i, k) {
        var time;
        time = car.arrive();
        return _this.minutes[time].receive_car(car);
      };
    })(this));
  };

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
        if (time === void 0) {
          debugger;
        }
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
    this.tolling = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvYXBwLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL2NoYXJ0cy9hcnJDaGFydC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY29zdC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY3VtQ2hhcnQuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL21haW4uY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL3N0YXJ0LmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2JlaGF2aW9yLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2QzRGVyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2RhdHVtLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL3NoaWZ0ZXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveEF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveUF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2hlbHBlcnMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9jYXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9taW51dGUuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9wbG90Q3RybC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvZGF0YS5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvc2V0dGluZ3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBQSxDQUFBO0FBQUEsSUFBQSxnQkFBQTs7QUFBQSxPQUNBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FEVixDQUFBOztBQUFBLEVBRUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsR0FHQSxHQUFNLE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBZixFQUEwQixDQUFDLE9BQUEsQ0FBUSxrQkFBUixDQUFELENBQTFCLENBRUwsQ0FBQyxTQUZJLENBRU0sVUFGTixFQUVrQixPQUFBLENBQVEsOEJBQVIsQ0FGbEIsQ0FHTCxDQUFDLFNBSEksQ0FHTSxVQUhOLEVBR2tCLE9BQUEsQ0FBUSw4QkFBUixDQUhsQixDQUlMLENBQUMsU0FKSSxDQUlNLFNBSk4sRUFJaUIsT0FBQSxDQUFRLDBCQUFSLENBSmpCLENBS0wsQ0FBQyxTQUxJLENBS00sVUFMTixFQUtrQixPQUFBLENBQVEsMkJBQVIsQ0FMbEIsQ0FNTCxDQUFDLFNBTkksQ0FNTSxTQU5OLEVBTWlCLE9BQUEsQ0FBUSwwQkFBUixDQU5qQixDQVFMLENBQUMsU0FSSSxDQVFNLFNBUk4sRUFRa0IsT0FBQSxDQUFRLHNCQUFSLENBUmxCLENBU0wsQ0FBQyxTQVRJLENBU00sWUFUTixFQVNv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SyxTQUFBLEdBQUE7YUFDcEIsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxJQUFiLEdBQW9CLElBQUMsQ0FBQSxLQUFyQixHQUE2QixDQUFDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLEtBQVYsRUFEdEI7SUFBQSxDQUFMO0dBQWhCLENBWkEsQ0FBQTs7QUFBQSxFQWNBLENBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQjtBQUFBLElBQUEsR0FBQSxFQUFLLFNBQUEsR0FBQTthQUNwQixJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLElBQWIsR0FBb0IsSUFBQyxDQUFBLElBQXJCLEdBQTRCLENBQUMsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsS0FBVixFQURyQjtJQUFBLENBQUw7R0FBaEIsQ0FkQSxDQUFBOztBQUFBLEVBZ0JBLENBQUMsQ0FBQSxRQUFELENBQVUsUUFBVixFQUFvQjtBQUFBLElBQUEsR0FBQSxFQUFJLFNBQUEsR0FBQTthQUN2QixJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLElBQWIsR0FBb0IsSUFBQyxDQUFBLEtBQXJCLEdBQTZCLElBQUMsQ0FBQSxJQUE5QixHQUFxQyxDQUFDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLEtBQVYsRUFEM0I7SUFBQSxDQUFKO0dBQXBCLENBaEJBLENBQUE7O1dBQUE7O0lBRkQsQ0FBQTs7QUFBQSxNQXNCTSxDQUFDLE9BQVAsR0FBaUIsR0FBQSxDQUFBLENBdEJqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuYXBwID0gYW5ndWxhci5tb2R1bGUgJ21haW5BcHAnLCBbcmVxdWlyZSAnYW5ndWxhci1tYXRlcmlhbCddXG5cdCMgY2hhcnRzXG5cdC5kaXJlY3RpdmUgJ2N1bUNoYXJ0JywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYXJ0cy9jdW1DaGFydCdcblx0LmRpcmVjdGl2ZSAnYXJyQ2hhcnQnLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL2FyckNoYXJ0J1xuXHQuZGlyZWN0aXZlICdtYWluRGVyJywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYXJ0cy9tYWluJ1xuXHQuZGlyZWN0aXZlICdzdGFydERlcicsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jaGFydHMvc3RhcnQnXG5cdC5kaXJlY3RpdmUgJ2Nvc3REZXInLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL2Nvc3QnXG5cdCMgZGlyZWN0aXZlc1xuXHQuZGlyZWN0aXZlICdzaGlmdGVyJyAsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9zaGlmdGVyJ1xuXHQuZGlyZWN0aXZlICdob3JBeGlzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3hBeGlzJ1xuXHQuZGlyZWN0aXZlICd2ZXJBeGlzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3lBeGlzJ1xuXHQuZGlyZWN0aXZlICdzaGlmdGVyJyAsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9zaGlmdGVyJ1xuXHQuZGlyZWN0aXZlICdiZWhhdmlvcicsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9iZWhhdmlvcidcblx0LmRpcmVjdGl2ZSAnZGF0dW0nLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMvZGF0dW0nXG5cdC5kaXJlY3RpdmUgJ2QzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL2QzRGVyJ1xuXHQjIC5kaXJlY3RpdmUgJ2NoYW5nZUNoYXJ0JywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlQ2hhcnQnXG5cdCMgLmRpcmVjdGl2ZSAnY2hhbmdlRGVyJywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlczInIiwiZDMgPSByZXF1aXJlKCdkMycpXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcblxudGVtcGxhdGUgPSBcIlwiXCJcblx0PHN2ZyBuZy1hdHRyLXdpZHRoPSd7ezo6dm0ud2lkdGggKyB2bS5tYXIubGVmdCt2bS5tYXIucmlnaHR9fScgbmctYXR0ci1oZWlnaHQ9J3t7Ojp2bS5oZWlnaHQgKyB2bS5tYXIudG9wICsgdm0ubWFyLmJvdHRvbX19Jz5cblx0XHQ8ZyBjbGFzcz0nZy1tYWluJyBzaGlmdGVyPSd7ezo6W3ZtLm1hci5sZWZ0LCB2bS5tYXIudG9wXX19Jz5cblx0XHRcdDxyZWN0IGQzLWRlcj0ne3dpZHRoOiB2bS53aWR0aCwgaGVpZ2h0OiB2bS5oZWlnaHR9JyBjbGFzcz0nYmFja2dyb3VuZCcgLz5cblx0XHRcdDxnIHZlci1heGlzLWRlciB3aWR0aD0ndm0ud2lkdGgnIGZ1bj0ndm0udmVyQXhGdW4nID48L2c+XG5cdFx0XHQ8ZyBob3ItYXhpcy1kZXIgZnVuPSd2bS5ob3JBeEZ1bicgaGVpZ2h0PSd2bS5oZWlnaHQnIHNoaWZ0ZXI9J3t7OjpbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzJz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lJyAgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bih2bS5taW51dGVzKX0nIC8+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdleGl0LWxpbmUnIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4yKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPlxuXCJcIlwiXG5jbGFzcyBhcnJDdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCA0MF1cblx0XHRASG9yLmRvbWFpbiBbMCwgU2V0dGluZ3MubnVtX21pbnV0ZXNdXG5cdFx0IyBAbGluZUZ1biA9IGQzLnN2Zy5saW5lKClcblx0XHQjIFx0LnkgKGQpPT4gQFZlciBkLmFycml2YWxzXG5cdFx0IyBcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0QGxpbmVGdW4yID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLnRhcmdldF9hdmdcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5kZXIgPSAoKS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgYXJyQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJkMyA9IHJlcXVpcmUoJ2QzJylcblNldHRpbmdzID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvc2V0dGluZ3MnXG5QbG90Q3RybCA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9wbG90Q3RybCdcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xuXG50ZW1wbGF0ZSA9IFwiXCJcIlxuXHQ8c3ZnIG5nLWF0dHItd2lkdGg9J3t7Ojp2bS53aWR0aCArIHZtLm1hci5sZWZ0K3ZtLm1hci5yaWdodH19JyBuZy1hdHRyLWhlaWdodD0ne3s6OnZtLmhlaWdodCArIHZtLm1hci50b3AgKyB2bS5tYXIuYm90dG9tfX0nPlxuXHRcdDxnIGNsYXNzPSdnLW1haW4nIHNoaWZ0ZXI9J3t7Ojpbdm0ubWFyLmxlZnQsIHZtLm1hci50b3BdfX0nPlxuXHRcdFx0PHJlY3QgZDMtZGVyPSd7d2lkdGg6IHZtLndpZHRoLCBoZWlnaHQ6IHZtLmhlaWdodH0nIGNsYXNzPSdiYWNrZ3JvdW5kJyAvPlxuXHRcdFx0PGcgdmVyLWF4aXMtZGVyIHdpZHRoPSd2bS53aWR0aCcgZnVuPSd2bS52ZXJBeEZ1bicgPjwvZz5cblx0XHRcdDxnIGhvci1heGlzLWRlciBmdW49J3ZtLmhvckF4RnVuJyBoZWlnaHQ9J3ZtLmhlaWdodCcgc2hpZnRlcj0ne3s6OlswLHZtLmhlaWdodF19fSc+PC9nPlxuXHRcdFx0PGcgY2xhc3M9J2ctbGluZXMnPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZnVuIHRvdGFsX2Nvc3QnICBkMy1kZXI9J3tkOiB2bS5saW5lRnVuKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Z1biB0cmF2ZWxfY29zdCcgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4yKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Z1biBzY2hlZHVsZV9kZWxheScgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4zKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPlxuXCJcIlwiXG5jbGFzcyBhcnJDdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCAxMDBdXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXG5cdFx0QGxpbmVGdW4gPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY29zdFxuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRAbGluZUZ1bjIgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQudHJhdmVsX2Nvc3Rcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0QGxpbmVGdW4zID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLnNjaGVkX2RlbGF5XG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBhcnJDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdhcnItbGluZScgIGQzLWRlcj0ne2Q6IHZtLmFycl9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lIGdvYWwnIG5nLWF0dHItZD0ne3t2bS5nb2FsX2FycnModm0ubWludXRlcyl9fScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZScgZDMtZGVyPSd7ZDogdm0uZXhpdF9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZSBnb2FsJyBuZy1hdHRyLWQ9J3t7dm0uZ29hbF9leGl0cyh2bS5taW51dGVzKX19JyAvPlxuXHRcdFx0XHQ8bGluZSBkMy1kZXI9J3t4MTogdm0uSG9yKHZtLlMud2lzaF90aW1lKSwgeDI6IHZtLkhvcih2bS5TLndpc2hfdGltZSksIHkxOiB2bS5WZXIoMCksIHkyOiAwfScgY2xhc3M9J3dpc2hfdGltZScgLz5cblx0XHRcdDwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzMic+XG5cdFx0XHRcdDxwYXRoIG5nLXJlcGVhdCA9J3AgaW4gdm0uc2hhZC5hcnJheSB0cmFjayBieSAkaW5kZXgnIG5nLWF0dHItZD0ne3twfX0nIGNsYXNzPSdhcnItbGluZScgbmctYXR0ci1vcGFjaXR5PSd7ezo6LjUgLSAuMDUgKiAkaW5kZXh9fScvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgU2hhZG93c1xuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAYXJyYXkgPSBbXVxuXHRcdEBjb3VudGVyID0gMFxuXHRhZGQ6IChwYXRoKS0+XG5cdFx0QGNvdW50ZXIrK1xuXHRcdGlmIEBjb3VudGVyJTIwICE9MCB0aGVuIHJldHVyblxuXHRcdEBhcnJheS51bnNoaWZ0ICdNJyArIHBhdGhcblx0XHRpZiBAYXJyYXkubGVuZ3RoID4gMTAgdGhlbiBAYXJyYXkucG9wKClcblxuXG5jbGFzcyBjdW1DdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCBTZXR0aW5ncy5udW1fY2Fyc10gXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXHRcdEBTID0gU2V0dGluZ3NcblxuXHRcdEBzaGFkID0gbmV3IFNoYWRvd3NcblxuXHRcdEBhcnJfbGluZSA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC5pbnRlcnBvbGF0ZSAocG9pbnRzKT0+XG5cdFx0XHRcdHBhdGggPSBwb2ludHMuam9pbiAnTCdcblx0XHRcdFx0QHNoYWQuYWRkIHBhdGhcblx0XHRcdFx0cGF0aFxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmN1bV9hcnJpdmFsc1xuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWUgXG5cblx0XHRAZXhpdF9saW5lID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmN1bV9leGl0c1xuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRcblx0XHRAZ29hbF9leGl0cyA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC5nb2FsX2V4aXRzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXG5cdFx0QGdvYWxfYXJycyA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC5nb2FsX2Fycml2YWxzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdFx0XG5cdFx0XHRcbmRlciA9IC0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgY3VtQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblxubW9kdWxlLmV4cG9ydHMgPSBkZXJcblxuIiwiJ3VzZSBzdHJpY3QnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuZDMgPSByZXF1aXJlICdkMydcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xudGltZW91dCA9IHJlcXVpcmUoICcuLi8uLi9oZWxwZXJzJykudGltZW91dFxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcbnRlbXBsYXRlID0gJycnXG5cdDxkaXYgZmxleD0nNTAnPlxuXHRcdDxtZC1idXR0b24gbmctY2xpY2s9J3ZtLnBsYXkoKSc+UGxheTwvbWQtYnV0dG9uPlxuXHRcdDxtZC1idXR0b24gbmctY2xpY2s9J3ZtLnN0b3AoKSc+U3RvcDwvbWQtYnV0dG9uPlxuXHRcdDxtZC1idXR0b24gbmctY2xpY2s9J3ZtLnJlc2V0KCknPlJlc2V0PC9tZC1idXR0b24+XG5cdFx0PG1kLWNoZWNrYm94IG5nLW1vZGVsPSd2bS5TLnRvbGxpbmcnPlRvZ2dsZSBUb2xsPC9tZC1jaGVja2JveD5cblx0XHQ8ZGl2IGxheW91dD5cblx0XHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuXHRcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPk1lbW9yeSBsZW5ndGg8L3NwYW4+XG5cdFx0ICAgIDwvZGl2PlxuXHRcdCAgICA8bWQtc2xpZGVyIGZsZXggbmctbW9kZWw9XCJ2bS5TLm1lbV9sZW5ndGhcIiBtaW49JzEnIG1heD0nMTAnIG1kLWRpc2NyZXRlIHN0ZXA9JzEnIC8+XG5cdCAgIDwvZGl2PlxuXHQgICBcdDxkaXYgbGF5b3V0PlxuXHQgICBcdCAgICA8ZGl2IGZsZXg9XCIzMFwiIGxheW91dCBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG5cdCAgIFx0ICAgICAgIDxzcGFuIGNsYXNzPVwibWQtYm9keS0xXCI+RXJyb3I8L3NwYW4+XG5cdCAgIFx0ICAgIDwvZGl2PlxuXHQgICBcdCAgICA8bWQtc2xpZGVyIGZsZXggbmctbW9kZWw9XCJ2bS5TLnZhclwiIG1pbj0nMScgbWF4PSc1JyBtZC1kaXNjcmV0ZSBzdGVwPScuNScgLz5cblx0ICAgIDwvZGl2PlxuXHQ8L2Rpdj5cblx0PGRpdiBmbGV4PSc0NSc+XG4gICAgXHQ8ZGl2IGxheW91dD5cblx0ICAgIFx0ICAgIDxkaXYgZmxleD1cIjMwXCIgbGF5b3V0IGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cblx0ICAgIFx0ICAgICAgIDxzcGFuIGNsYXNzPVwibWQtYm9keS0xXCI+U2FtcGxlIFNpemU8L3NwYW4+XG5cdCAgICBcdCAgICA8L2Rpdj5cblx0ICAgIFx0ICAgIDxtZC1zbGlkZXIgZmxleCBuZy1tb2RlbD1cInZtLlMuc2FtcGxlX3NpemVcIiBtaW49JzEwJyBtYXg9JzMwMCcgbWQtZGlzY3JldGUgc3RlcD0nMTAnIC8+XG5cdCAgICAgPC9kaXY+XG4gICAgIFx0PGRpdiBsYXlvdXQ+XG4gXHQgICAgXHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuIFx0ICAgIFx0ICAgICAgIDxzcGFuIGNsYXNzPVwibWQtYm9keS0xXCI+QmV0YTwvc3Bhbj5cbiBcdCAgICBcdCAgICA8L2Rpdj5cbiBcdCAgICBcdCAgICA8bWQtc2xpZGVyIGZsZXggbmctbW9kZWw9XCJ2bS5TLmJldGFcIiBtaW49Jy4xJyBtYXg9Jy45JyBtZC1kaXNjcmV0ZSBzdGVwPScuMDUnIC8+XG4gXHQgICAgIDwvZGl2PlxuICAgICBcdDxkaXYgbGF5b3V0PlxuIFx0ICAgIFx0ICAgIDxkaXYgZmxleD1cIjMwXCIgbGF5b3V0IGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiBcdCAgICBcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPkdhbW1hPC9zcGFuPlxuIFx0ICAgIFx0ICAgIDwvZGl2PlxuIFx0ICAgIFx0ICAgIDxtZC1zbGlkZXIgZmxleCBuZy1tb2RlbD1cInZtLlMuZ2FtbWFcIiBtaW49JzEuNScgbWF4PSczJyBtZC1kaXNjcmV0ZSBzdGVwPScuMDUnIC8+XG4gXHQgICAgIDwvZGl2PlxuXHQ8L2Rpdj5cbicnJ1xuXG5jbGFzcyBDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0QHBhdXNlZCA9IGZhbHNlXG5cdFx0QERhdGEgPSBEYXRhXG5cdFx0QFMgPSBTZXR0aW5nc1xuXG5cdGxvb3BlcjogLT5cblx0XHR0aW1lb3V0ID0+XG5cdFx0XHREYXRhLnRpY2soKVxuXHRcdFx0QHNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdFx0aWYgbm90IEBwYXVzZWQgdGhlbiBAbG9vcGVyKClcblx0XHRcdEBwYXVzZWRcblx0XHQsIFNldHRpbmdzLmludGVydmFsXG5cblx0cGxheTogLT5cblx0XHRAcGF1c2VkID0gZmFsc2Vcblx0XHRkMy50aW1lci5mbHVzaCgpXG5cdFx0QGxvb3BlcigpXG5cblx0c3RvcDogLT4gXG5cdFx0ZDMudGltZXIuZmx1c2goKVxuXHRcdEBwYXVzZWQgPSB0cnVlXG5cblx0cmVzZXQ6LT5cblx0XHQjIEBzdG9wKClcblx0XHREYXRhLnJlc2V0KClcblxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID1cblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsIEN0cmxdXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0c2NvcGU6IHt9XG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlclxuIiwiZDMgPSByZXF1aXJlKCdkMycpXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcblxudGVtcGxhdGUgPSBcIlwiXCJcblx0PHN2ZyBuZy1hdHRyLXdpZHRoPSd7ezo6dm0ud2lkdGggKyB2bS5tYXIubGVmdCt2bS5tYXIucmlnaHR9fScgbmctYXR0ci1oZWlnaHQ9J3t7Ojp2bS5oZWlnaHQgKyB2bS5tYXIudG9wICsgdm0ubWFyLmJvdHRvbX19Jz5cblx0XHQ8ZyBjbGFzcz0nZy1tYWluJyBzaGlmdGVyPSd7ezo6W3ZtLm1hci5sZWZ0LCB2bS5tYXIudG9wXX19Jz5cblx0XHRcdDxyZWN0IGQzLWRlcj0ne3dpZHRoOiB2bS53aWR0aCwgaGVpZ2h0OiB2bS5oZWlnaHR9JyBjbGFzcz0nYmFja2dyb3VuZCcgLz5cblx0XHRcdDxnIHZlci1heGlzLWRlciB3aWR0aD0ndm0ud2lkdGgnIGZ1bj0ndm0udmVyQXhGdW4nID48L2c+XG5cdFx0XHQ8ZyBob3ItYXhpcy1kZXIgZnVuPSd2bS5ob3JBeEZ1bicgaGVpZ2h0PSd2bS5oZWlnaHQnIHNoaWZ0ZXI9J3t7OjpbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzJz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lJyAgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bih2bS5EYXRhLnN0YXJ0X3RpbWVzKX0nIC8+XG5cdFx0XHQ8L2c+XG5cdFx0PC9nPlxuXHRcdDxnIGNsYXNzPSd0b29sdGlwJyBuZy1hdHRyLXRyYW5zZm9ybT0ndHJhbnNsYXRlKHt7dm0ubGVmdH19LHt7dm0udG9wfX0pJz5cblx0XHRcdDx0ZXh0Pnt7dm0uaGVsbG8gfCBudW1iZXI6IDB9fTwvdGV4dD5cblx0XHQ8L2c+XG5cdDwvc3ZnPlxuXCJcIlwiXG5cbmNsYXNzIEN0cmwgZXh0ZW5kcyBQbG90Q3RybFxuXHRjb25zdHJ1Y3RvcjogKEBzY29wZSwgZWwpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAVmVyLmRvbWFpbiBbMCwgNjBdIFxuXHRcdEBIb3IuZG9tYWluIFswLCA1MDAwXVxuXHRcdEBoZWxsbyA9IDUwXG5cdFx0QGxlZnQgPSAwXG5cdFx0QHRvcCA9IDBcblxuXHRcdEBEYXRhID0gRGF0YVxuXG5cdFx0QGxpbmVGdW4gPSBkMy5zdmcubGluZSgpXG5cdFx0XHQuZGVmaW5lZCAoZCxpKS0+XG5cdFx0XHRcdCghIWQpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGRcblx0XHRcdC54IChkLGkpPT4gQEhvciBpXG5cblx0XHR6b29tID0gZDMuYmVoYXZpb3Iuem9vbSgpXG5cdFx0ICAgIC54IEBIb3Jcblx0XHQgICAgLnkgQFZlclxuXHRcdCAgICAuc2NhbGVFeHRlbnQgWzEsIDE1XVxuXG5cdFx0ZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHQuc2VsZWN0ICcuZy1tYWluJ1xuXHRcdFx0LmNhbGwgem9vbVxuXHRcdHZtID0gdGhpc1xuXG5cdFx0ZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHQuc2VsZWN0ICcuZy1tYWluJ1xuXHRcdFx0Lm9uICdtb3VzZW1vdmUnLCAtPlxuXHRcdFx0XHRsb2MgPSBkMy5tb3VzZSB0aGlzXG5cdFx0XHRcdHZtLmxlZnQgPSBsb2NbMF1cblx0XHRcdFx0dm0udG9wID0gbG9jWzFdXG5cdFx0XHRcdHZtLmhlbGxvID0gdm0uSG9yLmludmVydCB2bS5sZWZ0XG5cdFx0XHRcdHZtLnNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdFx0XG5kZXIgPSAtPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsICckZWxlbWVudCcsIEN0cmxdXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0c2NvcGU6IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVyXG5cbiIsImRyYWcgPSAoJHBhcnNlKS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGxpbms6IChzY29wZSxlbCxhdHRyKS0+XG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QoZWxbMF0pXG5cdFx0XHRzZWwuY2FsbCgkcGFyc2UoYXR0ci5iZWhhdmlvcikoc2NvcGUpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRyYWciLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5cbmRlciA9ICgkcGFyc2UpLT4gI2dvZXMgb24gYSBzdmcgZWxlbWVudFxuXHRkaXJlY3RpdmUgPSBcblx0XHRyZXN0cmljdDogJ0EnXG5cdFx0c2NvcGU6IFxuXHRcdFx0ZDNEZXI6ICc9J1xuXHRcdFx0dHJhbjogJz0nXG5cdFx0bGluazogKHNjb3BlLCBlbCwgYXR0ciktPlxuXHRcdFx0c2VsID0gZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHR1ID0gJ3QtJyArIE1hdGgucmFuZG9tKClcblx0XHRcdHNjb3BlLiR3YXRjaCAnZDNEZXInXG5cdFx0XHRcdCwgKHYpLT5cblx0XHRcdFx0XHRpZiBzY29wZS50cmFuXG5cdFx0XHRcdFx0XHRzZWwudHJhbnNpdGlvbiB1XG5cdFx0XHRcdFx0XHRcdC5hdHRyIHZcblx0XHRcdFx0XHRcdFx0LmNhbGwgc2NvcGUudHJhblxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHNlbC5hdHRyIHZcblxuXHRcdFx0XHQsIHRydWVcbm1vZHVsZS5leHBvcnRzID0gZGVyIiwibW9kdWxlLmV4cG9ydHMgPSAoJHBhcnNlKS0+XG5cdChzY29wZSwgZWwsIGF0dHIpLT5cblx0XHRkMy5zZWxlY3QoZWxbMF0pLmRhdHVtICRwYXJzZShhdHRyLmRhdHVtKShzY29wZSkiLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuXG5kZXIgPSAoJHBhcnNlKS0+XG5cdGRpcmVjdGl2ZSA9XG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIpLT5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0dSA9ICd0LScgKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR0cmFuID0gJHBhcnNlKGF0dHIudHJhbikoc2NvcGUpXG5cdFx0XHRyZXNoaWZ0ID0gKHYpLT4gXG5cdFx0XHRcdGlmIHRyYW5cblx0XHRcdFx0XHRzZWwudHJhbnNpdGlvbiB1XG5cdFx0XHRcdFx0XHQuYXR0ciAndHJhbnNmb3JtJyAsIFwidHJhbnNsYXRlKCN7dlswXX0sI3t2WzFdfSlcIlxuXHRcdFx0XHRcdFx0LmNhbGwgdHJhblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0c2VsLmF0dHIgJ3RyYW5zZm9ybScgLCBcInRyYW5zbGF0ZSgje3ZbMF19LCN7dlsxXX0pXCJcblxuXHRcdFx0XHRkMy5zZWxlY3QgZWxbMF1cblx0XHRcdFx0XHRcblxuXHRcdFx0c2NvcGUuJHdhdGNoIC0+XG5cdFx0XHRcdFx0JHBhcnNlKGF0dHIuc2hpZnRlcikoc2NvcGUpXG5cdFx0XHRcdCwgcmVzaGlmdFxuXHRcdFx0XHQsIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5cbmRlciA9ICgkd2luZG93KS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IGFuZ3VsYXIubm9vcFxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcblx0XHRyZXN0cmljdDogJ0EnXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0c2NvcGU6IFxuXHRcdFx0aGVpZ2h0OiAnPSdcblx0XHRcdGZ1bjogJz0nXG5cdFx0bGluazogKHNjb3BlLCBlbCwgYXR0ciwgdm0pLT5cblx0XHRcdHNjYWxlID0gdm0uZnVuLnNjYWxlKClcblxuXHRcdFx0c2VsID0gZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHRcdC5jbGFzc2VkICd4IGF4aXMnLCB0cnVlXG5cblx0XHRcdHVwZGF0ZSA9ID0+XG5cdFx0XHRcdHZtLmZ1bi50aWNrU2l6ZSAtdm0uaGVpZ2h0XG5cdFx0XHRcdHNlbC5jYWxsIHZtLmZ1blxuXHRcdFx0XHRcblx0XHRcdHNjb3BlLiR3YXRjaCAtPlxuXHRcdFx0XHRbc2NhbGUuZG9tYWluKCksIHNjYWxlLnJhbmdlKCkgLHZtLmhlaWdodF1cblx0XHRcdCwgdXBkYXRlXG5cdFx0XHQsIHRydWVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSAnZDMnXG5hbmd1bGFyID0gcmVxdWlyZSAnYW5ndWxhcidcblxuZGVyID0gKCR3aW5kb3cpLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogYW5ndWxhci5ub29wXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0YmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuXHRcdHJlc3RyaWN0OiAnQSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHRzY29wZTogXG5cdFx0XHR3aWR0aDogJz0nXG5cdFx0XHRmdW46ICc9J1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIsIHZtKS0+XG5cdFx0XHRzY2FsZSA9IHZtLmZ1bi5zY2FsZSgpXG5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdChlbFswXSkuY2xhc3NlZCAneSBheGlzJywgdHJ1ZVxuXG5cdFx0XHR1cGRhdGUgPSA9PlxuXHRcdFx0XHR2bS5mdW4udGlja1NpemUoIC12bS53aWR0aClcblx0XHRcdFx0c2VsLmNhbGwgdm0uZnVuXG5cblx0XHRcdHNjb3BlLiR3YXRjaCAtPlxuXHRcdFx0XHRbc2NhbGUuZG9tYWluKCksIHNjYWxlLnJhbmdlKCkgLHZtLndpZHRoXVxuXHRcdFx0LCB1cGRhdGVcblx0XHRcdCwgdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cy50aW1lb3V0ID0gKGZ1biwgdGltZSktPlxuXHRcdGQzLnRpbWVyKCgpPT5cblx0XHRcdGZ1bigpXG5cdFx0XHR0cnVlXG5cdFx0LHRpbWUpXG5cblxuRnVuY3Rpb246OnByb3BlcnR5ID0gKHByb3AsIGRlc2MpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBAcHJvdG90eXBlLCBwcm9wLCBkZXNjIiwiZDMgPSByZXF1aXJlICdkMydcblMgPSByZXF1aXJlICcuLi9zZXJ2aWNlcy9zZXR0aW5ncydcbnJlcXVpcmUgJy4uL2hlbHBlcnMnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG5cbmNsYXNzIE1lbW9yeVxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAYXJyYXkgPSBbXVxuXHRyZW1lbWJlcjogKGMpLT5cblx0XHRAYXJyYXkucHVzaCBjXG5cdFx0aWYgQGFycmF5Lmxlbmd0aCA+IFMubWVtX2xlbmd0aCB0aGVuIEBhcnJheS5zaGlmdCgpXG5cdHZhbDogLT5cblx0XHRkMy5tZWFuIEBhcnJheVxuXG5jbGFzcyBNZW1vcmllc1xuXHRjb25zdHJ1Y3RvcjogKCktPlxuXHRcdEBtYXAgPSBkMy5tYXAoKVxuXG5cdHJlbWVtYmVyOiAoYXJyX3RpbWUsIGNvc3QpLT5cblx0XHRpZiBAbWFwLmhhcyBhcnJfdGltZVxuXHRcdFx0QG1hcC5nZXQgYXJyX3RpbWVcblx0XHRcdFx0LnJlbWVtYmVyIGNvc3Rcblx0XHRlbHNlXG5cdFx0XHRuZXdNZW0gPSBuZXcgTWVtb3J5XG5cdFx0XHRAbWFwLnNldCBhcnJfdGltZSAsIG5ld01lbVxuXHRcdFx0bmV3TWVtLnJlbWVtYmVyIGNvc3QgXG5cblx0bWluOiAtPlxuXHRcdGMgPSBJbmZpbml0eVxuXHRcdGNhbmRpZGF0ZXMgPSBbXVxuXHRcdEBtYXAuZm9yRWFjaCAodGltZSwgbWVtb3J5KS0+XG5cdFx0XHRjb3N0PSBtZW1vcnkudmFsKClcblx0XHRcdGlmIGNvc3QgPCBjXG5cdFx0XHRcdGMgPSBjb3N0XG5cdFx0XHRcdGNhbmRpZGF0ZXMgPSBbXVxuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2ggK3RpbWVcblx0XHRcdGVsc2UgaWYgY29zdCA9PSBjXG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCArdGltZVxuXHRcdF8uc2FtcGxlIGNhbmRpZGF0ZXNcblxuY2xhc3MgQ2FyIFxuXHRjb25zdHJ1Y3RvcjogKEBuLCBAdGFyX3RpbWUpLT5cblx0XHRAc2NoZWRfcGVuID0gSW5maW5pdHlcblx0XHRAY29zdCA9IEluZmluaXR5XG5cdFx0QHRyYXZlbF9wZW4gPSBJbmZpbml0eVxuXHRcdEBleGl0X3RpbWUgPSBJbmZpbml0eVxuXHRcdEBtZW1vcmllcyA9IG5ldyBNZW1vcmllc1xuXHRcdEBwYXRoID0gW11cblx0XHRAc2FtcGxlZCA9IGZhbHNlXG5cblx0dG9sbDogKHRpbWUpLT5cblx0XHRNYXRoLm1heCBTLm51bV9jYXJzIC8gUy5yYXRlICogKFMuYmV0YSAqIFMuZ2FtbWEpLyhTLmJldGEgKyBTLmdhbW1hKSAtIEBzY2hlZF9wZW4gLCAwXG5cblx0ZXhpdDoodGltZSktPiBcblx0XHRAZXhpdF90aW1lID0gdGltZVxuXHRcdEB0cmF2ZWxfcGVuID0gQGV4aXRfdGltZSAtIEBhY3R1YWxfdGltZVxuXHRcdHNjaGVkX2RlbCA9IEBleGl0X3RpbWUgLSBTLndpc2hfdGltZVxuXHRcdEBzY2hlZF9wZW4gPSBNYXRoLm1heCAtUy5iZXRhICogc2NoZWRfZGVsLCBTLmdhbW1hICogc2NoZWRfZGVsXG5cdFx0YyA9IGlmIFMudG9sbGluZyB0aGVuIEB0b2xsKHRpbWUpIGVsc2UgMFxuXHRcdEBjb3N0ID0gQHRyYXZlbF9wZW4gKyBAc2NoZWRfcGVuICsgY1xuXHRcdEBtZW1vcmllcy5yZW1lbWJlciBAYWN0dWFsX3RpbWUgLCBAY29zdFxuXG5cdGNob29zZTogLT5cblx0XHRAdGFyX3RpbWUgPSBAbWVtb3JpZXMubWluKClcblxuXHRndWVzc2VyOiAtPlxuXHRcdCMgZDMucmFuZG9tLm5vcm1hbCggMCwgUy52YXIpKClcblx0XHRfLnNhbXBsZSBbLVMudmFyLi5TLnZhcl1cblxuXHRhcnJpdmU6IC0+XG5cdFx0ZSA9IE1hdGgucm91bmQgQGd1ZXNzZXIoKVxuXHRcdGEgPSBAdGFyX3RpbWUgKyBlXG5cdFx0cmVzID0gTWF0aC5tYXggMSAsIE1hdGgubWluKCBhLCBTLm51bV9taW51dGVzIC0gMSlcblx0XHRAYWN0dWFsX3RpbWUgPSByZXNcblx0XHRyZXNcblxubW9kdWxlLmV4cG9ydHMgPSBDYXIiLCJTID0gcmVxdWlyZSgnLi4vc2VydmljZXMvc2V0dGluZ3MnKVxucmVxdWlyZSgnLi4vaGVscGVycy5jb2ZmZWUnKVxuZDMgPSByZXF1aXJlICdkMydcbnttYXh9ID0gTWF0aFxuXG5ibGFuayA9IFxuXHRyZWNlaXZlX3F1ZXVlOiAoKS0+IFxuXHRjdW1fYXJyaXZhbHM6IDBcblx0Y3VtX2V4aXRzOiAwXG5cbmNsYXNzIE1pbnV0ZSBcblx0Y29uc3RydWN0b3I6IChAdGltZSktPlxuXHRcdEByZXNldCgpXG5cdFx0QG5leHQgPSB1bmRlZmluZWRcblx0XHRAcHJldiA9IHVuZGVmaW5lZFxuXHRcdFxuXHRyZXNldDogLT5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBjdW1fYXJyaXZhbHMgPSAwXG5cdFx0QGN1bV9leGl0cyA9IDBcblx0XHRAYXJyaXZhbHMgPSAwXG5cdFx0QGV4aXRzID0gMFxuXHRcdEB0YXJnZXRlZCA9IDBcblx0XHRAcGFzdF90YXJnZXRzID0gW11cdFx0XG5cblx0QHByb3BlcnR5ICd2YXJpYW5jZScsIGdldDogLT4gZDMudmFyaWFuY2UgQHBhc3RfYXJyaXZhbHNcblx0QHByb3BlcnR5ICd0YXJnZXRfYXZnJywgZ2V0OiAtPiBkMy5tZWFuIEBwYXN0X3RhcmdldHNcblxuXHRzZXRfbmV4dDogKG0pLT4gXG5cdFx0QG5leHQgPSBtID8gYmxhbmtcblxuXHRzZXRfcHJldjogKG0pLT5cblx0XHRAcHJldiA9IG0gPyBibGFua1xuXG5cdHNlcnZlOiAtPlxuXHRcdEBnb2FsX2V4aXRzID0gTWF0aC5taW4oIE1hdGgubWF4KCBTLnJhdGUgKiAoQHRpbWUgLSBTLnQxICkgLCAwKSAsIFMubnVtX2NhcnMpXG5cdFx0aWYgQHRpbWUgPCBTLnR0aWxkZSBcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gUy5yYXRlIC8oMSAtUy5iZXRhKSooQHRpbWUgLSBTLnQxKVxuXHRcdGVsc2Vcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gKEB0aW1lIC0gUy50dGlsZGUpICogUy5yYXRlIC8gKDEgKyBTLmdhbW1hKSArIChTLnR0aWxkZSAtIFMudDEpKiBTLnJhdGUgLygxIC1TLmJldGEpXG5cdFx0QGdvYWxfYXJyaXZhbHMgPSBNYXRoLm1pbiBNYXRoLm1heChAZ29hbF9hcnJpdmFscyAsIDApLCBTLm51bV9jYXJzXG5cblx0XHRcblx0XHRAcXVldWVfbGVuZ3RoID0gQHF1ZXVlLmxlbmd0aFxuXHRcdHRyYXZlbF90aW1lID0gQHF1ZXVlX2xlbmd0aCAvIFMucmF0ZVxuXHRcdGV4aXRfdGltZSA9IEB0aW1lICsgdHJhdmVsX3RpbWVcblx0XHRkZWxheSA9IGV4aXRfdGltZSAtIFMud2lzaF90aW1lXG5cdFx0QHRyYXZlbF9jb3N0ID0gdHJhdmVsX3RpbWVcblx0XHRAc2NoZWRfZGVsYXkgPSBNYXRoLm1heCAtUy5iZXRhICogZGVsYXksIFMuZ2FtbWEgKiBkZWxheVxuXHRcdEBjb3N0ID0gdHJhdmVsX3RpbWUgKyBAc2NoZWRfZGVsYXlcblxuXHRcdFswLi4uTWF0aC5taW4oQHF1ZXVlX2xlbmd0aCwgUy5yYXRlKV1cblx0XHRcdC5mb3JFYWNoICgpPT5cblx0XHRcdFx0Y2FyID0gQHF1ZXVlLnBvcCgpXG5cdFx0XHRcdGNhci5leGl0IEB0aW1lXG5cdFx0XHRcdEBleGl0cysrXG5cblx0XHRAbmV4dC5yZWNlaXZlX3F1ZXVlIEBxdWV1ZVxuXHRcdEBjdW1fZXhpdHMgPUBwcmV2LmN1bV9leGl0cyArIEBleGl0c1xuXHRcdEBjdW1fYXJyaXZhbHMgPSBAcHJldi5jdW1fYXJyaXZhbHMgKyBAYXJyaXZhbHNcblxuXHRcdEBwYXN0X3RhcmdldHMucHVzaCBAdGFyZ2V0ZWRcblx0XHRpZiBAcGFzdF90YXJnZXRzLmxlbmd0aCA+IDQwIHRoZW4gQHBhc3RfdGFyZ2V0cy5zaGlmdCgpXG5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBhcnJpdmFscyA9IDBcblx0XHRAZXhpdHMgPSAwXG5cdFx0QHRhcmdldGVkID0gMFxuXG5cdHJlY2VpdmVfY2FyOiAoY2FyKS0+IFxuXHRcdEBxdWV1ZS5wdXNoKGNhcilcblx0XHRAYXJyaXZhbHMrK1xuXG5cdHJlY2VpdmVfcXVldWU6IChxdWV1ZSktPiBAcXVldWUgPSBAcXVldWUuY29uY2F0IHF1ZXVlXG5cbm1vZHVsZS5leHBvcnRzID0gTWludXRlIiwiYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuY2xhc3MgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpIC0+XG5cdFx0QHdpZHRoID0gNDUwXG5cdFx0QGhlaWdodCA9IDIwMFxuXHRcdEBWZXIgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdFx0LmRvbWFpbiBbMCw4XVxuXHRcdFx0LnJhbmdlIFtAaGVpZ2h0LCAwXVxuXG5cdFx0QEhvciA9IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0XHQuZG9tYWluIFswLDhdXG5cdFx0XHQucmFuZ2UgWzAsIEB3aWR0aF1cblxuXHRcdEBob3JBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBASG9yXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2JvdHRvbSdcblxuXHRcdEB2ZXJBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBAVmVyXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2xlZnQnXG5cblx0XHRAbWFyID0gXG5cdFx0XHRsZWZ0OiAzMFxuXHRcdFx0dG9wOiAxMFxuXHRcdFx0cmlnaHQ6IDEwXG5cdFx0XHRib3R0b206IDI1XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdEN0cmwiLCJTZXR0aW5ncyA9IHJlcXVpcmUgJy4vc2V0dGluZ3MnXG5NaW51dGUgPSByZXF1aXJlICcuLi9tb2RlbHMvbWludXRlJ1xuQ2FyID0gcmVxdWlyZSAnLi4vbW9kZWxzL2Nhcidcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbmNsYXNzIERhdGFcblx0Y29uc3RydWN0b3I6ICgpLT5cblx0XHRAbWludXRlcyA9IFswLi4uU2V0dGluZ3MubnVtX21pbnV0ZXNdLm1hcCAodGltZSk9PiBcblx0XHRcdFx0bmV3TWludXRlID0gbmV3IE1pbnV0ZSB0aW1lXG5cblx0XHRAbWludXRlcy5mb3JFYWNoIChtaW4saSxrKS0+XG5cdFx0XHRtaW4uc2V0X3ByZXYga1tpLTFdXG5cdFx0XHRtaW4uc2V0X25leHQga1tpKzFdXG5cblx0XHRAcmVzZXQoKVxuXG5cdFx0QHN0YXJ0X3RpbWVzID0gW11cblxuXHRcdEByZWNvcmQgPSAtPlxuXHRcdFx0XHRzID0gXy5maW5kIEBtaW51dGVzICwgKGQpPT5cblx0XHRcdFx0XHRkLnF1ZXVlLmxlbmd0aCA+IFNldHRpbmdzLnJhdGVcblx0XHRcdFx0QHN0YXJ0X3RpbWVzLnB1c2ggcy50aW1lXG5cdFx0XHRcdGlmIEBzdGFydF90aW1lcy5sZW5ndGggPiAxMDAwMCB0aGVuIEBzdGFydF90aW1lcy5zaGlmdCgpXG5cblx0cmVzZXQ6IC0+XG5cdFx0Y2FuZHMgPSBbMTAuLjEwMF1cblx0XHRAbWludXRlcy5mb3JFYWNoIChtKS0+XG5cdFx0XHRtLnJlc2V0KClcblx0XHRAY2FycyA9IFswLi4uU2V0dGluZ3MubnVtX2NhcnNdLm1hcCAobiktPlxuXHRcdFx0XHR0YXJfdGltZSA9IF8uc2FtcGxlIGNhbmRzXG5cdFx0XHRcdG5ld0NhciA9IG5ldyBDYXIgbiwgdGFyX3RpbWVcblxuXHRcdEBjYXJzLmZvckVhY2ggKGNhcixpLGspID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cblx0Y2Fyc19jaG9vc2U6IC0+XG5cdFx0Xy5zYW1wbGUgQGNhcnMsIFNldHRpbmdzLnNhbXBsZV9zaXplXG5cdFx0XHQuZm9yRWFjaCAoY2FyKS0+XG5cdFx0XHRcdGNhci5jaG9vc2UoKVxuXG5cdGNhcnNfYXJyaXZlOiAtPlxuXHRcdEBjYXJzLmZvckVhY2ggKGNhcikgPT4gXG5cdFx0XHR0aW1lID0gY2FyLmFycml2ZSgpXG5cdFx0XHRpZiB0aW1lIGlzIHVuZGVmaW5lZCB0aGVuIGRlYnVnZ2VyXG5cdFx0XHRAbWludXRlc1t0aW1lXS5yZWNlaXZlX2NhciBjYXJcblx0XHRcdEBtaW51dGVzW2Nhci50YXJfdGltZV0udGFyZ2V0ZWQrK1xuXG5cdHRpY2s6IC0+XG5cdFx0IyBwaHlzaWNzIHN0YWdlXG5cdFx0QG1pbnV0ZXMuZm9yRWFjaCAobWludXRlKS0+IG1pbnV0ZS5zZXJ2ZSgpXG5cdFx0IyBjaG9pY2Ugc3RhZ2Vcblx0XHRAY2Fyc19hcnJpdmUoKVxuXHRcdEBjYXJzX2Nob29zZSgpXG5cdFx0QHJlY29yZCgpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGF0YSgpXG4iLCJyZXF1aXJlICcuLi9oZWxwZXJzJ1xuY2xhc3MgU1xuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAbnVtX2NhcnMgPSAxMDAwXG5cdFx0QHdpc2hfdGltZSA9IDEyMFxuXHRcdEBudW1fbWludXRlcz0gMTcwXG5cdFx0QHJhdGUgPSAxMFxuXHRcdEBiZXRhID0gLjVcblx0XHRAZ2FtbWEgPSAyXG5cdFx0QHZhciA9IDJcblx0XHRAc2FtcGxlX3NpemUgPSAyMDBcblx0XHRAaW50ZXJ2YWwgPSAyNVxuXHRcdEBtZW1fbGVuZ3RoID0gMlxuXHRcdEB0b2xsaW5nID0gZmFsc2Vcblx0QHByb3BlcnR5ICd0MScsIGdldDogLT5cblx0XHRAd2lzaF90aW1lIC0gQG51bV9jYXJzIC8gQHJhdGUgKiBAZ2FtbWEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cdEBwcm9wZXJ0eSAndDInLCBnZXQ6IC0+XG5cdFx0QHdpc2hfdGltZSArIEBudW1fY2FycyAvIEByYXRlICogQGJldGEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cdEBwcm9wZXJ0eSAndHRpbGRlJywgZ2V0Oi0+XG5cdFx0QHdpc2hfdGltZSAtIEBudW1fY2FycyAvIEByYXRlICogQGdhbW1hICogQGJldGEgLyAoQGJldGEgKyBAZ2FtbWEpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUyAiXX0=
