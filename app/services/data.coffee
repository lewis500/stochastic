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

		@cars = [0...Settings.num_cars].map (n)->
				arr_time = _.sample [10..60]
				newCar = new Car n, arr_time

		@cars.forEach (car,i,k) => 
			time = car.arrive()
			@minutes[time].receive_car car

		@sample = _.sample @cars , 200
		@sample.forEach (d)->
			d.sampled = true
			d.history = []

	cars_choose: ->
		_.sample @cars, Settings.sample_size
			.forEach (car)->
				car.choose()

	cars_arrive: ->
		@cars.forEach (car) => 
			time = car.arrive()
			@minutes[time].receive_car car
			@minutes[car.tar_time].targeted++

	tick: ->
		# physics stage
		@minutes.forEach (minute)-> minute.serve()
		# choice stage
		@cars_arrive()
		@cars_choose()


module.exports = new Data()
