import { world } from './world.js'
import { draw } from './main.js'

const direction_vectors = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
]

const kara = {
	pos: {
		x: 0,
		y: 0,
	},

	// 0 = up
	// 1 = right
	// 2 = down
	// 3 = left
	direction: 1,

	move() {
		const dir_vec = direction_vectors[kara.direction]
		const front = {
			x: kara.pos.x + dir_vec.x,
			y: kara.pos.y + dir_vec.y,
		}
		this.pos = world.wrap_to_world(front)
		draw()
	},
}

export { kara }
