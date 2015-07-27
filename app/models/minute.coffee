S = require('../services/settings')
require('../helpers.coffee')
d3 = require 'd3'
{max} = Math

blank = 
	receive_queue: ()-> 
	cum_arrivals: 0
	cum_exits: 0

class Minute 
	constructor: (@time)->
		@reset()
		@next = undefined
		@prev = undefined
		
	reset: ->
		@queue = []
		@cum_arrivals = 0
		@cum_exits = 0
		@arrivals = 0
		@exits = 0
		@targeted = 0
		@past_targets = []		

	@property 'variance', get: -> d3.variance @past_arrivals
	@property 'target_avg', get: -> d3.mean @past_targets

	set_next: (m)-> 
		@next = m ? blank

	set_prev: (m)->
		@prev = m ? blank

	serve: ->
		@goal_exits = Math.min( Math.max( S.rate * (@time - S.t1 ) , 0) , S.num_cars)
		if @time < S.ttilde 
			@goal_arrivals = S.rate /(1 -S.beta)*(@time - S.t1)
		else
			@goal_arrivals = (@time - S.ttilde) * S.rate / (1 + S.gamma) + (S.ttilde - S.t1)* S.rate /(1 -S.beta)
		@goal_arrivals = Math.min Math.max(@goal_arrivals , 0), S.num_cars

		
		@queue_length = @queue.length
		travel_time = @queue_length / S.rate
		exit_time = @time + travel_time
		delay = exit_time - S.wish_time
		@travel_cost = travel_time
		@sched_delay = Math.max -S.beta * delay, S.gamma * delay
		@cost = travel_time + @sched_delay

		[0...Math.min(@queue_length, S.rate)]
			.forEach ()=>
				car = @queue.pop()
				car.exit @time
				@exits++

		@next.receive_queue @queue
		@cum_exits =@prev.cum_exits + @exits
		@cum_arrivals = @prev.cum_arrivals + @arrivals

		@past_targets.push @targeted
		if @past_targets.length > 40 then @past_targets.shift()

		@queue = []
		@arrivals = 0
		@exits = 0
		@targeted = 0

	receive_car: (car)-> 
		@queue.push(car)
		@arrivals++

	receive_queue: (queue)-> @queue = @queue.concat queue

module.exports = Minute