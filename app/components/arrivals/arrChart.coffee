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
				<path class='arr-line'  d3-der='{d: vm.lineFun(vm.minutes)}' />
				<path class='exit-line' d3-der='{d: vm.lineFun2(vm.minutes)}' />
			</g>
		</g>
	</svg>
"""
class arrCtrl extends PlotCtrl
	constructor: (@scope)->
		super @scope
		@minutes = Data.minutes
		@Ver.domain [0, 40]
		@Hor.domain [0, Settings.num_minutes]
		# @lineFun = d3.svg.line()
		# 	.y (d)=> @Ver d.arrivals
		# 	.x (d)=> @Hor d.time
		@lineFun2 = d3.svg.line()
			.y (d)=> @Ver d.target_avg
			.x (d)=> @Hor d.time
der = ()->
	directive = 
		controller: ['$scope', arrCtrl]
		controllerAs: 'vm'
		templateNamespace: 'svg'
		template: template
		scope: {}

module.exports = der