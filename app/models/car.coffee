d3 = require 'd3'
S = require '../services/settings'
require '../helpers'
_ = require 'lodash'


class Memory
	constructor: ->
		@array = []
	remember: (c)->
		@array.push c
		if @array.length > S.mem_length then @array.shift()
	val: ->
		d3.mean @array

class Memories
	constructor: ()->
		@map = d3.map()

	remember: (arr_time, cost)->
		if @map.has arr_time
			@map.get arr_time
				.remember cost
		else
			newMem = new Memory
			@map.set arr_time , newMem
			newMem.remember cost 

	min: ->
		c = Infinity
		candidates = []
		@map.forEach (time, memory)->
			cost= memory.val()
			if cost < c
				c = cost
				candidates = []
				candidates.push +time
			else if cost == c
				candidates.push +time
		_.sample candidates

class Car 
	constructor: (@n, @tar_time)->
		@sched_pen = Infinity
		@cost = Infinity
		@travel_pen = Infinity
		@exit_time = Infinity
		@memories = new Memories
		@path = []
		@sampled = false

	toll: (time)->
		Math.max S.num_cars / S.rate * (S.beta * S.gamma)/(S.beta + S.gamma) - @sched_pen , 0

	exit:(time)-> 
		@exit_time = time
		@travel_pen = @exit_time - @actual_time
		sched_del = @exit_time - S.wish_time
		@sched_pen = Math.max -S.beta * sched_del, S.gamma * sched_del
		c = if S.tolling then @toll(time) else 0
		@cost = @travel_pen + @sched_pen + c
		@memories.remember @actual_time , @cost

	choose: ->
		@last_tar = @tar_time
		@tar_time = @memories.min()

	guesser: ->
		d3.random.normal( 0, S.var)()
		# _.sample [-S.var..S.var]

	arrive: ->
		e = Math.round @guesser()
		a = @tar_time + e
		res = Math.max 1 , Math.min( a, S.num_minutes - 1)
		@actual_time = res
		res

module.exports = Car