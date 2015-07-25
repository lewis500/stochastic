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
				<line d3-der='{x1: vm.Hor(vm.S.wish_time), x2: vm.Hor(vm.S.wish_time), y1: vm.Ver(0), y2: 0}' class='wish_time' />
			</g>
			<g class='g-lines2'>
				<path ng-repeat ='p in vm.shad.array track by $index' ng-attr-d='{{p}}' class='arr-line' ng-attr-opacity='{{::.8 - .07 * $index}}'/>
			</g>
		</g>
	</svg>
"""

class Shadows
	constructor: ->
		@array = []
		@counter = 0
	add: (path)->
		@counter++
		if @counter%20 !=0 then return
		@array.unshift 'M' + path
		if @array.length > 10 then @array.pop()


class cumCtrl extends PlotCtrl
	constructor: (@scope)->
		super @scope
		@minutes = Data.minutes
		@Ver.domain [0, Settings.num_cars] 
		@Hor.domain [0, Settings.num_minutes]
		@S = Settings

		@shad = new Shadows

		@arr_line = d3.svg.line()
			.interpolate (points)=>
				path = points.join 'L'
				@shad.add path
				path
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

