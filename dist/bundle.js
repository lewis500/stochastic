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

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.arr_line(vm.minutes)}' />\n			<path class='arr-line goal' ng-attr-d='{{vm.goal_arrs(vm.minutes)}}' />\n			<path class='exit-line' d3-der='{d: vm.exit_line(vm.minutes)}' />\n			<path class='exit-line goal' ng-attr-d='{{vm.goal_exits(vm.minutes)}}' />\n			<line d3-der='{x1: vm.Hor(vm.S.wish_time), x2: vm.Hor(vm.S.wish_time), y1: vm.Ver(0), y2: 0}' class='wish_time' />\n		</g>\n		<g class='g-lines2'>\n			<path ng-repeat ='p in vm.shad.array track by $index' ng-attr-d='{{p}}' class='arr-line' ng-attr-opacity='{{::.8 - .07 * $index}}'/>\n		</g>\n	</g>\n</svg>";

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

template = '<div flex=\'50\'>\n	<md-button ng-click=\'vm.play()\'>Play</md-button>\n	<md-button ng-click=\'vm.stop()\'>Stop</md-button>\n	<md-checkbox ng-model=\'vm.S.tolling\'>Toggle Toll</md-checkbox>\n	<div layout>\n	    <div flex="30" layout layout-align="center center">\n	       <span class="md-body-1">Memory length</span>\n	    </div>\n	    <md-slider flex ng-model="vm.S.mem_length" min=\'1\' max=\'10\' md-discrete step=\'1\' />\n   </div>\n   	<div layout>\n   	    <div flex="30" layout layout-align="center center">\n   	       <span class="md-body-1">Error</span>\n   	    </div>\n   	    <md-slider flex ng-model="vm.S.var" min=\'1\' max=\'5\' md-discrete step=\'.5\' />\n    </div>\n</div>\n<div flex=\'45\'>\n    	<div layout>\n    	    <div flex="30" layout layout-align="center center">\n    	       <span class="md-body-1">Sample Size</span>\n    	    </div>\n    	    <md-slider flex ng-model="vm.S.sample_size" min=\'10\' max=\'300\' md-discrete step=\'10\' />\n     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Beta</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.beta" min=\'.1\' max=\'.9\' md-discrete step=\'.05\' />\n 	     </div>\n     	<div layout>\n 	    	    <div flex="30" layout layout-align="center center">\n 	    	       <span class="md-body-1">Gamma</span>\n 	    	    </div>\n 	    	    <md-slider flex ng-model="vm.S.gamma" min=\'1.5\' max=\'3\' md-discrete step=\'.05\' />\n 	     </div>\n</div>';

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
    this.last_tar = this.tar_time;
    return this.tar_time = this.memories.min();
  };

  Car.prototype.guesser = function() {
    return d3.random.normal(0, S["var"])();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvYXBwLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL2NoYXJ0cy9hcnJDaGFydC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY29zdC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jaGFydHMvY3VtQ2hhcnQuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL21haW4uY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhcnRzL3N0YXJ0LmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2JlaGF2aW9yLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2QzRGVyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL2RhdHVtLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL3NoaWZ0ZXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveEF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2RpcmVjdGl2ZXMveUF4aXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2hlbHBlcnMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9jYXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9taW51dGUuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL21vZGVscy9wbG90Q3RybC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvZGF0YS5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvc2VydmljZXMvc2V0dGluZ3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBQSxDQUFBO0FBQUEsSUFBQSxnQkFBQTs7QUFBQSxPQUNBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FEVixDQUFBOztBQUFBLEVBRUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsR0FHQSxHQUFNLE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBZixFQUEwQixDQUFDLE9BQUEsQ0FBUSxrQkFBUixDQUFELENBQTFCLENBRUwsQ0FBQyxTQUZJLENBRU0sVUFGTixFQUVrQixPQUFBLENBQVEsOEJBQVIsQ0FGbEIsQ0FHTCxDQUFDLFNBSEksQ0FHTSxVQUhOLEVBR2tCLE9BQUEsQ0FBUSw4QkFBUixDQUhsQixDQUlMLENBQUMsU0FKSSxDQUlNLFNBSk4sRUFJaUIsT0FBQSxDQUFRLDBCQUFSLENBSmpCLENBS0wsQ0FBQyxTQUxJLENBS00sVUFMTixFQUtrQixPQUFBLENBQVEsMkJBQVIsQ0FMbEIsQ0FNTCxDQUFDLFNBTkksQ0FNTSxTQU5OLEVBTWlCLE9BQUEsQ0FBUSwwQkFBUixDQU5qQixDQVFMLENBQUMsU0FSSSxDQVFNLFNBUk4sRUFRa0IsT0FBQSxDQUFRLHNCQUFSLENBUmxCLENBU0wsQ0FBQyxTQVRJLENBU00sWUFUTixFQVNv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QURyQjtJQUFBLENBQUw7R0FBaEIsQ0FkQSxDQUFBOztBQUFBLEVBZ0JBLENBQUMsQ0FBQSxRQUFELENBQVUsUUFBVixFQUFvQjtBQUFBLElBQUEsR0FBQSxFQUFJLFNBQUEsR0FBQTthQUN2QixJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLElBQWIsR0FBb0IsSUFBQyxDQUFBLEtBQXJCLEdBQTZCLElBQUMsQ0FBQSxJQUE5QixHQUFxQyxDQUFDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLEtBQVYsRUFEM0I7SUFBQSxDQUFKO0dBQXBCLENBaEJBLENBQUE7O1dBQUE7O0lBRkQsQ0FBQTs7QUFBQSxNQXNCTSxDQUFDLE9BQVAsR0FBaUIsR0FBQSxDQUFBLENBdEJqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuYXBwID0gYW5ndWxhci5tb2R1bGUgJ21haW5BcHAnLCBbcmVxdWlyZSAnYW5ndWxhci1tYXRlcmlhbCddXG5cdCMgY2hhcnRzXG5cdC5kaXJlY3RpdmUgJ2N1bUNoYXJ0JywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYXJ0cy9jdW1DaGFydCdcblx0LmRpcmVjdGl2ZSAnYXJyQ2hhcnQnLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL2FyckNoYXJ0J1xuXHQuZGlyZWN0aXZlICdtYWluRGVyJywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYXJ0cy9tYWluJ1xuXHQuZGlyZWN0aXZlICdzdGFydERlcicsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jaGFydHMvc3RhcnQnXG5cdC5kaXJlY3RpdmUgJ2Nvc3REZXInLCByZXF1aXJlICcuL2NvbXBvbmVudHMvY2hhcnRzL2Nvc3QnXG5cdCMgZGlyZWN0aXZlc1xuXHQuZGlyZWN0aXZlICdzaGlmdGVyJyAsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9zaGlmdGVyJ1xuXHQuZGlyZWN0aXZlICdob3JBeGlzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3hBeGlzJ1xuXHQuZGlyZWN0aXZlICd2ZXJBeGlzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3lBeGlzJ1xuXHQuZGlyZWN0aXZlICdzaGlmdGVyJyAsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9zaGlmdGVyJ1xuXHQuZGlyZWN0aXZlICdiZWhhdmlvcicsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9iZWhhdmlvcidcblx0LmRpcmVjdGl2ZSAnZGF0dW0nLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMvZGF0dW0nXG5cdC5kaXJlY3RpdmUgJ2QzRGVyJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL2QzRGVyJ1xuXHQjIC5kaXJlY3RpdmUgJ2NoYW5nZUNoYXJ0JywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlQ2hhcnQnXG5cdCMgLmRpcmVjdGl2ZSAnY2hhbmdlRGVyJywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlczInIiwiZDMgPSByZXF1aXJlKCdkMycpXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcblxudGVtcGxhdGUgPSBcIlwiXCJcblx0PHN2ZyBuZy1hdHRyLXdpZHRoPSd7ezo6dm0ud2lkdGggKyB2bS5tYXIubGVmdCt2bS5tYXIucmlnaHR9fScgbmctYXR0ci1oZWlnaHQ9J3t7Ojp2bS5oZWlnaHQgKyB2bS5tYXIudG9wICsgdm0ubWFyLmJvdHRvbX19Jz5cblx0XHQ8ZyBjbGFzcz0nZy1tYWluJyBzaGlmdGVyPSd7ezo6W3ZtLm1hci5sZWZ0LCB2bS5tYXIudG9wXX19Jz5cblx0XHRcdDxyZWN0IGQzLWRlcj0ne3dpZHRoOiB2bS53aWR0aCwgaGVpZ2h0OiB2bS5oZWlnaHR9JyBjbGFzcz0nYmFja2dyb3VuZCcgLz5cblx0XHRcdDxnIHZlci1heGlzLWRlciB3aWR0aD0ndm0ud2lkdGgnIGZ1bj0ndm0udmVyQXhGdW4nID48L2c+XG5cdFx0XHQ8ZyBob3ItYXhpcy1kZXIgZnVuPSd2bS5ob3JBeEZ1bicgaGVpZ2h0PSd2bS5oZWlnaHQnIHNoaWZ0ZXI9J3t7OjpbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzJz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lJyAgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bih2bS5taW51dGVzKX0nIC8+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdleGl0LWxpbmUnIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4yKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPlxuXCJcIlwiXG5jbGFzcyBhcnJDdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCA0MF1cblx0XHRASG9yLmRvbWFpbiBbMCwgU2V0dGluZ3MubnVtX21pbnV0ZXNdXG5cdFx0IyBAbGluZUZ1biA9IGQzLnN2Zy5saW5lKClcblx0XHQjIFx0LnkgKGQpPT4gQFZlciBkLmFycml2YWxzXG5cdFx0IyBcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0QGxpbmVGdW4yID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLnRhcmdldF9hdmdcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5kZXIgPSAoKS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgYXJyQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJkMyA9IHJlcXVpcmUoJ2QzJylcblNldHRpbmdzID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvc2V0dGluZ3MnXG5QbG90Q3RybCA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9wbG90Q3RybCdcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xuXG50ZW1wbGF0ZSA9IFwiXCJcIlxuXHQ8c3ZnIG5nLWF0dHItd2lkdGg9J3t7Ojp2bS53aWR0aCArIHZtLm1hci5sZWZ0K3ZtLm1hci5yaWdodH19JyBuZy1hdHRyLWhlaWdodD0ne3s6OnZtLmhlaWdodCArIHZtLm1hci50b3AgKyB2bS5tYXIuYm90dG9tfX0nPlxuXHRcdDxnIGNsYXNzPSdnLW1haW4nIHNoaWZ0ZXI9J3t7Ojpbdm0ubWFyLmxlZnQsIHZtLm1hci50b3BdfX0nPlxuXHRcdFx0PHJlY3QgZDMtZGVyPSd7d2lkdGg6IHZtLndpZHRoLCBoZWlnaHQ6IHZtLmhlaWdodH0nIGNsYXNzPSdiYWNrZ3JvdW5kJyAvPlxuXHRcdFx0PGcgdmVyLWF4aXMtZGVyIHdpZHRoPSd2bS53aWR0aCcgZnVuPSd2bS52ZXJBeEZ1bicgPjwvZz5cblx0XHRcdDxnIGhvci1heGlzLWRlciBmdW49J3ZtLmhvckF4RnVuJyBoZWlnaHQ9J3ZtLmhlaWdodCcgc2hpZnRlcj0ne3s6OlswLHZtLmhlaWdodF19fSc+PC9nPlxuXHRcdFx0PGcgY2xhc3M9J2ctbGluZXMnPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZnVuIHRvdGFsX2Nvc3QnICBkMy1kZXI9J3tkOiB2bS5saW5lRnVuKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Z1biB0cmF2ZWxfY29zdCcgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4yKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Z1biBzY2hlZHVsZV9kZWxheScgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4zKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdDwvZz5cblx0XHQ8L2c+XG5cdDwvc3ZnPlxuXCJcIlwiXG5jbGFzcyBhcnJDdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCAxMDBdXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXG5cdFx0QGxpbmVGdW4gPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY29zdFxuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRAbGluZUZ1bjIgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQudHJhdmVsX2Nvc3Rcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0QGxpbmVGdW4zID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLnNjaGVkX2RlbGF5XG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBhcnJDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdhcnItbGluZScgIGQzLWRlcj0ne2Q6IHZtLmFycl9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lIGdvYWwnIG5nLWF0dHItZD0ne3t2bS5nb2FsX2FycnModm0ubWludXRlcyl9fScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZScgZDMtZGVyPSd7ZDogdm0uZXhpdF9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZSBnb2FsJyBuZy1hdHRyLWQ9J3t7dm0uZ29hbF9leGl0cyh2bS5taW51dGVzKX19JyAvPlxuXHRcdFx0XHQ8bGluZSBkMy1kZXI9J3t4MTogdm0uSG9yKHZtLlMud2lzaF90aW1lKSwgeDI6IHZtLkhvcih2bS5TLndpc2hfdGltZSksIHkxOiB2bS5WZXIoMCksIHkyOiAwfScgY2xhc3M9J3dpc2hfdGltZScgLz5cblx0XHRcdDwvZz5cblx0XHRcdDxnIGNsYXNzPSdnLWxpbmVzMic+XG5cdFx0XHRcdDxwYXRoIG5nLXJlcGVhdCA9J3AgaW4gdm0uc2hhZC5hcnJheSB0cmFjayBieSAkaW5kZXgnIG5nLWF0dHItZD0ne3twfX0nIGNsYXNzPSdhcnItbGluZScgbmctYXR0ci1vcGFjaXR5PSd7ezo6LjggLSAuMDcgKiAkaW5kZXh9fScvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgU2hhZG93c1xuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAYXJyYXkgPSBbXVxuXHRcdEBjb3VudGVyID0gMFxuXHRhZGQ6IChwYXRoKS0+XG5cdFx0QGNvdW50ZXIrK1xuXHRcdGlmIEBjb3VudGVyJTIwICE9MCB0aGVuIHJldHVyblxuXHRcdEBhcnJheS51bnNoaWZ0ICdNJyArIHBhdGhcblx0XHRpZiBAYXJyYXkubGVuZ3RoID4gMTAgdGhlbiBAYXJyYXkucG9wKClcblxuXG5jbGFzcyBjdW1DdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpLT5cblx0XHRzdXBlciBAc2NvcGVcblx0XHRAbWludXRlcyA9IERhdGEubWludXRlc1xuXHRcdEBWZXIuZG9tYWluIFswLCBTZXR0aW5ncy5udW1fY2Fyc10gXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXHRcdEBTID0gU2V0dGluZ3NcblxuXHRcdEBzaGFkID0gbmV3IFNoYWRvd3NcblxuXHRcdEBhcnJfbGluZSA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC5pbnRlcnBvbGF0ZSAocG9pbnRzKT0+XG5cdFx0XHRcdHBhdGggPSBwb2ludHMuam9pbiAnTCdcblx0XHRcdFx0QHNoYWQuYWRkIHBhdGhcblx0XHRcdFx0cGF0aFxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmN1bV9hcnJpdmFsc1xuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWUgXG5cblx0XHRAZXhpdF9saW5lID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmN1bV9leGl0c1xuXHRcdFx0LnggKGQpPT4gQEhvciBkLnRpbWVcblx0XHRcblx0XHRAZ29hbF9leGl0cyA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC5nb2FsX2V4aXRzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXG5cdFx0QGdvYWxfYXJycyA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC5nb2FsX2Fycml2YWxzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdFx0XG5cdFx0XHRcbmRlciA9IC0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgY3VtQ3RybF1cblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR0ZW1wbGF0ZU5hbWVzcGFjZTogJ3N2Zydcblx0XHR0ZW1wbGF0ZTogdGVtcGxhdGVcblx0XHRzY29wZToge31cblxubW9kdWxlLmV4cG9ydHMgPSBkZXJcblxuIiwiJ3VzZSBzdHJpY3QnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuZDMgPSByZXF1aXJlICdkMydcbkRhdGEgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9kYXRhJ1xudGltZW91dCA9IHJlcXVpcmUoICcuLi8uLi9oZWxwZXJzJykudGltZW91dFxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcbnRlbXBsYXRlID0gJycnXG5cdDxkaXYgZmxleD0nNTAnPlxuXHRcdDxtZC1idXR0b24gbmctY2xpY2s9J3ZtLnBsYXkoKSc+UGxheTwvbWQtYnV0dG9uPlxuXHRcdDxtZC1idXR0b24gbmctY2xpY2s9J3ZtLnN0b3AoKSc+U3RvcDwvbWQtYnV0dG9uPlxuXHRcdDxtZC1jaGVja2JveCBuZy1tb2RlbD0ndm0uUy50b2xsaW5nJz5Ub2dnbGUgVG9sbDwvbWQtY2hlY2tib3g+XG5cdFx0PGRpdiBsYXlvdXQ+XG5cdFx0ICAgIDxkaXYgZmxleD1cIjMwXCIgbGF5b3V0IGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cblx0XHQgICAgICAgPHNwYW4gY2xhc3M9XCJtZC1ib2R5LTFcIj5NZW1vcnkgbGVuZ3RoPC9zcGFuPlxuXHRcdCAgICA8L2Rpdj5cblx0XHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy5tZW1fbGVuZ3RoXCIgbWluPScxJyBtYXg9JzEwJyBtZC1kaXNjcmV0ZSBzdGVwPScxJyAvPlxuXHQgICA8L2Rpdj5cblx0ICAgXHQ8ZGl2IGxheW91dD5cblx0ICAgXHQgICAgPGRpdiBmbGV4PVwiMzBcIiBsYXlvdXQgbGF5b3V0LWFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuXHQgICBcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPkVycm9yPC9zcGFuPlxuXHQgICBcdCAgICA8L2Rpdj5cblx0ICAgXHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy52YXJcIiBtaW49JzEnIG1heD0nNScgbWQtZGlzY3JldGUgc3RlcD0nLjUnIC8+XG5cdCAgICA8L2Rpdj5cblx0PC9kaXY+XG5cdDxkaXYgZmxleD0nNDUnPlxuICAgIFx0PGRpdiBsYXlvdXQ+XG5cdCAgICBcdCAgICA8ZGl2IGZsZXg9XCIzMFwiIGxheW91dCBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG5cdCAgICBcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPlNhbXBsZSBTaXplPC9zcGFuPlxuXHQgICAgXHQgICAgPC9kaXY+XG5cdCAgICBcdCAgICA8bWQtc2xpZGVyIGZsZXggbmctbW9kZWw9XCJ2bS5TLnNhbXBsZV9zaXplXCIgbWluPScxMCcgbWF4PSczMDAnIG1kLWRpc2NyZXRlIHN0ZXA9JzEwJyAvPlxuXHQgICAgIDwvZGl2PlxuICAgICBcdDxkaXYgbGF5b3V0PlxuIFx0ICAgIFx0ICAgIDxkaXYgZmxleD1cIjMwXCIgbGF5b3V0IGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiBcdCAgICBcdCAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWJvZHktMVwiPkJldGE8L3NwYW4+XG4gXHQgICAgXHQgICAgPC9kaXY+XG4gXHQgICAgXHQgICAgPG1kLXNsaWRlciBmbGV4IG5nLW1vZGVsPVwidm0uUy5iZXRhXCIgbWluPScuMScgbWF4PScuOScgbWQtZGlzY3JldGUgc3RlcD0nLjA1JyAvPlxuIFx0ICAgICA8L2Rpdj5cbiAgICAgXHQ8ZGl2IGxheW91dD5cbiBcdCAgICBcdCAgICA8ZGl2IGZsZXg9XCIzMFwiIGxheW91dCBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gXHQgICAgXHQgICAgICAgPHNwYW4gY2xhc3M9XCJtZC1ib2R5LTFcIj5HYW1tYTwvc3Bhbj5cbiBcdCAgICBcdCAgICA8L2Rpdj5cbiBcdCAgICBcdCAgICA8bWQtc2xpZGVyIGZsZXggbmctbW9kZWw9XCJ2bS5TLmdhbW1hXCIgbWluPScxLjUnIG1heD0nMycgbWQtZGlzY3JldGUgc3RlcD0nLjA1JyAvPlxuIFx0ICAgICA8L2Rpdj5cblx0PC9kaXY+XG4nJydcblxuY2xhc3MgQ3RybFxuXHRjb25zdHJ1Y3RvcjogKEBzY29wZSktPlxuXHRcdEBwYXVzZWQgPSBmYWxzZVxuXHRcdEBEYXRhID0gRGF0YVxuXHRcdEBTID0gU2V0dGluZ3NcblxuXHRsb29wZXI6IC0+XG5cdFx0dGltZW91dCA9PlxuXHRcdFx0RGF0YS50aWNrKClcblx0XHRcdEBzY29wZS4kZXZhbEFzeW5jKClcblx0XHRcdGlmIG5vdCBAcGF1c2VkIHRoZW4gQGxvb3BlcigpXG5cdFx0XHRAcGF1c2VkXG5cdFx0LCBTZXR0aW5ncy5pbnRlcnZhbFxuXG5cdHBsYXk6IC0+XG5cdFx0QHBhdXNlZCA9IGZhbHNlXG5cdFx0ZDMudGltZXIuZmx1c2goKVxuXHRcdEBsb29wZXIoKVxuXG5cdHN0b3A6IC0+IEBwYXVzZWQgPSB0cnVlXG5cbmRlciA9IC0+XG5cdGRpcmVjdGl2ZSA9XG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXHRcdHJlc3RyaWN0OiAnQSdcblxubW9kdWxlLmV4cG9ydHMgPSBkZXJcbiIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdhcnItbGluZScgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4odm0uRGF0YS5zdGFydF90aW1lcyl9JyAvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0XHQ8ZyBjbGFzcz0ndG9vbHRpcCcgbmctYXR0ci10cmFuc2Zvcm09J3RyYW5zbGF0ZSh7e3ZtLmxlZnR9fSx7e3ZtLnRvcH19KSc+XG5cdFx0XHQ8dGV4dD57e3ZtLmhlbGxvIHwgbnVtYmVyOiAwfX08L3RleHQ+XG5cdFx0PC9nPlxuXHQ8L3N2Zz5cblwiXCJcIlxuXG5jbGFzcyBDdHJsIGV4dGVuZHMgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUsIGVsKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QFZlci5kb21haW4gWzAsIDYwXSBcblx0XHRASG9yLmRvbWFpbiBbMCwgNTAwMF1cblx0XHRAaGVsbG8gPSA1MFxuXHRcdEBsZWZ0ID0gMFxuXHRcdEB0b3AgPSAwXG5cblx0XHRARGF0YSA9IERhdGFcblxuXHRcdEBsaW5lRnVuID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LmRlZmluZWQgKGQsaSktPlxuXHRcdFx0XHQoISFkKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkXG5cdFx0XHQueCAoZCxpKT0+IEBIb3IgaVxuXG5cdFx0em9vbSA9IGQzLmJlaGF2aW9yLnpvb20oKVxuXHRcdCAgICAueCBASG9yXG5cdFx0ICAgIC55IEBWZXJcblx0XHQgICAgLnNjYWxlRXh0ZW50IFsxLCAxNV1cblxuXHRcdGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0LnNlbGVjdCAnLmctbWFpbidcblx0XHRcdC5jYWxsIHpvb21cblx0XHR2bSA9IHRoaXNcblxuXHRcdGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0LnNlbGVjdCAnLmctbWFpbidcblx0XHRcdC5vbiAnbW91c2Vtb3ZlJywgLT5cblx0XHRcdFx0bG9jID0gZDMubW91c2UgdGhpc1xuXHRcdFx0XHR2bS5sZWZ0ID0gbG9jWzBdXG5cdFx0XHRcdHZtLnRvcCA9IGxvY1sxXVxuXHRcdFx0XHR2bS5oZWxsbyA9IHZtLkhvci5pbnZlcnQgdm0ubGVmdFxuXHRcdFx0XHR2bS5zY29wZS4kZXZhbEFzeW5jKClcblx0XHRcdFxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCAnJGVsZW1lbnQnLCBDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlclxuXG4iLCJkcmFnID0gKCRwYXJzZSktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRsaW5rOiAoc2NvcGUsZWwsYXR0ciktPlxuXHRcdFx0c2VsID0gZDMuc2VsZWN0KGVsWzBdKVxuXHRcdFx0c2VsLmNhbGwoJHBhcnNlKGF0dHIuYmVoYXZpb3IpKHNjb3BlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBkcmFnIiwiZDMgPSByZXF1aXJlICdkMydcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuXG5kZXIgPSAoJHBhcnNlKS0+ICNnb2VzIG9uIGEgc3ZnIGVsZW1lbnRcblx0ZGlyZWN0aXZlID0gXG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdHNjb3BlOiBcblx0XHRcdGQzRGVyOiAnPSdcblx0XHRcdHRyYW46ICc9J1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIpLT5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0dSA9ICd0LScgKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHRzY29wZS4kd2F0Y2ggJ2QzRGVyJ1xuXHRcdFx0XHQsICh2KS0+XG5cdFx0XHRcdFx0aWYgc2NvcGUudHJhblxuXHRcdFx0XHRcdFx0c2VsLnRyYW5zaXRpb24gdVxuXHRcdFx0XHRcdFx0XHQuYXR0ciB2XG5cdFx0XHRcdFx0XHRcdC5jYWxsIHNjb3BlLnRyYW5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRzZWwuYXR0ciB2XG5cblx0XHRcdFx0LCB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsIm1vZHVsZS5leHBvcnRzID0gKCRwYXJzZSktPlxuXHQoc2NvcGUsIGVsLCBhdHRyKS0+XG5cdFx0ZDMuc2VsZWN0KGVsWzBdKS5kYXR1bSAkcGFyc2UoYXR0ci5kYXR1bSkoc2NvcGUpIiwiZDMgPSByZXF1aXJlICdkMydcblxuZGVyID0gKCRwYXJzZSktPlxuXHRkaXJlY3RpdmUgPVxuXHRcdHJlc3RyaWN0OiAnQSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyKS0+XG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QgZWxbMF1cblx0XHRcdHUgPSAndC0nICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0dHJhbiA9ICRwYXJzZShhdHRyLnRyYW4pKHNjb3BlKVxuXHRcdFx0cmVzaGlmdCA9ICh2KS0+IFxuXHRcdFx0XHRpZiB0cmFuXG5cdFx0XHRcdFx0c2VsLnRyYW5zaXRpb24gdVxuXHRcdFx0XHRcdFx0LmF0dHIgJ3RyYW5zZm9ybScgLCBcInRyYW5zbGF0ZSgje3ZbMF19LCN7dlsxXX0pXCJcblx0XHRcdFx0XHRcdC5jYWxsIHRyYW5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHNlbC5hdHRyICd0cmFuc2Zvcm0nICwgXCJ0cmFuc2xhdGUoI3t2WzBdfSwje3ZbMV19KVwiXG5cblx0XHRcdFx0ZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHRcdFx0XG5cblx0XHRcdHNjb3BlLiR3YXRjaCAtPlxuXHRcdFx0XHRcdCRwYXJzZShhdHRyLnNoaWZ0ZXIpKHNjb3BlKVxuXHRcdFx0XHQsIHJlc2hpZnRcblx0XHRcdFx0LCB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiZDMgPSByZXF1aXJlICdkMydcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuXG5kZXIgPSAoJHdpbmRvdyktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBhbmd1bGFyLm5vb3Bcblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHRiaW5kVG9Db250cm9sbGVyOiB0cnVlXG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHNjb3BlOiBcblx0XHRcdGhlaWdodDogJz0nXG5cdFx0XHRmdW46ICc9J1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIsIHZtKS0+XG5cdFx0XHRzY2FsZSA9IHZtLmZ1bi5zY2FsZSgpXG5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0XHQuY2xhc3NlZCAneCBheGlzJywgdHJ1ZVxuXG5cdFx0XHR1cGRhdGUgPSA9PlxuXHRcdFx0XHR2bS5mdW4udGlja1NpemUgLXZtLmhlaWdodFxuXHRcdFx0XHRzZWwuY2FsbCB2bS5mdW5cblx0XHRcdFx0XG5cdFx0XHRzY29wZS4kd2F0Y2ggLT5cblx0XHRcdFx0W3NjYWxlLmRvbWFpbigpLCBzY2FsZS5yYW5nZSgpICx2bS5oZWlnaHRdXG5cdFx0XHQsIHVwZGF0ZVxuXHRcdFx0LCB0cnVlXG5cblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5cbmRlciA9ICgkd2luZG93KS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IGFuZ3VsYXIubm9vcFxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcblx0XHRyZXN0cmljdDogJ0EnXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0c2NvcGU6IFxuXHRcdFx0d2lkdGg6ICc9J1xuXHRcdFx0ZnVuOiAnPSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyLCB2bSktPlxuXHRcdFx0c2NhbGUgPSB2bS5mdW4uc2NhbGUoKVxuXG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QoZWxbMF0pLmNsYXNzZWQgJ3kgYXhpcycsIHRydWVcblxuXHRcdFx0dXBkYXRlID0gPT5cblx0XHRcdFx0dm0uZnVuLnRpY2tTaXplKCAtdm0ud2lkdGgpXG5cdFx0XHRcdHNlbC5jYWxsIHZtLmZ1blxuXG5cdFx0XHRzY29wZS4kd2F0Y2ggLT5cblx0XHRcdFx0W3NjYWxlLmRvbWFpbigpLCBzY2FsZS5yYW5nZSgpICx2bS53aWR0aF1cblx0XHRcdCwgdXBkYXRlXG5cdFx0XHQsIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMudGltZW91dCA9IChmdW4sIHRpbWUpLT5cblx0XHRkMy50aW1lcigoKT0+XG5cdFx0XHRmdW4oKVxuXHRcdFx0dHJ1ZVxuXHRcdCx0aW1lKVxuXG5cbkZ1bmN0aW9uOjpwcm9wZXJ0eSA9IChwcm9wLCBkZXNjKSAtPlxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgQHByb3RvdHlwZSwgcHJvcCwgZGVzYyIsImQzID0gcmVxdWlyZSAnZDMnXG5TID0gcmVxdWlyZSAnLi4vc2VydmljZXMvc2V0dGluZ3MnXG5yZXF1aXJlICcuLi9oZWxwZXJzJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuXG5jbGFzcyBNZW1vcnlcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QGFycmF5ID0gW11cblx0cmVtZW1iZXI6IChjKS0+XG5cdFx0QGFycmF5LnB1c2ggY1xuXHRcdGlmIEBhcnJheS5sZW5ndGggPiBTLm1lbV9sZW5ndGggdGhlbiBAYXJyYXkuc2hpZnQoKVxuXHR2YWw6IC0+XG5cdFx0ZDMubWVhbiBAYXJyYXlcblxuY2xhc3MgTWVtb3JpZXNcblx0Y29uc3RydWN0b3I6ICgpLT5cblx0XHRAbWFwID0gZDMubWFwKClcblxuXHRyZW1lbWJlcjogKGFycl90aW1lLCBjb3N0KS0+XG5cdFx0aWYgQG1hcC5oYXMgYXJyX3RpbWVcblx0XHRcdEBtYXAuZ2V0IGFycl90aW1lXG5cdFx0XHRcdC5yZW1lbWJlciBjb3N0XG5cdFx0ZWxzZVxuXHRcdFx0bmV3TWVtID0gbmV3IE1lbW9yeVxuXHRcdFx0QG1hcC5zZXQgYXJyX3RpbWUgLCBuZXdNZW1cblx0XHRcdG5ld01lbS5yZW1lbWJlciBjb3N0IFxuXG5cdG1pbjogLT5cblx0XHRjID0gSW5maW5pdHlcblx0XHRjYW5kaWRhdGVzID0gW11cblx0XHRAbWFwLmZvckVhY2ggKHRpbWUsIG1lbW9yeSktPlxuXHRcdFx0Y29zdD0gbWVtb3J5LnZhbCgpXG5cdFx0XHRpZiBjb3N0IDwgY1xuXHRcdFx0XHRjID0gY29zdFxuXHRcdFx0XHRjYW5kaWRhdGVzID0gW11cblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoICt0aW1lXG5cdFx0XHRlbHNlIGlmIGNvc3QgPT0gY1xuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2ggK3RpbWVcblx0XHRfLnNhbXBsZSBjYW5kaWRhdGVzXG5cbmNsYXNzIENhciBcblx0Y29uc3RydWN0b3I6IChAbiwgQHRhcl90aW1lKS0+XG5cdFx0QHNjaGVkX3BlbiA9IEluZmluaXR5XG5cdFx0QGNvc3QgPSBJbmZpbml0eVxuXHRcdEB0cmF2ZWxfcGVuID0gSW5maW5pdHlcblx0XHRAZXhpdF90aW1lID0gSW5maW5pdHlcblx0XHRAbWVtb3JpZXMgPSBuZXcgTWVtb3JpZXNcblx0XHRAcGF0aCA9IFtdXG5cdFx0QHNhbXBsZWQgPSBmYWxzZVxuXG5cdHRvbGw6ICh0aW1lKS0+XG5cdFx0TWF0aC5tYXggUy5udW1fY2FycyAvIFMucmF0ZSAqIChTLmJldGEgKiBTLmdhbW1hKS8oUy5iZXRhICsgUy5nYW1tYSkgLSBAc2NoZWRfcGVuICwgMFxuXG5cdGV4aXQ6KHRpbWUpLT4gXG5cdFx0QGV4aXRfdGltZSA9IHRpbWVcblx0XHRAdHJhdmVsX3BlbiA9IEBleGl0X3RpbWUgLSBAYWN0dWFsX3RpbWVcblx0XHRzY2hlZF9kZWwgPSBAZXhpdF90aW1lIC0gUy53aXNoX3RpbWVcblx0XHRAc2NoZWRfcGVuID0gTWF0aC5tYXggLVMuYmV0YSAqIHNjaGVkX2RlbCwgUy5nYW1tYSAqIHNjaGVkX2RlbFxuXHRcdGMgPSBpZiBTLnRvbGxpbmcgdGhlbiBAdG9sbCh0aW1lKSBlbHNlIDBcblx0XHRAY29zdCA9IEB0cmF2ZWxfcGVuICsgQHNjaGVkX3BlbiArIGNcblx0XHRAbWVtb3JpZXMucmVtZW1iZXIgQGFjdHVhbF90aW1lICwgQGNvc3RcblxuXHRjaG9vc2U6IC0+XG5cdFx0QGxhc3RfdGFyID0gQHRhcl90aW1lXG5cdFx0QHRhcl90aW1lID0gQG1lbW9yaWVzLm1pbigpXG5cblx0Z3Vlc3NlcjogLT5cblx0XHRkMy5yYW5kb20ubm9ybWFsKCAwLCBTLnZhcikoKVxuXHRcdCMgXy5zYW1wbGUgWy1TLnZhci4uUy52YXJdXG5cblx0YXJyaXZlOiAtPlxuXHRcdGUgPSBNYXRoLnJvdW5kIEBndWVzc2VyKClcblx0XHRhID0gQHRhcl90aW1lICsgZVxuXHRcdHJlcyA9IE1hdGgubWF4IDEgLCBNYXRoLm1pbiggYSwgUy5udW1fbWludXRlcyAtIDEpXG5cdFx0QGFjdHVhbF90aW1lID0gcmVzXG5cdFx0cmVzXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyIiwiUyA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3NldHRpbmdzJylcbnJlcXVpcmUoJy4uL2hlbHBlcnMuY29mZmVlJylcbmQzID0gcmVxdWlyZSAnZDMnXG57bWF4fSA9IE1hdGhcblxuYmxhbmsgPSBcblx0cmVjZWl2ZV9xdWV1ZTogKCktPiBcblx0Y3VtX2Fycml2YWxzOiAwXG5cdGN1bV9leGl0czogMFxuXG5jbGFzcyBNaW51dGUgXG5cdGNvbnN0cnVjdG9yOiAoQHRpbWUpLT5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBjdW1fYXJyaXZhbHMgPSAwXG5cdFx0QGN1bV9leGl0cyA9IDBcblx0XHRAYXJyaXZhbHMgPSAwXG5cdFx0QGV4aXRzID0gMFxuXHRcdEBuZXh0ID0gdW5kZWZpbmVkXG5cdFx0QHByZXYgPSB1bmRlZmluZWRcblx0XHRAdGFyZ2V0ZWQgPSAwXG5cdFx0QHBhc3RfdGFyZ2V0cyA9IFtdXG5cblx0QHByb3BlcnR5ICd2YXJpYW5jZScsIGdldDogLT4gZDMudmFyaWFuY2UgQHBhc3RfYXJyaXZhbHNcblx0QHByb3BlcnR5ICd0YXJnZXRfYXZnJywgZ2V0OiAtPiBkMy5tZWFuIEBwYXN0X3RhcmdldHNcblxuXHRzZXRfbmV4dDogKG0pLT4gXG5cdFx0QG5leHQgPSBtID8gYmxhbmtcblxuXHRzZXRfcHJldjogKG0pLT5cblx0XHRAcHJldiA9IG0gPyBibGFua1xuXG5cdHNlcnZlOiAtPlxuXHRcdEBnb2FsX2V4aXRzID0gTWF0aC5taW4oIE1hdGgubWF4KCBTLnJhdGUgKiAoQHRpbWUgLSBTLnQxICkgLCAwKSAsIFMubnVtX2NhcnMpXG5cdFx0aWYgQHRpbWUgPCBTLnR0aWxkZSBcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gUy5yYXRlIC8oMSAtUy5iZXRhKSooQHRpbWUgLSBTLnQxKVxuXHRcdGVsc2Vcblx0XHRcdEBnb2FsX2Fycml2YWxzID0gKEB0aW1lIC0gUy50dGlsZGUpICogUy5yYXRlIC8gKDEgKyBTLmdhbW1hKSArIChTLnR0aWxkZSAtIFMudDEpKiBTLnJhdGUgLygxIC1TLmJldGEpXG5cdFx0QGdvYWxfYXJyaXZhbHMgPSBNYXRoLm1pbiBNYXRoLm1heChAZ29hbF9hcnJpdmFscyAsIDApLCBTLm51bV9jYXJzXG5cblx0XHRcblx0XHRAcXVldWVfbGVuZ3RoID0gQHF1ZXVlLmxlbmd0aFxuXHRcdHRyYXZlbF90aW1lID0gQHF1ZXVlX2xlbmd0aCAvIFMucmF0ZVxuXHRcdGV4aXRfdGltZSA9IEB0aW1lICsgdHJhdmVsX3RpbWVcblx0XHRkZWxheSA9IGV4aXRfdGltZSAtIFMud2lzaF90aW1lXG5cdFx0QHRyYXZlbF9jb3N0ID0gdHJhdmVsX3RpbWVcblx0XHRAc2NoZWRfZGVsYXkgPSBNYXRoLm1heCAtUy5iZXRhICogZGVsYXksIFMuZ2FtbWEgKiBkZWxheVxuXHRcdEBjb3N0ID0gdHJhdmVsX3RpbWUgKyBAc2NoZWRfZGVsYXlcblxuXHRcdFswLi4uTWF0aC5taW4oQHF1ZXVlX2xlbmd0aCwgUy5yYXRlKV1cblx0XHRcdC5mb3JFYWNoICgpPT5cblx0XHRcdFx0Y2FyID0gQHF1ZXVlLnBvcCgpXG5cdFx0XHRcdGNhci5leGl0IEB0aW1lXG5cdFx0XHRcdEBleGl0cysrXG5cblx0XHRAbmV4dC5yZWNlaXZlX3F1ZXVlIEBxdWV1ZVxuXHRcdEBjdW1fZXhpdHMgPUBwcmV2LmN1bV9leGl0cyArIEBleGl0c1xuXHRcdEBjdW1fYXJyaXZhbHMgPSBAcHJldi5jdW1fYXJyaXZhbHMgKyBAYXJyaXZhbHNcblxuXHRcdEBwYXN0X3RhcmdldHMucHVzaCBAdGFyZ2V0ZWRcblx0XHRpZiBAcGFzdF90YXJnZXRzLmxlbmd0aCA+IDQwIHRoZW4gQHBhc3RfdGFyZ2V0cy5zaGlmdCgpXG5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBhcnJpdmFscyA9IDBcblx0XHRAZXhpdHMgPSAwXG5cdFx0QHRhcmdldGVkID0gMFxuXG5cdHJlY2VpdmVfY2FyOiAoY2FyKS0+IFxuXHRcdEBxdWV1ZS5wdXNoKGNhcilcblx0XHRAYXJyaXZhbHMrK1xuXG5cdHJlY2VpdmVfcXVldWU6IChxdWV1ZSktPiBAcXVldWUgPSBAcXVldWUuY29uY2F0IHF1ZXVlXG5cbm1vZHVsZS5leHBvcnRzID0gTWludXRlIiwiYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuY2xhc3MgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpIC0+XG5cdFx0QHdpZHRoID0gNDUwXG5cdFx0QGhlaWdodCA9IDIwMFxuXHRcdEBWZXIgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdFx0LmRvbWFpbiBbMCw4XVxuXHRcdFx0LnJhbmdlIFtAaGVpZ2h0LCAwXVxuXG5cdFx0QEhvciA9IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0XHQuZG9tYWluIFswLDhdXG5cdFx0XHQucmFuZ2UgWzAsIEB3aWR0aF1cblxuXHRcdEBob3JBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBASG9yXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2JvdHRvbSdcblxuXHRcdEB2ZXJBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBAVmVyXG5cdFx0XHQudGlja3MgMTBcblx0XHRcdC5vcmllbnQgJ2xlZnQnXG5cblx0XHRAbWFyID0gXG5cdFx0XHRsZWZ0OiAzMFxuXHRcdFx0dG9wOiAxMFxuXHRcdFx0cmlnaHQ6IDEwXG5cdFx0XHRib3R0b206IDI1XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdEN0cmwiLCJTZXR0aW5ncyA9IHJlcXVpcmUgJy4vc2V0dGluZ3MnXG5NaW51dGUgPSByZXF1aXJlICcuLi9tb2RlbHMvbWludXRlJ1xuQ2FyID0gcmVxdWlyZSAnLi4vbW9kZWxzL2Nhcidcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbmNsYXNzIERhdGFcblx0Y29uc3RydWN0b3I6ICgpLT5cblx0XHRAbWludXRlcyA9IFswLi4uU2V0dGluZ3MubnVtX21pbnV0ZXNdLm1hcCAodGltZSk9PiBcblx0XHRcdFx0bmV3TWludXRlID0gbmV3IE1pbnV0ZSB0aW1lXG5cblx0XHRAbWludXRlcy5mb3JFYWNoIChtaW4saSxrKS0+XG5cdFx0XHRtaW4uc2V0X3ByZXYga1tpLTFdXG5cdFx0XHRtaW4uc2V0X25leHQga1tpKzFdXG5cblx0XHRAY2FycyA9IFswLi4uU2V0dGluZ3MubnVtX2NhcnNdLm1hcCAobiktPlxuXHRcdFx0XHRhcnJfdGltZSA9IF8uc2FtcGxlIFszLi4xMjBdXG5cdFx0XHRcdG5ld0NhciA9IG5ldyBDYXIgbiwgYXJyX3RpbWVcblxuXHRcdEBjYXJzLmZvckVhY2ggKGNhcixpLGspID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cblx0XHRAc3RhcnRfdGltZXMgPSBbXVxuXHRcdGkgPSAwXG5cblx0XHRAcmVjb3JkID0gLT5cblx0XHRcdFx0cyA9IF8uZmluZCBAbWludXRlcyAsIChkKT0+XG5cdFx0XHRcdFx0ZC5xdWV1ZS5sZW5ndGggPiBTZXR0aW5ncy5yYXRlXG5cdFx0XHRcdEBzdGFydF90aW1lcy5wdXNoIHMudGltZVxuXHRcdFx0XHRpZiBAc3RhcnRfdGltZXMubGVuZ3RoID4gMTAwMDAgdGhlbiBAc3RhcnRfdGltZXMuc2hpZnQoKVxuXG5cdGNhcnNfY2hvb3NlOiAtPlxuXHRcdF8uc2FtcGxlIEBjYXJzLCBTZXR0aW5ncy5zYW1wbGVfc2l6ZVxuXHRcdFx0LmZvckVhY2ggKGNhciktPlxuXHRcdFx0XHRjYXIuY2hvb3NlKClcblxuXHRjYXJzX2Fycml2ZTogLT5cblx0XHRAY2Fycy5mb3JFYWNoIChjYXIpID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cdFx0XHRAbWludXRlc1tjYXIudGFyX3RpbWVdLnRhcmdldGVkKytcblxuXHR0aWNrOiAtPlxuXHRcdCMgcGh5c2ljcyBzdGFnZVxuXHRcdEBtaW51dGVzLmZvckVhY2ggKG1pbnV0ZSktPiBtaW51dGUuc2VydmUoKVxuXHRcdCMgY2hvaWNlIHN0YWdlXG5cdFx0QGNhcnNfYXJyaXZlKClcblx0XHRAY2Fyc19jaG9vc2UoKVxuXHRcdEByZWNvcmQoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGEoKVxuIiwicmVxdWlyZSAnLi4vaGVscGVycydcbmNsYXNzIFNcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QG51bV9jYXJzID0gMTAwMFxuXHRcdEB3aXNoX3RpbWUgPSAxMjBcblx0XHRAbnVtX21pbnV0ZXM9IDE3MFxuXHRcdEByYXRlID0gMTBcblx0XHRAYmV0YSA9IC41XG5cdFx0QGdhbW1hID0gMlxuXHRcdEB2YXIgPSAyXG5cdFx0QHNhbXBsZV9zaXplID0gMjAwXG5cdFx0QGludGVydmFsID0gMjVcblx0XHRAbWVtX2xlbmd0aCA9IDJcblx0XHRAdG9sbGluZyA9IGZhbHNlXG5cdEBwcm9wZXJ0eSAndDEnLCBnZXQ6IC0+XG5cdFx0QHdpc2hfdGltZSAtIEBudW1fY2FycyAvIEByYXRlICogQGdhbW1hIC8gKEBiZXRhICsgQGdhbW1hKVxuXHRAcHJvcGVydHkgJ3QyJywgZ2V0OiAtPlxuXHRcdEB3aXNoX3RpbWUgKyBAbnVtX2NhcnMgLyBAcmF0ZSAqIEBiZXRhIC8gKEBiZXRhICsgQGdhbW1hKVxuXHRAcHJvcGVydHkgJ3R0aWxkZScsIGdldDotPlxuXHRcdEB3aXNoX3RpbWUgLSBAbnVtX2NhcnMgLyBAcmF0ZSAqIEBnYW1tYSAqIEBiZXRhIC8gKEBiZXRhICsgQGdhbW1hKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFMgIl19
