Settings = require './settings'
Minute = require '../models/minute'
Car = require '../models/car'
_ = require 'lodash'

class Data
	constructor: ()->
		@minutes = [0...Settings.num_minutes].map (time)=> 
				newMinute = new Minute time

		@minutes.forEach (min,i,k)->
			min.set_prev k[i-1]
			min.set_next k[i+1]

		@reset()

		@start_times = []

		@record = ->
				s = _.find @minutes , (d)=>
					d.queue.length > Settings.rate
				@start_times.push s.time
				if @start_times.length > 10000 then @start_times.shift()

	reset: ->
		cands = [10..100]
		@minutes.forEach (m)->
			m.reset()
		@cars = [0...Settings.num_cars].map (n)->
				tar_time = _.sample cands
				newCar = new Car n, tar_time

		@cars.forEach (car,i,k) => 
			time = car.arrive()
			@minutes[time].receive_car car

	cars_choose: ->
		_.sample @cars, Settings.sample_size
			.forEach (car)->
				car.choose()

	cars_arrive: ->
		@cars.forEach (car) => 
			time = car.arrive()
			if time is undefined then debugger
			@minutes[time].receive_car car
			@minutes[car.tar_time].targeted++

	tick: ->
		# physics stage
		@minutes.forEach (minute)-> minute.serve()
		# choice stage
		@cars_arrive()
		@cars_choose()
		@record()


module.exports = new Data()
