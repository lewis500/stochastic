'use strict'
_ = require 'lodash'
d3 = require 'd3'
Data = require '../../services/data'
timeout = require( '../../helpers').timeout
Settings = require '../../services/settings'
template = '''
	<div flex='50'>
		<md-button ng-click='vm.play()'>Play</md-button>
		<md-button ng-click='vm.stop()'>Stop</md-button>
		<md-button ng-click='vm.reset()'>Reset</md-button>
		<md-checkbox ng-model='vm.S.tolling'>Toggle Toll</md-checkbox>
		<div layout>
		    <div flex="30" layout layout-align="center center">
		       <span class="md-body-1">Memory length</span>
		    </div>
		    <md-slider flex ng-model="vm.S.mem_length" min='1' max='10' md-discrete step='1' />
	   </div>
	   	<div layout>
	   	    <div flex="30" layout layout-align="center center">
	   	       <span class="md-body-1">Error</span>
	   	    </div>
	   	    <md-slider flex ng-model="vm.S.var" min='1' max='5' md-discrete step='.5' />
	    </div>
	</div>
	<div flex='45'>
    	<div layout>
	    	    <div flex="30" layout layout-align="center center">
	    	       <span class="md-body-1">Sample Size</span>
	    	    </div>
	    	    <md-slider flex ng-model="vm.S.sample_size" min='10' max='300' md-discrete step='10' />
	     </div>
     	<div layout>
 	    	    <div flex="30" layout layout-align="center center">
 	    	       <span class="md-body-1">Beta</span>
 	    	    </div>
 	    	    <md-slider flex ng-model="vm.S.beta" min='.1' max='.9' md-discrete step='.05' />
 	     </div>
     	<div layout>
 	    	    <div flex="30" layout layout-align="center center">
 	    	       <span class="md-body-1">Gamma</span>
 	    	    </div>
 	    	    <md-slider flex ng-model="vm.S.gamma" min='1.5' max='3' md-discrete step='.05' />
 	     </div>
	</div>
'''

class Ctrl
	constructor: (@scope)->
		@paused = false
		@Data = Data
		@S = Settings

	looper: ->
		timeout =>
			Data.tick()
			@scope.$evalAsync()
			if not @paused then @looper()
			@paused
		, Settings.interval

	play: ->
		@paused = false
		d3.timer.flush()
		@looper()

	stop: -> 
		d3.timer.flush()
		@paused = true

	reset:->
		# @stop()
		Data.reset()

der = ->
	directive =
		controller: ['$scope', Ctrl]
		controllerAs: 'vm'
		template: template
		scope: {}
		restrict: 'A'

module.exports = der
