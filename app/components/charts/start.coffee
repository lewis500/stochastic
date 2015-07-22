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
				<path class='arr-line'  d3-der='{d: vm.lineFun(vm.Data.start_times)}' />
			</g>
		</g>
		<g class='tooltip' ng-attr-transform='translate({{vm.left}},{{vm.top}})'>
			<text>{{vm.hello | number: 0}}</text>
		</g>
	</svg>
"""

class Ctrl extends PlotCtrl
	constructor: (@scope, el)->
		super @scope
		@Ver.domain [0, 60] 
		@Hor.domain [0, 5000]
		@hello = 50
		@left = 0
		@top = 0

		@Data = Data

		@lineFun = d3.svg.line()
			.defined (d,i)->
				(!!d)
			.y (d)=> @Ver d
			.x (d,i)=> @Hor i

		zoom = d3.behavior.zoom()
		    .x @Hor
		    .y @Ver
		    .scaleExtent [1, 15]

		d3.select el[0]
			.select '.g-main'
			.call zoom
		vm = this

		d3.select el[0]
			.select '.g-main'
			.on 'mousemove', ->
				loc = d3.mouse this
				vm.left = loc[0]
				vm.top = loc[1]
				vm.hello = vm.Hor.invert vm.left
				vm.scope.$evalAsync()
			
der = ->
	directive = 
		controller: ['$scope', '$element', Ctrl]
		controllerAs: 'vm'
		templateNamespace: 'svg'
		template: template
		scope: {}

module.exports = der

