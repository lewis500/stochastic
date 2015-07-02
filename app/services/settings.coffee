'use strict'


S = 
	num_cars: 1200
	wish_time: 85
	num_minutes: 135
	rate: 12
	beta: .5
	gamma: 2
	sample_size: 150
	interval: 60
	minutes: []

S.t1 = S.wish_time - S.num_cars / S.rate * S.gamma / (S.beta + S.gamma)
S.t2 = S.wish_time + S.num_cars / S.rate * S.beta / (S.beta + S.gamma)
S.ttilde = S.wish_time - S.num_cars / S.rate * S.gamma * S.beta / (S.beta + S.gamma)

# S.phi = S.

module.exports = S 

	

