(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var angular, app, d3;

angular = require('angular');

d3 = require('d3');

app = angular.module('mainApp', [require('angular-material')]).directive('shifter', require('./directives/shifter')).directive('cumChart', require('./components/cumulative/cumChart')).directive('arrChart', require('./components/arrivals/arrChart')).directive('mainDer', require('./components/main/main')).directive('horAxisDer', require('./directives/xAxis')).directive('verAxisDer', require('./directives/yAxis')).directive('shifter', require('./directives/shifter')).directive('behavior', require('./directives/behavior')).directive('datum', require('./directives/datum')).directive('d3Der', require('./directives/d3Der')).directive('changeChart', require('./components/changes/changeChart')).directive('changeDer', require('./components/changes/changes2'));



},{"./components/arrivals/arrChart":2,"./components/changes/changeChart":3,"./components/changes/changes2":4,"./components/cumulative/cumChart":5,"./components/main/main":6,"./directives/behavior":7,"./directives/d3Der":8,"./directives/datum":9,"./directives/shifter":10,"./directives/xAxis":11,"./directives/yAxis":12,"angular":undefined,"angular-material":undefined,"d3":undefined}],2:[function(require,module,exports){
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
var Ctrl, Data, PlotCtrl, Settings, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' fill='#333' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun'></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g y-axis scale='vm.Y' width='vm.width'></g>\n		<g ex-axis height='vm.height' scale='vm.X' shifter='{{[0,vm.height]}}'></g>\n		<g class='sample'>\n			<circle ng-repeat='car in vm.sample' shifter='{{[vm.Hor(car.last_tar), vm.Ver(car.tar_time - car.last_tar)]}}' class='dot' r='4' tran='vm.tran' ng-attr-fill='{{::vm.col($index)}}'/>\n		</g>\n	</g>\n</svg>";

Ctrl = (function(superClass) {
  extend(Ctrl, superClass);

  function Ctrl(scope) {
    this.scope = scope;
    Ctrl.__super__.constructor.call(this, this.scope);
    this.sample = Data.sample;
    this.Ver.domain([-15, 15]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.tran = function(tran) {
      return tran.ease('linear').duration(100);
    };
    this.col = d3.scale.category20c();
  }

  return Ctrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', Ctrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],4:[function(require,module,exports){
var Ctrl, Data, PlotCtrl, Settings, _, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

_ = require('lodash');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' fill='#333' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun'></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g y-axis scale='vm.Y' width='vm.width'></g>\n		<g ex-axis height='vm.height' scale='vm.X' shifter='{{[0,vm.height]}}'></g>\n		<g class='sample'>\n			<path ng-repeat='car in vm.sample' d3-der='{d: vm.lineFun(car.history)}' class='history' ng-attr-stroke='{{::vm.col($index)}}' />\n			<circle ng-repeat='car in vm.sample' shifter='{{[vm.Hor(car.last_tar), vm.Ver(car.tar_time)]}}' class='dot' r='4' tran='vm.tran' ng-attr-fill='{{::vm.col($index)}}'/>\n		</g>\n	</g>\n</svg>";

Ctrl = (function(superClass) {
  extend(Ctrl, superClass);

  function Ctrl(scope) {
    this.scope = scope;
    Ctrl.__super__.constructor.call(this, this.scope);
    this.sample = _.sample(Data.sample, 1);
    this.Ver.domain([0, 120]);
    this.Hor.domain([0, 120]);
    this.lineFun = d3.svg.line().x(function(d) {
      return this.Hor(d.from);
    }).y(function(d) {
      return this.Ver(d.to);
    });
    this.tran = function(tran) {
      return tran.ease('linear').duration(100);
    };
    this.col = d3.scale.category20c();
  }

  return Ctrl;

})(PlotCtrl);

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', Ctrl],
    controllerAs: 'vm',
    templateNamespace: 'svg',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined,"lodash":undefined}],5:[function(require,module,exports){
var Data, PlotCtrl, Settings, cumCtrl, d3, der, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

d3 = require('d3');

Settings = require('../../services/settings');

PlotCtrl = require('../../models/plotCtrl');

Data = require('../../services/data');

template = "<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>\n	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>\n		<rect d3-der='{width: vm.width, height: vm.height}' class='background' />\n		<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>\n		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>\n		<g class='g-lines'>\n			<path class='arr-line'  d3-der='{d: vm.arr_line(vm.minutes)}' />\n			<path class='arr-line goal' ng-attr-d='{{vm.goal_arrs(vm.minutes)}}' />\n			<path class='exit-line' d3-der='{d: vm.exit_line(vm.minutes)}' />\n			<path class='exit-line goal' ng-attr-d='{{vm.goal_exits(vm.minutes)}}' />\n		</g>\n	</g>\n</svg>";

cumCtrl = (function(superClass) {
  extend(cumCtrl, superClass);

  function cumCtrl(scope) {
    this.scope = scope;
    cumCtrl.__super__.constructor.call(this, this.scope);
    this.minutes = Data.minutes;
    this.Ver.domain([0, Settings.num_cars]);
    this.Hor.domain([0, Settings.num_minutes]);
    this.Cars = Data.cars;
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



},{"../../models/plotCtrl":16,"../../services/data":17,"../../services/settings":18,"d3":undefined}],6:[function(require,module,exports){
'use strict';
var Ctrl, Data, Settings, _, d3, der, template, timeout;

_ = require('lodash');

d3 = require('d3');

Data = require('../../services/data');

timeout = require('../../helpers').timeout;

Settings = require('../../services/settings');

template = '<button ng-click=\'vm.play()\'>Play</buton>\n<button ng-click=\'vm.stop()\'>Stop</buton>';

Ctrl = (function() {
  function Ctrl(scope) {
    this.scope = scope;
    this.minutes = Data.minutes;
    this.paused = false;
    this.Data = Data;
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
    scope: {}
  };
};

module.exports = der;



},{"../../helpers":13,"../../services/data":17,"../../services/settings":18,"d3":undefined,"lodash":undefined}],7:[function(require,module,exports){
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
var Car, Memories, Memory, Settings, _, d3;

d3 = require('d3');

Settings = require('../services/settings');

require('../helpers');

_ = require('lodash');

Memory = (function() {
  function Memory() {
    this.array = [];
  }

  Memory.prototype.remember = function(c) {
    this.array.push(c);
    if (this.array.length > 5) {
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
    sched_del = this.exit_time - Settings.wish_time;
    this.sched_pen = Math.max(-Settings.beta * sched_del, Settings.gamma * sched_del);
    this.cost = this.travel_pen + this.sched_pen;
    return this.memories.remember(this.actual_time, this.cost);
  };

  Car.prototype.choose = function() {
    var change;
    this.last_tar = this.tar_time;
    this.tar_time = this.memories.min();
    if (this.sampled) {
      change = {
        from: this.last_tar,
        to: this.tar_time
      };
      this.history.push(change);
      if (this.history.length > 100) {
        return this.history.shift();
      }
    }
  };

  Car.prototype.guesser = function() {
    return _.sample([-2, -1, 0, 1, 2]);
  };

  Car.prototype.arrive = function() {
    var a, e, res;
    e = Math.random() < .4 ? 0 : Math.floor(this.guesser());
    a = this.tar_time + e;
    res = Math.max(1, Math.min(a, Settings.num_minutes - 1));
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
    this.goal_exits = Math.min(Math.max(S.rate * (this.time - S.t1), 0), S.num_cars);
    if (this.time < S.ttilde) {
      this.goal_arrivals = S.rate / (1 - S.beta) * (this.time - S.t1);
    } else {
      this.goal_arrivals = (this.time - S.ttilde) * S.rate / (1 + S.gamma) + (S.ttilde - S.t1) * S.rate / (1 - S.beta);
    }
    this.goal_arrivals = Math.min(Math.max(this.goal_arrivals, 0), S.num_cars);
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
    this.queue_length = this.queue.length;
    travel_time = this.queue_length / S.rate;
    exit_time = this.time + travel_time;
    delay = exit_time - S.wish_time;
    this.cost = travel_time + Math.max(-S.beta * delay, S.gamma * delay);
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
    this.height = 300;
    this.Ver = d3.scale.linear().domain([0, 8]).range([this.height, 0]);
    this.Hor = d3.scale.linear().domain([0, 8]).range([0, this.width]);
    this.horAxFun = d3.svg.axis().scale(this.Hor).ticks(5).orient('bottom');
    this.verAxFun = d3.svg.axis().scale(this.Ver).ticks(5).orient('left');
    this.mar = {
      left: 30,
      top: 20,
      right: 10,
      bottom: 30
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
    var j, l, ref, ref1, results, results1;
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
        for (l = 10; l <= 60; l++){ results1.push(l); }
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
    this.sample = _.sample(this.cars, 200);
    this.sample.forEach(function(d) {
      d.sampled = true;
      return d.history = [];
    });
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
    return this.cars_choose();
  };

  return Data;

})();

module.exports = new Data();



},{"../models/car":14,"../models/minute":15,"./settings":18,"lodash":undefined}],18:[function(require,module,exports){
'use strict';
var S;

S = {
  num_cars: 1200,
  wish_time: 85,
  num_minutes: 135,
  rate: 12,
  beta: .5,
  gamma: 2,
  sample_size: 150,
  interval: 60,
  minutes: []
};

S.t1 = S.wish_time - S.num_cars / S.rate * S.gamma / (S.beta + S.gamma);

S.t2 = S.wish_time + S.num_cars / S.rate * S.beta / (S.beta + S.gamma);

S.ttilde = S.wish_time - S.num_cars / S.rate * S.gamma * S.beta / (S.beta + S.gamma);

module.exports = S;



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvYXBwLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL2Fycml2YWxzL2FyckNoYXJ0LmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlQ2hhcnQuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL2NvbXBvbmVudHMvY2hhbmdlcy9jaGFuZ2VzMi5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvY29tcG9uZW50cy9jdW11bGF0aXZlL2N1bUNoYXJ0LmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9jb21wb25lbnRzL21haW4vbWFpbi5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvZGlyZWN0aXZlcy9iZWhhdmlvci5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvZGlyZWN0aXZlcy9kM0Rlci5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvZGlyZWN0aXZlcy9kYXR1bS5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvc3RvY2hhc3RpYy9hcHAvZGlyZWN0aXZlcy9zaGlmdGVyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL3hBeGlzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9kaXJlY3RpdmVzL3lBeGlzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9oZWxwZXJzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9tb2RlbHMvY2FyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9tb2RlbHMvbWludXRlLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9zdG9jaGFzdGljL2FwcC9tb2RlbHMvcGxvdEN0cmwuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL3NlcnZpY2VzL2RhdGEuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3N0b2NoYXN0aWMvYXBwL3NlcnZpY2VzL3NldHRpbmdzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQUEsQ0FBQTtBQUFBLElBQUEsZ0JBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUVBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FGTCxDQUFBOztBQUFBLEdBR0EsR0FBTSxPQUFPLENBQUMsTUFBUixDQUFlLFNBQWYsRUFBMEIsQ0FBQyxPQUFBLENBQVEsa0JBQVIsQ0FBRCxDQUExQixDQUNMLENBQUMsU0FESSxDQUNNLFNBRE4sRUFDa0IsT0FBQSxDQUFRLHNCQUFSLENBRGxCLENBRUwsQ0FBQyxTQUZJLENBRU0sVUFGTixFQUVrQixPQUFBLENBQVEsa0NBQVIsQ0FGbEIsQ0FHTCxDQUFDLFNBSEksQ0FHTSxVQUhOLEVBR2tCLE9BQUEsQ0FBUSxnQ0FBUixDQUhsQixDQUlMLENBQUMsU0FKSSxDQUlNLFNBSk4sRUFJaUIsT0FBQSxDQUFRLHdCQUFSLENBSmpCLENBS0wsQ0FBQyxTQUxJLENBS00sWUFMTixFQUtvQixPQUFBLENBQVEsb0JBQVIsQ0FMcEIsQ0FNTCxDQUFDLFNBTkksQ0FNTSxZQU5OLEVBTW9CLE9BQUEsQ0FBUSxvQkFBUixDQU5wQixDQU9MLENBQUMsU0FQ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QUFTLEVBUlQ7Q0FKRCxDQUFBOztBQUFBLENBY0MsQ0FBQyxFQUFGLEdBQU8sQ0FBQyxDQUFDLFNBQUYsR0FBYyxDQUFDLENBQUMsUUFBRixHQUFhLENBQUMsQ0FBQyxJQUFmLEdBQXNCLENBQUMsQ0FBQyxLQUF4QixHQUFnQyxDQUFDLENBQUMsQ0FBQyxJQUFGLEdBQVMsQ0FBQyxDQUFDLEtBQVosQ0FkckQsQ0FBQTs7QUFBQSxDQWVDLENBQUMsRUFBRixHQUFPLENBQUMsQ0FBQyxTQUFGLEdBQWMsQ0FBQyxDQUFDLFFBQUYsR0FBYSxDQUFDLENBQUMsSUFBZixHQUFzQixDQUFDLENBQUMsSUFBeEIsR0FBK0IsQ0FBQyxDQUFDLENBQUMsSUFBRixHQUFTLENBQUMsQ0FBQyxLQUFaLENBZnBELENBQUE7O0FBQUEsQ0FnQkMsQ0FBQyxNQUFGLEdBQVcsQ0FBQyxDQUFDLFNBQUYsR0FBYyxDQUFDLENBQUMsUUFBRixHQUFhLENBQUMsQ0FBQyxJQUFmLEdBQXNCLENBQUMsQ0FBQyxLQUF4QixHQUFnQyxDQUFDLENBQUMsSUFBbEMsR0FBeUMsQ0FBQyxDQUFDLENBQUMsSUFBRixHQUFTLENBQUMsQ0FBQyxLQUFaLENBaEJsRSxDQUFBOztBQUFBLE1Bb0JNLENBQUMsT0FBUCxHQUFpQixDQXBCakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuZDMgPSByZXF1aXJlICdkMydcbmFwcCA9IGFuZ3VsYXIubW9kdWxlICdtYWluQXBwJywgW3JlcXVpcmUgJ2FuZ3VsYXItbWF0ZXJpYWwnXVxuXHQuZGlyZWN0aXZlICdzaGlmdGVyJyAsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9zaGlmdGVyJ1xuXHQuZGlyZWN0aXZlICdjdW1DaGFydCcsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jdW11bGF0aXZlL2N1bUNoYXJ0J1xuXHQuZGlyZWN0aXZlICdhcnJDaGFydCcsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9hcnJpdmFscy9hcnJDaGFydCdcblx0LmRpcmVjdGl2ZSAnbWFpbkRlcicsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9tYWluL21haW4nXG5cdC5kaXJlY3RpdmUgJ2hvckF4aXNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMveEF4aXMnXG5cdC5kaXJlY3RpdmUgJ3ZlckF4aXNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMveUF4aXMnXG5cdC5kaXJlY3RpdmUgJ3NoaWZ0ZXInICwgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL3NoaWZ0ZXInXG5cdC5kaXJlY3RpdmUgJ2JlaGF2aW9yJywgcmVxdWlyZSAnLi9kaXJlY3RpdmVzL2JlaGF2aW9yJ1xuXHQuZGlyZWN0aXZlICdkYXR1bScsIHJlcXVpcmUgJy4vZGlyZWN0aXZlcy9kYXR1bSdcblx0LmRpcmVjdGl2ZSAnZDNEZXInLCByZXF1aXJlICcuL2RpcmVjdGl2ZXMvZDNEZXInXG5cdC5kaXJlY3RpdmUgJ2NoYW5nZUNoYXJ0JywgcmVxdWlyZSAnLi9jb21wb25lbnRzL2NoYW5nZXMvY2hhbmdlQ2hhcnQnXG5cdC5kaXJlY3RpdmUgJ2NoYW5nZURlcicsIHJlcXVpcmUgJy4vY29tcG9uZW50cy9jaGFuZ2VzL2NoYW5nZXMyJyIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdhcnItbGluZScgIGQzLWRlcj0ne2Q6IHZtLmxpbmVGdW4odm0ubWludXRlcyl9JyAvPlxuXHRcdFx0XHQ8cGF0aCBjbGFzcz0nZXhpdC1saW5lJyBkMy1kZXI9J3tkOiB2bS5saW5lRnVuMih2bS5taW51dGVzKX0nIC8+XG5cdFx0XHQ8L2c+XG5cdFx0PC9nPlxuXHQ8L3N2Zz5cblwiXCJcIlxuY2xhc3MgYXJyQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QG1pbnV0ZXMgPSBEYXRhLm1pbnV0ZXNcblx0XHRAVmVyLmRvbWFpbiBbMCwgNDBdXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXHRcdCMgQGxpbmVGdW4gPSBkMy5zdmcubGluZSgpXG5cdFx0IyBcdC55IChkKT0+IEBWZXIgZC5hcnJpdmFsc1xuXHRcdCMgXHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdEBsaW5lRnVuMiA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC55IChkKT0+IEBWZXIgZC50YXJnZXRfYXZnXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuZGVyID0gKCktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsIGFyckN0cmxdXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0c2NvcGU6IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiZDMgPSByZXF1aXJlKCdkMycpXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcblxudGVtcGxhdGUgPSBcIlwiXCJcbjxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdDxnIGNsYXNzPSdnLW1haW4nIHNoaWZ0ZXI9J3t7Ojpbdm0ubWFyLmxlZnQsIHZtLm1hci50b3BdfX0nPlxuXHRcdDxyZWN0IGQzLWRlcj0ne3dpZHRoOiB2bS53aWR0aCwgaGVpZ2h0OiB2bS5oZWlnaHR9JyBmaWxsPScjMzMzJyAvPlxuXHRcdDxnIHZlci1heGlzLWRlciB3aWR0aD0ndm0ud2lkdGgnIGZ1bj0ndm0udmVyQXhGdW4nPjwvZz5cblx0XHQ8ZyBob3ItYXhpcy1kZXIgZnVuPSd2bS5ob3JBeEZ1bicgaGVpZ2h0PSd2bS5oZWlnaHQnIHNoaWZ0ZXI9J3t7OjpbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHQ8ZyB5LWF4aXMgc2NhbGU9J3ZtLlknIHdpZHRoPSd2bS53aWR0aCc+PC9nPlxuXHRcdDxnIGV4LWF4aXMgaGVpZ2h0PSd2bS5oZWlnaHQnIHNjYWxlPSd2bS5YJyBzaGlmdGVyPSd7e1swLHZtLmhlaWdodF19fSc+PC9nPlxuXHRcdDxnIGNsYXNzPSdzYW1wbGUnPlxuXHRcdFx0PGNpcmNsZSBuZy1yZXBlYXQ9J2NhciBpbiB2bS5zYW1wbGUnIHNoaWZ0ZXI9J3t7W3ZtLkhvcihjYXIubGFzdF90YXIpLCB2bS5WZXIoY2FyLnRhcl90aW1lIC0gY2FyLmxhc3RfdGFyKV19fScgY2xhc3M9J2RvdCcgcj0nNCcgdHJhbj0ndm0udHJhbicgbmctYXR0ci1maWxsPSd7ezo6dm0uY29sKCRpbmRleCl9fScvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QHNhbXBsZSA9IERhdGEuc2FtcGxlXG5cdFx0QFZlci5kb21haW4gWy0xNSwgMTVdXG5cdFx0QEhvci5kb21haW4gWzAsIFNldHRpbmdzLm51bV9taW51dGVzXVxuXHRcdEB0cmFuID0gKHRyYW4pLT5cblx0XHRcdHRyYW4uZWFzZSAnbGluZWFyJ1xuXHRcdFx0XHQuZHVyYXRpb24gMTAwXG5cdFx0QGNvbCA9IGQzLnNjYWxlLmNhdGVnb3J5MjBjKClcblxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSAnZDMnXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xuUGxvdEN0cmwgPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvcGxvdEN0cmwnXG5EYXRhID0gcmVxdWlyZSAnLi4vLi4vc2VydmljZXMvZGF0YSdcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG48c3ZnIG5nLWF0dHItd2lkdGg9J3t7Ojp2bS53aWR0aCArIHZtLm1hci5sZWZ0K3ZtLm1hci5yaWdodH19JyBuZy1hdHRyLWhlaWdodD0ne3s6OnZtLmhlaWdodCArIHZtLm1hci50b3AgKyB2bS5tYXIuYm90dG9tfX0nPlxuXHQ8ZyBjbGFzcz0nZy1tYWluJyBzaGlmdGVyPSd7ezo6W3ZtLm1hci5sZWZ0LCB2bS5tYXIudG9wXX19Jz5cblx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgZmlsbD0nIzMzMycgLz5cblx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJz48L2c+XG5cdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0PGcgeS1heGlzIHNjYWxlPSd2bS5ZJyB3aWR0aD0ndm0ud2lkdGgnPjwvZz5cblx0XHQ8ZyBleC1heGlzIGhlaWdodD0ndm0uaGVpZ2h0JyBzY2FsZT0ndm0uWCcgc2hpZnRlcj0ne3tbMCx2bS5oZWlnaHRdfX0nPjwvZz5cblx0XHQ8ZyBjbGFzcz0nc2FtcGxlJz5cblx0XHRcdDxwYXRoIG5nLXJlcGVhdD0nY2FyIGluIHZtLnNhbXBsZScgZDMtZGVyPSd7ZDogdm0ubGluZUZ1bihjYXIuaGlzdG9yeSl9JyBjbGFzcz0naGlzdG9yeScgbmctYXR0ci1zdHJva2U9J3t7Ojp2bS5jb2woJGluZGV4KX19JyAvPlxuXHRcdFx0PGNpcmNsZSBuZy1yZXBlYXQ9J2NhciBpbiB2bS5zYW1wbGUnIHNoaWZ0ZXI9J3t7W3ZtLkhvcihjYXIubGFzdF90YXIpLCB2bS5WZXIoY2FyLnRhcl90aW1lKV19fScgY2xhc3M9J2RvdCcgcj0nNCcgdHJhbj0ndm0udHJhbicgbmctYXR0ci1maWxsPSd7ezo6dm0uY29sKCRpbmRleCl9fScvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QHNhbXBsZSA9IF8uc2FtcGxlIERhdGEuc2FtcGxlICwgMVxuXHRcdEBWZXIuZG9tYWluIFswLCAxMjBdXG5cdFx0QEhvci5kb21haW4gWzAsIDEyMF1cblx0XHRAbGluZUZ1biA9IGQzLnN2Zy5saW5lKClcblx0XHRcdC54IChkKS0+IEBIb3IgZC5mcm9tXG5cdFx0XHQueSAoZCktPkBWZXIgZC50b1xuXHRcdEB0cmFuID0gKHRyYW4pLT5cblx0XHRcdHRyYW4uZWFzZSAnbGluZWFyJ1xuXHRcdFx0XHQuZHVyYXRpb24gMTAwXG5cdFx0QGNvbCA9IGQzLnNjYWxlLmNhdGVnb3J5MjBjKClcblxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsImQzID0gcmVxdWlyZSgnZDMnKVxuU2V0dGluZ3MgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblBsb3RDdHJsID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL3Bsb3RDdHJsJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG5cbnRlbXBsYXRlID0gXCJcIlwiXG5cdDxzdmcgbmctYXR0ci13aWR0aD0ne3s6OnZtLndpZHRoICsgdm0ubWFyLmxlZnQrdm0ubWFyLnJpZ2h0fX0nIG5nLWF0dHItaGVpZ2h0PSd7ezo6dm0uaGVpZ2h0ICsgdm0ubWFyLnRvcCArIHZtLm1hci5ib3R0b219fSc+XG5cdFx0PGcgY2xhc3M9J2ctbWFpbicgc2hpZnRlcj0ne3s6Olt2bS5tYXIubGVmdCwgdm0ubWFyLnRvcF19fSc+XG5cdFx0XHQ8cmVjdCBkMy1kZXI9J3t3aWR0aDogdm0ud2lkdGgsIGhlaWdodDogdm0uaGVpZ2h0fScgY2xhc3M9J2JhY2tncm91bmQnIC8+XG5cdFx0XHQ8ZyB2ZXItYXhpcy1kZXIgd2lkdGg9J3ZtLndpZHRoJyBmdW49J3ZtLnZlckF4RnVuJyA+PC9nPlxuXHRcdFx0PGcgaG9yLWF4aXMtZGVyIGZ1bj0ndm0uaG9yQXhGdW4nIGhlaWdodD0ndm0uaGVpZ2h0JyBzaGlmdGVyPSd7ezo6WzAsdm0uaGVpZ2h0XX19Jz48L2c+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1saW5lcyc+XG5cdFx0XHRcdDxwYXRoIGNsYXNzPSdhcnItbGluZScgIGQzLWRlcj0ne2Q6IHZtLmFycl9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2Fyci1saW5lIGdvYWwnIG5nLWF0dHItZD0ne3t2bS5nb2FsX2FycnModm0ubWludXRlcyl9fScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZScgZDMtZGVyPSd7ZDogdm0uZXhpdF9saW5lKHZtLm1pbnV0ZXMpfScgLz5cblx0XHRcdFx0PHBhdGggY2xhc3M9J2V4aXQtbGluZSBnb2FsJyBuZy1hdHRyLWQ9J3t7dm0uZ29hbF9leGl0cyh2bS5taW51dGVzKX19JyAvPlxuXHRcdFx0PC9nPlxuXHRcdDwvZz5cblx0PC9zdmc+XG5cIlwiXCJcblxuY2xhc3MgY3VtQ3RybCBleHRlbmRzIFBsb3RDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0c3VwZXIgQHNjb3BlXG5cdFx0QG1pbnV0ZXMgPSBEYXRhLm1pbnV0ZXNcblx0XHRAVmVyLmRvbWFpbiBbMCwgU2V0dGluZ3MubnVtX2NhcnNdIFxuXHRcdEBIb3IuZG9tYWluIFswLCBTZXR0aW5ncy5udW1fbWludXRlc11cblxuXHRcdEBDYXJzID0gRGF0YS5jYXJzXG5cblx0XHRAYXJyX2xpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY3VtX2Fycml2YWxzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZSBcblxuXHRcdEBleGl0X2xpbmUgPSBkMy5zdmcubGluZSgpXG5cdFx0XHQueSAoZCk9PiBAVmVyIGQuY3VtX2V4aXRzXG5cdFx0XHQueCAoZCk9PiBASG9yIGQudGltZVxuXHRcdFxuXHRcdEBnb2FsX2V4aXRzID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmdvYWxfZXhpdHNcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cblx0XHRAZ29hbF9hcnJzID0gZDMuc3ZnLmxpbmUoKVxuXHRcdFx0LnkgKGQpPT4gQFZlciBkLmdvYWxfYXJyaXZhbHNcblx0XHRcdC54IChkKT0+IEBIb3IgZC50aW1lXG5cdFx0XHRcblx0XHRcdFxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBjdW1DdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlclxuXG4iLCIndXNlIHN0cmljdCdcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuRGF0YSA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL2RhdGEnXG50aW1lb3V0ID0gcmVxdWlyZSggJy4uLy4uL2hlbHBlcnMnKS50aW1lb3V0XG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uLy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xudGVtcGxhdGUgPSAnJydcblx0PGJ1dHRvbiBuZy1jbGljaz0ndm0ucGxheSgpJz5QbGF5PC9idXRvbj5cblx0PGJ1dHRvbiBuZy1jbGljaz0ndm0uc3RvcCgpJz5TdG9wPC9idXRvbj5cbicnJ1xuXG5jbGFzcyBDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0QG1pbnV0ZXMgPSBEYXRhLm1pbnV0ZXNcblx0XHRAcGF1c2VkID0gZmFsc2Vcblx0XHRARGF0YSA9IERhdGFcblxuXHRsb29wZXI6IC0+XG5cdFx0dGltZW91dCA9PlxuXHRcdFx0RGF0YS50aWNrKClcblx0XHRcdEBzY29wZS4kZXZhbEFzeW5jKClcblx0XHRcdGlmIG5vdCBAcGF1c2VkIHRoZW4gQGxvb3BlcigpXG5cdFx0XHRAcGF1c2VkXG5cdFx0LCBTZXR0aW5ncy5pbnRlcnZhbFxuXG5cdHBsYXk6IC0+XG5cdFx0QHBhdXNlZCA9IGZhbHNlXG5cdFx0ZDMudGltZXIuZmx1c2goKVxuXHRcdEBsb29wZXIoKVxuXG5cdHN0b3A6IC0+IEBwYXVzZWQgPSB0cnVlXG5cbmRlciA9IC0+XG5cdGRpcmVjdGl2ZSA9XG5cdFx0Y29udHJvbGxlcjogWyckc2NvcGUnLCBDdHJsXVxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHRcdHNjb3BlOiB7fVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyXG4iLCJkcmFnID0gKCRwYXJzZSktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRsaW5rOiAoc2NvcGUsZWwsYXR0ciktPlxuXHRcdFx0c2VsID0gZDMuc2VsZWN0KGVsWzBdKVxuXHRcdFx0c2VsLmNhbGwoJHBhcnNlKGF0dHIuYmVoYXZpb3IpKHNjb3BlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBkcmFnIiwiZDMgPSByZXF1aXJlICdkMydcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuXG5kZXIgPSAoJHBhcnNlKS0+ICNnb2VzIG9uIGEgc3ZnIGVsZW1lbnRcblx0ZGlyZWN0aXZlID0gXG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdHNjb3BlOiBcblx0XHRcdGQzRGVyOiAnPSdcblx0XHRcdHRyYW46ICc9J1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIpLT5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0dSA9ICd0LScgKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHRzY29wZS4kd2F0Y2ggJ2QzRGVyJ1xuXHRcdFx0XHQsICh2KS0+XG5cdFx0XHRcdFx0aWYgc2NvcGUudHJhblxuXHRcdFx0XHRcdFx0c2VsLnRyYW5zaXRpb24gdVxuXHRcdFx0XHRcdFx0XHQuYXR0ciB2XG5cdFx0XHRcdFx0XHRcdC5jYWxsIHNjb3BlLnRyYW5cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRzZWwuYXR0ciB2XG5cblx0XHRcdFx0LCB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IGRlciIsIm1vZHVsZS5leHBvcnRzID0gKCRwYXJzZSktPlxuXHQoc2NvcGUsIGVsLCBhdHRyKS0+XG5cdFx0ZDMuc2VsZWN0KGVsWzBdKS5kYXR1bSAkcGFyc2UoYXR0ci5kYXR1bSkoc2NvcGUpIiwiZDMgPSByZXF1aXJlICdkMydcblxuZGVyID0gKCRwYXJzZSktPlxuXHRkaXJlY3RpdmUgPVxuXHRcdHJlc3RyaWN0OiAnQSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyKS0+XG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QgZWxbMF1cblx0XHRcdHUgPSAndC0nICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0dHJhbiA9ICRwYXJzZShhdHRyLnRyYW4pKHNjb3BlKVxuXHRcdFx0cmVzaGlmdCA9ICh2KS0+IFxuXHRcdFx0XHRpZiB0cmFuXG5cdFx0XHRcdFx0c2VsLnRyYW5zaXRpb24gdVxuXHRcdFx0XHRcdFx0LmF0dHIgJ3RyYW5zZm9ybScgLCBcInRyYW5zbGF0ZSgje3ZbMF19LCN7dlsxXX0pXCJcblx0XHRcdFx0XHRcdC5jYWxsIHRyYW5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHNlbC5hdHRyICd0cmFuc2Zvcm0nICwgXCJ0cmFuc2xhdGUoI3t2WzBdfSwje3ZbMV19KVwiXG5cblx0XHRcdFx0ZDMuc2VsZWN0IGVsWzBdXG5cdFx0XHRcdFx0XG5cblx0XHRcdHNjb3BlLiR3YXRjaCAtPlxuXHRcdFx0XHRcdCRwYXJzZShhdHRyLnNoaWZ0ZXIpKHNjb3BlKVxuXHRcdFx0XHQsIHJlc2hpZnRcblx0XHRcdFx0LCB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gZGVyIiwiZDMgPSByZXF1aXJlICdkMydcbmFuZ3VsYXIgPSByZXF1aXJlICdhbmd1bGFyJ1xuXG5kZXIgPSAoJHdpbmRvdyktPlxuXHRkaXJlY3RpdmUgPSBcblx0XHRjb250cm9sbGVyOiBhbmd1bGFyLm5vb3Bcblx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHRiaW5kVG9Db250cm9sbGVyOiB0cnVlXG5cdFx0cmVzdHJpY3Q6ICdBJ1xuXHRcdHRlbXBsYXRlTmFtZXNwYWNlOiAnc3ZnJ1xuXHRcdHNjb3BlOiBcblx0XHRcdGhlaWdodDogJz0nXG5cdFx0XHRmdW46ICc9J1xuXHRcdGxpbms6IChzY29wZSwgZWwsIGF0dHIsIHZtKS0+XG5cdFx0XHRzY2FsZSA9IHZtLmZ1bi5zY2FsZSgpXG5cblx0XHRcdHNlbCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0XHQuY2xhc3NlZCAneCBheGlzJywgdHJ1ZVxuXG5cdFx0XHR1cGRhdGUgPSA9PlxuXHRcdFx0XHR2bS5mdW4udGlja1NpemUgLXZtLmhlaWdodFxuXHRcdFx0XHRzZWwuY2FsbCB2bS5mdW5cblx0XHRcdFx0XG5cdFx0XHRzY29wZS4kd2F0Y2ggLT5cblx0XHRcdFx0W3NjYWxlLmRvbWFpbigpLCBzY2FsZS5yYW5nZSgpICx2bS5oZWlnaHRdXG5cdFx0XHQsIHVwZGF0ZVxuXHRcdFx0LCB0cnVlXG5cblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCJkMyA9IHJlcXVpcmUgJ2QzJ1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5cbmRlciA9ICgkd2luZG93KS0+XG5cdGRpcmVjdGl2ZSA9IFxuXHRcdGNvbnRyb2xsZXI6IGFuZ3VsYXIubm9vcFxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcblx0XHRyZXN0cmljdDogJ0EnXG5cdFx0dGVtcGxhdGVOYW1lc3BhY2U6ICdzdmcnXG5cdFx0c2NvcGU6IFxuXHRcdFx0d2lkdGg6ICc9J1xuXHRcdFx0ZnVuOiAnPSdcblx0XHRsaW5rOiAoc2NvcGUsIGVsLCBhdHRyLCB2bSktPlxuXHRcdFx0c2NhbGUgPSB2bS5mdW4uc2NhbGUoKVxuXG5cdFx0XHRzZWwgPSBkMy5zZWxlY3QoZWxbMF0pLmNsYXNzZWQgJ3kgYXhpcycsIHRydWVcblxuXHRcdFx0dXBkYXRlID0gPT5cblx0XHRcdFx0dm0uZnVuLnRpY2tTaXplKCAtdm0ud2lkdGgpXG5cdFx0XHRcdHNlbC5jYWxsIHZtLmZ1blxuXG5cdFx0XHRzY29wZS4kd2F0Y2ggLT5cblx0XHRcdFx0W3NjYWxlLmRvbWFpbigpLCBzY2FsZS5yYW5nZSgpICx2bS53aWR0aF1cblx0XHRcdCwgdXBkYXRlXG5cdFx0XHQsIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBkZXIiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMudGltZW91dCA9IChmdW4sIHRpbWUpLT5cblx0XHRkMy50aW1lcigoKT0+XG5cdFx0XHRmdW4oKVxuXHRcdFx0dHJ1ZVxuXHRcdCx0aW1lKVxuXG5cbkZ1bmN0aW9uOjpwcm9wZXJ0eSA9IChwcm9wLCBkZXNjKSAtPlxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgQHByb3RvdHlwZSwgcHJvcCwgZGVzYyIsImQzID0gcmVxdWlyZSAnZDMnXG5TZXR0aW5ncyA9IHJlcXVpcmUgJy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xucmVxdWlyZSAnLi4vaGVscGVycydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cblxuY2xhc3MgTWVtb3J5XG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdEBhcnJheSA9IFtdXG5cdHJlbWVtYmVyOiAoYyktPlxuXHRcdEBhcnJheS5wdXNoIGNcblx0XHRpZiBAYXJyYXkubGVuZ3RoID4gNSB0aGVuIEBhcnJheS5zaGlmdCgpXG5cdHZhbDogLT5cblx0XHQjIGQzLnN1bSBAYXJyYXkgLCAoZCxpKS0+XG5cblx0XHRkMy5tZWFuIEBhcnJheVxuXG5jbGFzcyBNZW1vcmllc1xuXHRjb25zdHJ1Y3RvcjogKCktPlxuXHRcdEBtYXAgPSBkMy5tYXAoKVxuXG5cdHJlbWVtYmVyOiAoYXJyX3RpbWUsIGNvc3QpLT5cblx0XHRpZiBAbWFwLmhhcyBhcnJfdGltZVxuXHRcdFx0QG1hcC5nZXQgYXJyX3RpbWVcblx0XHRcdFx0LnJlbWVtYmVyIGNvc3Rcblx0XHRlbHNlXG5cdFx0XHRuZXdNZW0gPSBuZXcgTWVtb3J5XG5cdFx0XHRAbWFwLnNldCBhcnJfdGltZSAsIG5ld01lbVxuXHRcdFx0bmV3TWVtLnJlbWVtYmVyIGNvc3QgXG5cblx0bWluOiAtPlxuXHRcdGMgPSBJbmZpbml0eVxuXHRcdGNhbmRpZGF0ZXMgPSBbXVxuXHRcdEBtYXAuZm9yRWFjaCAodGltZSwgbWVtb3J5KS0+XG5cdFx0XHRjb3N0PSBtZW1vcnkudmFsKClcblx0XHRcdGlmIGNvc3QgPCBjXG5cdFx0XHRcdGMgPSBjb3N0XG5cdFx0XHRcdGNhbmRpZGF0ZXMgPSBbXVxuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2ggK3RpbWVcblx0XHRcdGVsc2UgaWYgY29zdCA9PSBjXG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCArdGltZVxuXHRcdF8uc2FtcGxlIGNhbmRpZGF0ZXNcblxuY2xhc3MgQ2FyIFxuXHRjb25zdHJ1Y3RvcjogKEBuLCBAdGFyX3RpbWUpLT5cblx0XHRAc2NoZWRfcGVuID0gSW5maW5pdHlcblx0XHRAY29zdCA9IEluZmluaXR5XG5cdFx0QHRyYXZlbF9wZW4gPSBJbmZpbml0eVxuXHRcdEBleGl0X3RpbWUgPSBJbmZpbml0eVxuXHRcdEBtZW1vcmllcyA9IG5ldyBNZW1vcmllc1xuXHRcdEBwYXRoID0gW11cblx0XHRAc2FtcGxlZCA9IGZhbHNlXG5cblx0ZXhpdDoodGltZSktPiBcblx0XHRAZXhpdF90aW1lID0gdGltZVxuXHRcdEB0cmF2ZWxfcGVuID0gQGV4aXRfdGltZSAtIEBhY3R1YWxfdGltZVxuXHRcdHNjaGVkX2RlbCA9IEBleGl0X3RpbWUgLSBTZXR0aW5ncy53aXNoX3RpbWVcblx0XHRAc2NoZWRfcGVuID0gTWF0aC5tYXgoLVNldHRpbmdzLmJldGEgKiBzY2hlZF9kZWwsIFNldHRpbmdzLmdhbW1hICogc2NoZWRfZGVsKVxuXHRcdEBjb3N0ID0gQHRyYXZlbF9wZW4gKyBAc2NoZWRfcGVuXG5cdFx0QG1lbW9yaWVzLnJlbWVtYmVyIEBhY3R1YWxfdGltZSAsIEBjb3N0XG5cblx0Y2hvb3NlOiAtPlxuXHRcdEBsYXN0X3RhciA9IEB0YXJfdGltZVxuXHRcdEB0YXJfdGltZSA9IEBtZW1vcmllcy5taW4oKVxuXHRcdGlmIEBzYW1wbGVkXG5cdFx0XHRjaGFuZ2UgPSB7ZnJvbTogQGxhc3RfdGFyLCB0bzogQHRhcl90aW1lfVxuXHRcdFx0QGhpc3RvcnkucHVzaCBjaGFuZ2Vcblx0XHRcdGlmIEBoaXN0b3J5Lmxlbmd0aCA+IDEwMCB0aGVuIEBoaXN0b3J5LnNoaWZ0KClcblxuXHQjIGd1ZXNzZXI6IGQzLnJhbmRvbS5ub3JtYWwoMCwyKVxuXHRndWVzc2VyOiAtPlx0Xy5zYW1wbGUgWy0yLi4yXVxuXG5cdGFycml2ZTogLT5cblx0XHRlID0gaWYgTWF0aC5yYW5kb20oKSA8IC40IHRoZW4gMCBlbHNlIE1hdGguZmxvb3IgQGd1ZXNzZXIoKVxuXHRcdGEgPSBAdGFyX3RpbWUgKyBlXG5cdFx0cmVzID0gTWF0aC5tYXggMSAsIE1hdGgubWluKCBhLCBTZXR0aW5ncy5udW1fbWludXRlcyAtIDEpXG5cdFx0QGFjdHVhbF90aW1lID0gcmVzXG5cdFx0cmVzXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyIiwiUyA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3NldHRpbmdzJylcbnJlcXVpcmUoJy4uL2hlbHBlcnMuY29mZmVlJylcbmQzID0gcmVxdWlyZSAnZDMnXG57bWF4fSA9IE1hdGhcblxuYmxhbmsgPSBcblx0cmVjZWl2ZV9xdWV1ZTogKCktPiBcblx0Y3VtX2Fycml2YWxzOiAwXG5cdGN1bV9leGl0czogMFxuXG5jbGFzcyBNaW51dGUgXG5cdGNvbnN0cnVjdG9yOiAoQHRpbWUpLT5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBjdW1fYXJyaXZhbHMgPSAwXG5cdFx0QGN1bV9leGl0cyA9IDBcblx0XHRAYXJyaXZhbHMgPSAwXG5cdFx0QGV4aXRzID0gMFxuXHRcdEBuZXh0ID0gdW5kZWZpbmVkXG5cdFx0QHByZXYgPSB1bmRlZmluZWRcblx0XHRAdGFyZ2V0ZWQgPSAwXG5cdFx0QHBhc3RfdGFyZ2V0cyA9IFtdXG5cdFx0QGdvYWxfZXhpdHMgPSBNYXRoLm1pbiggTWF0aC5tYXgoIFMucmF0ZSAqIChAdGltZSAtIFMudDEgKSAsIDApICwgUy5udW1fY2Fycylcblx0XHRpZiBAdGltZSA8IFMudHRpbGRlIFxuXHRcdFx0QGdvYWxfYXJyaXZhbHMgPSBTLnJhdGUgLygxIC1TLmJldGEpKihAdGltZSAtIFMudDEpXG5cdFx0ZWxzZVxuXHRcdFx0QGdvYWxfYXJyaXZhbHMgPSAoQHRpbWUgLSBTLnR0aWxkZSkgKiBTLnJhdGUgLyAoMSArIFMuZ2FtbWEpICsgKFMudHRpbGRlIC0gUy50MSkqIFMucmF0ZSAvKDEgLVMuYmV0YSlcblx0XHRAZ29hbF9hcnJpdmFscyA9IE1hdGgubWluIE1hdGgubWF4KEBnb2FsX2Fycml2YWxzICwgMCksIFMubnVtX2NhcnNcblxuXHRAcHJvcGVydHkgJ3ZhcmlhbmNlJywgZ2V0OiAtPiBkMy52YXJpYW5jZSBAcGFzdF9hcnJpdmFsc1xuXHRAcHJvcGVydHkgJ3RhcmdldF9hdmcnLCBnZXQ6IC0+IGQzLm1lYW4gQHBhc3RfdGFyZ2V0c1xuXG5cdHNldF9uZXh0OiAobSktPiBcblx0XHRAbmV4dCA9IG0gPyBibGFua1xuXG5cdHNldF9wcmV2OiAobSktPlxuXHRcdEBwcmV2ID0gbSA/IGJsYW5rXG5cblx0c2VydmU6IC0+XG5cdFx0QHF1ZXVlX2xlbmd0aCA9IEBxdWV1ZS5sZW5ndGhcblx0XHR0cmF2ZWxfdGltZSA9IEBxdWV1ZV9sZW5ndGggLyBTLnJhdGVcblx0XHRleGl0X3RpbWUgPSBAdGltZSArIHRyYXZlbF90aW1lXG5cdFx0ZGVsYXkgPSBleGl0X3RpbWUgLSBTLndpc2hfdGltZVxuXHRcdEBjb3N0ID0gdHJhdmVsX3RpbWUgKyBNYXRoLm1heCAtUy5iZXRhICogZGVsYXksIFMuZ2FtbWEgKiBkZWxheVxuXG5cdFx0WzAuLi5NYXRoLm1pbihAcXVldWVfbGVuZ3RoLCBTLnJhdGUpXVxuXHRcdFx0LmZvckVhY2ggKCk9PlxuXHRcdFx0XHRjYXIgPSBAcXVldWUucG9wKClcblx0XHRcdFx0Y2FyLmV4aXQgQHRpbWVcblx0XHRcdFx0QGV4aXRzKytcblxuXHRcdEBuZXh0LnJlY2VpdmVfcXVldWUgQHF1ZXVlXG5cdFx0QGN1bV9leGl0cyA9QHByZXYuY3VtX2V4aXRzICsgQGV4aXRzXG5cdFx0QGN1bV9hcnJpdmFscyA9IEBwcmV2LmN1bV9hcnJpdmFscyArIEBhcnJpdmFsc1xuXHRcdCMgQHBhc3RfYXJyaXZhbHMucHVzaChAYXJyaXZhbHMpXG5cdFx0IyBpZiBAcGFzdF9hcnJpdmFscy5sZW5ndGggPiA4MCB0aGVuIEBwYXN0X2Fycml2YWxzLnNoaWZ0KClcblxuXHRcdEBwYXN0X3RhcmdldHMucHVzaCBAdGFyZ2V0ZWRcblx0XHRpZiBAcGFzdF90YXJnZXRzLmxlbmd0aCA+IDQwIHRoZW4gQHBhc3RfdGFyZ2V0cy5zaGlmdCgpXG5cblx0XHRAcXVldWUgPSBbXVxuXHRcdEBhcnJpdmFscyA9IDBcblx0XHRAZXhpdHMgPSAwXG5cdFx0QHRhcmdldGVkID0gMFxuXG5cdHJlY2VpdmVfY2FyOiAoY2FyKS0+IFxuXHRcdEBxdWV1ZS5wdXNoKGNhcilcblx0XHRAYXJyaXZhbHMrK1xuXG5cdHJlY2VpdmVfcXVldWU6IChxdWV1ZSktPiBAcXVldWUgPSBAcXVldWUuY29uY2F0IHF1ZXVlXG5cbm1vZHVsZS5leHBvcnRzID0gTWludXRlIiwiYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuY2xhc3MgUGxvdEN0cmxcblx0Y29uc3RydWN0b3I6IChAc2NvcGUpIC0+XG5cdFx0QHdpZHRoID0gNDUwXG5cdFx0QGhlaWdodCA9IDMwMFxuXHRcdEBWZXIgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdFx0LmRvbWFpbiBbMCw4XVxuXHRcdFx0LnJhbmdlIFtAaGVpZ2h0LCAwXVxuXG5cdFx0QEhvciA9IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0XHQuZG9tYWluIFswLDhdXG5cdFx0XHQucmFuZ2UgWzAsIEB3aWR0aF1cblxuXHRcdEBob3JBeEZ1biA9IGQzLnN2Zy5heGlzKClcblx0XHRcdC5zY2FsZSBASG9yXG5cdFx0XHQudGlja3MgNVxuXHRcdFx0Lm9yaWVudCAnYm90dG9tJ1xuXG5cdFx0QHZlckF4RnVuID0gZDMuc3ZnLmF4aXMoKVxuXHRcdFx0LnNjYWxlIEBWZXJcblx0XHRcdC50aWNrcyA1XG5cdFx0XHQub3JpZW50ICdsZWZ0J1xuXG5cdFx0QG1hciA9IFxuXHRcdFx0bGVmdDogMzBcblx0XHRcdHRvcDogMjBcblx0XHRcdHJpZ2h0OiAxMFxuXHRcdFx0Ym90dG9tOiAzMFxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsb3RDdHJsIiwiU2V0dGluZ3MgPSByZXF1aXJlICcuL3NldHRpbmdzJ1xuTWludXRlID0gcmVxdWlyZSAnLi4vbW9kZWxzL21pbnV0ZSdcbkNhciA9IHJlcXVpcmUgJy4uL21vZGVscy9jYXInXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG5jbGFzcyBEYXRhXG5cdGNvbnN0cnVjdG9yOiAoKS0+XG5cdFx0QG1pbnV0ZXMgPSBbMC4uLlNldHRpbmdzLm51bV9taW51dGVzXS5tYXAgKHRpbWUpPT4gXG5cdFx0XHRcdG5ld01pbnV0ZSA9IG5ldyBNaW51dGUgdGltZVxuXG5cdFx0QG1pbnV0ZXMuZm9yRWFjaCAobWluLGksayktPlxuXHRcdFx0bWluLnNldF9wcmV2IGtbaS0xXVxuXHRcdFx0bWluLnNldF9uZXh0IGtbaSsxXVxuXG5cdFx0QGNhcnMgPSBbMC4uLlNldHRpbmdzLm51bV9jYXJzXS5tYXAgKG4pLT5cblx0XHRcdFx0YXJyX3RpbWUgPSBfLnNhbXBsZSBbMTAuLjYwXVxuXHRcdFx0XHRuZXdDYXIgPSBuZXcgQ2FyIG4sIGFycl90aW1lXG5cblx0XHRAY2Fycy5mb3JFYWNoIChjYXIsaSxrKSA9PiBcblx0XHRcdHRpbWUgPSBjYXIuYXJyaXZlKClcblx0XHRcdEBtaW51dGVzW3RpbWVdLnJlY2VpdmVfY2FyIGNhclxuXG5cdFx0QHNhbXBsZSA9IF8uc2FtcGxlIEBjYXJzICwgMjAwXG5cdFx0QHNhbXBsZS5mb3JFYWNoIChkKS0+XG5cdFx0XHRkLnNhbXBsZWQgPSB0cnVlXG5cdFx0XHRkLmhpc3RvcnkgPSBbXVxuXG5cdGNhcnNfY2hvb3NlOiAtPlxuXHRcdF8uc2FtcGxlIEBjYXJzLCBTZXR0aW5ncy5zYW1wbGVfc2l6ZVxuXHRcdFx0LmZvckVhY2ggKGNhciktPlxuXHRcdFx0XHRjYXIuY2hvb3NlKClcblxuXHRjYXJzX2Fycml2ZTogLT5cblx0XHRAY2Fycy5mb3JFYWNoIChjYXIpID0+IFxuXHRcdFx0dGltZSA9IGNhci5hcnJpdmUoKVxuXHRcdFx0QG1pbnV0ZXNbdGltZV0ucmVjZWl2ZV9jYXIgY2FyXG5cdFx0XHRAbWludXRlc1tjYXIudGFyX3RpbWVdLnRhcmdldGVkKytcblxuXHR0aWNrOiAtPlxuXHRcdCMgcGh5c2ljcyBzdGFnZVxuXHRcdEBtaW51dGVzLmZvckVhY2ggKG1pbnV0ZSktPiBtaW51dGUuc2VydmUoKVxuXHRcdCMgY2hvaWNlIHN0YWdlXG5cdFx0QGNhcnNfYXJyaXZlKClcblx0XHRAY2Fyc19jaG9vc2UoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGEoKVxuIiwiJ3VzZSBzdHJpY3QnXG5cblxuUyA9IFxuXHRudW1fY2FyczogMTIwMFxuXHR3aXNoX3RpbWU6IDg1XG5cdG51bV9taW51dGVzOiAxMzVcblx0cmF0ZTogMTJcblx0YmV0YTogLjVcblx0Z2FtbWE6IDJcblx0c2FtcGxlX3NpemU6IDE1MFxuXHRpbnRlcnZhbDogNjBcblx0bWludXRlczogW11cblxuUy50MSA9IFMud2lzaF90aW1lIC0gUy5udW1fY2FycyAvIFMucmF0ZSAqIFMuZ2FtbWEgLyAoUy5iZXRhICsgUy5nYW1tYSlcblMudDIgPSBTLndpc2hfdGltZSArIFMubnVtX2NhcnMgLyBTLnJhdGUgKiBTLmJldGEgLyAoUy5iZXRhICsgUy5nYW1tYSlcblMudHRpbGRlID0gUy53aXNoX3RpbWUgLSBTLm51bV9jYXJzIC8gUy5yYXRlICogUy5nYW1tYSAqIFMuYmV0YSAvIChTLmJldGEgKyBTLmdhbW1hKVxuXG4jIFMucGhpID0gUy5cblxubW9kdWxlLmV4cG9ydHMgPSBTIFxuXG5cdFxuXG4iXX0=
