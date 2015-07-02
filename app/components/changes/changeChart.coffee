d3 = require('d3')
Settings = require '../../services/settings'
PlotCtrl = require '../../models/plotCtrl'
Data = require '../../services/data'

template = """
<svg ng-attr-width='{{::vm.width + vm.mar.left+vm.mar.right}}' ng-attr-height='{{::vm.height + vm.mar.top + vm.mar.bottom}}'>
	<g class='g-main' shifter='{{::[vm.mar.left, vm.mar.top]}}'>
		<rect d3-der='{width: vm.width, height: vm.height}' fill='#333' />
		<g ver-axis-der width='vm.width' fun='vm.verAxFun'></g>
		<g hor-axis-der fun='vm.horAxFun' height='vm.height' shifter='{{::[0,vm.height]}}'></g>
		<g y-axis scale='vm.Y' width='vm.width'></g>
		<g ex-axis height='vm.height' scale='vm.X' shifter='{{[0,vm.height]}}'></g>
		<g class='sample'>
			<circle ng-repeat='car in vm.sample' shifter='{{[vm.Hor(car.last_tar), vm.Ver(car.tar_time - car.last_tar)]}}' class='dot' r='4' tran='vm.tran' ng-attr-fill='{{::vm.col($index)}}'/>
		</g>
	</g>
</svg>
"""

class Ctrl extends PlotCtrl
	constructor: (@scope)->
		super @scope
		@sample = Data.sample
		@Ver.domain [-15, 15]
		@Hor.domain [0, Settings.num_minutes]
		@tran = (tran)->
			tran.ease 'linear'
				.duration 100
		@col = d3.scale.category20c()

der = ->
	directive = 
		controller: ['$scope', Ctrl]
		controllerAs: 'vm'
		templateNamespace: 'svg'
		template: template
		scope: {}

module.exports = der