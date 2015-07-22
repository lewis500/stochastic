angular = require 'angular'
_ = require 'lodash'
class PlotCtrl
	constructor: (@scope) ->
		@width = 450
		@height = 275
		@Ver = d3.scale.linear()
			.domain [0,8]
			.range [@height, 0]

		@Hor = d3.scale.linear()
			.domain [0,8]
			.range [0, @width]

		@horAxFun = d3.svg.axis()
			.scale @Hor
			.ticks 10
			.orient 'bottom'

		@verAxFun = d3.svg.axis()
			.scale @Ver
			.ticks 10
			.orient 'left'

		@mar = 
			left: 30
			top: 10
			right: 10
			bottom: 25

module.exports = PlotCtrl