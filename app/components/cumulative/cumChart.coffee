d3 = require('d3')
Settings = require '../../services/settings'
PlotCtrl = require '../../models/plotCtrl'
Data = require '../../services/data'

template = """
	<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>
		<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>
			<rect d3-der='{width: vm.width, height: vm.height}' class='background' />
			<g ver-axis-der width='vm.width' fun='vm.verAxFun' ></g>
			<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>
			<g class='g-lines'>
				<path class='arr-line'  d3-der='{d: vm.arr_line(vm.minutes)}' />
				<path class='arr-line goal' ng-attr-d='{{vm.goal_arrs(vm.minutes)}}' />
				<path class='exit-line' d3-der='{d: vm.exit_line(vm.minutes)}' />
				<path class='exit-line goal' ng-attr-d='{{vm.goal_exits(vm.minutes)}}' />
			</g>
		</g>
	</svg>
"""

class cumCtrl extends PlotCtrl
	constructor: (@scope)->
		super @scope
		@minutes = Data.minutes
		@Ver.domain [0, Settings.num_cars] 
		@Hor.domain [0, Settings.num_minutes]

		@Cars = Data.cars

		@arr_line = d3.svg.line()
			.y (d)=> @Ver d.cum_arrivals
			.x (d)=> @Hor d.time 

		@exit_line = d3.svg.line()
			.y (d)=> @Ver d.cum_exits
			.x (d)=> @Hor d.time
		
		@goal_exits = d3.svg.line()
			.y (d)=> @Ver d.goal_exits
			.x (d)=> @Hor d.time

		@goal_arrs = d3.svg.line()
			.y (d)=> @Ver d.goal_arrivals
			.x (d)=> @Hor d.time
			
			
der = ->
	directive = 
		controller: ['$scope', cumCtrl]
		controllerAs: 'vm'
		templateNamespace: 'svg'
		template: template
		scope: {}

module.exports = der

