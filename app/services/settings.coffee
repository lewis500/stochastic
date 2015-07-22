require '../helpers'
class S
	constructor: ->
		@num_cars = 1000
		@wish_time = 120
		@num_minutes= 170
		@rate = 10
		@beta = .5
		@gamma = 2
		@var = 2
		@sample_size = 200
		@interval = 25
		@mem_length = 2
	@property 't1', get: ->
		@wish_time - @num_cars / @rate * @gamma / (@beta + @gamma)
	@property 't2', get: ->
		@wish_time + @num_cars / @rate * @beta / (@beta + @gamma)
	@property 'ttilde', get:->
		@wish_time - @num_cars / @rate * @gamma * @beta / (@beta + @gamma)


module.exports = new S 