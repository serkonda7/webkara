import { b_world } from "./world.js"

const DIRECTION = {
	'up': 0,
	'right': 1,
	'down': 2,
	'left': 3,
}

class KaraBackend {
	in_world = false
	pos = { x: 0, y: 0 }
	dir = DIRECTION.up

	check_in_world() {
		if (!this.in_world) {
			throw new Error('Kara is not in the world')
		}
	}

	is_kara_placable(x, y) {
		if (b_world.is_tree(x, y) || b_world.is_mushroom(x, y)) {
			return false
		}

		return true
	}

	check_kara_placable(x, y) {
		if (!this.is_kara_placable(x, y)) {
			throw new Error(`Kara cannot be placed at (${x}, ${y})`)
		}
	}

	set_position(x, y, safe = false) {
		if (safe) {
			b_world.check_pos_in_bounds(x, y)
			this.check_kara_placable(x, y)
		}

		this.in_world = true
		this.pos.x = x
		this.pos.y = y
	}

	get_position(safe = false) {
		if (safe) {
			this.check_in_world()
		}
		return this.pos
	}

	set_direction(dir, safe = false) {
		if (safe) {
			this.check_in_world()
		}

		if (dir < 0 || dir > 3) {
			throw new Error(`Invalid direction: ${dir}`)
		}

		this.dir = dir
	}

	get_direction(safe = false) {
		if (safe) {
			this.check_in_world()
		}
		return this.dir
	}
}

class Kara {
	move() {
		throw new Error('move() not implemented')
	}

	turn_left() {
		throw new Error('turn_left() not implemented')
	}

	turn_right() {
		throw new Error('turn_right() not implemented')
	}

	put_leaf() {
		throw new Error('put_leaf() not implemented')
	}

	take_leaf() {
		throw new Error('take_leaf() not implemented')
	}

	is_tree_front() {
		throw new Error('is_tree_front() not implemented')
	}

	is_tree_left() {
		throw new Error('is_tree_left() not implemented')
	}

	is_tree_right() {
		throw new Error('is_tree_right() not implemented')
	}

	is_on_leaf() {
		throw new Error('is_on_leaf() not implemented')
	}

	is_mushroom_front() {
		throw new Error('is_mushroom_front() not implemented')
	}

	is_in_world() {
		return b_kara.in_world
	}

	set_position(x, y) {
		b_kara.set_position(x, y, true)
	}

	get_position() {
		return b_kara.get_position(true)
	}

	set_direction(dir) {
		b_kara.set_direction(dir, true)
	}

	get_direction() {
		return b_kara.get_direction(true)
	}
}

const b_kara = new KaraBackend()
const kara = new Kara()

export { b_kara, kara }
