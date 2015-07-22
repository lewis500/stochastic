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
				<path class='fun total_cost'  d3-der='{d: vm.lineFun(vm.minutes)}' />
				<path class='fun travel_cost'  d3-der='{d: vm.lineFun2(vm.minutes)}' />
				<path class='fun schedule_delay'  d3-der='{d: vm.lineFun3(vm.minutes)}' />
			</g>
		</g>
	</svg>
"""
class arrCtrl extends PlotCtrl
	constructor: (@scope)->
		super @scope
		@minutes = Data.minutes
		@Ver.domain [0, 100]
		@Hor.domain [0, Settings.num_minutes]

		@lineFun = d3.svg.line()
			.y (d)=> @Ver d.cost
			.x (d)=> @Hor d.time
		@lineFun2 = d3.svg.line()
			.y (d)=> @Ver d.travel_cost
			.x (d)=> @Hor d.time
		@lineFun3 = d3.svg.line()
			.y (d)=> @Ver d.sched_delay
			.x (d)=> @Hor d.time
der = ->
	directive = 
		controller: ['$scope', arrCtrl]
		controllerAs: 'vm'
		templateNamespace: 'svg'
		template: template
		scope: {}

module.exports = der