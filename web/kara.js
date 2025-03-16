import { world } from './world.js'
import { draw_with_delay } from './main.js'

const direction_vectors = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
]

const dir_class_list = {
	0: 'up',
	1: 'right',
	2: 'down',
	3: 'left',
}

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

	dir_to_class() {
		return dir_class_list[this.direction]
	},

	async move() {
		const dir_vec = direction_vectors[kara.direction]
		const front = {
			x: kara.pos.x + dir_vec.x,
			y: kara.pos.y + dir_vec.y,
		}
		this.pos = world.wrap_to_world(front)
		await draw_with_delay()
	},

	turn_direction(dir_delta) {
		return ((this.direction + dir_delta % 4) + 4) % 4
	},

	async turn_left() {
		kara.direction = this.turn_direction(-1)
		await draw_with_delay()
	},

	async turn_right() {
		kara.direction = this.turn_direction(1)
		await draw_with_delay()
	},
}

export { kara }
