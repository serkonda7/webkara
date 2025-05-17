import { b_world } from "./world.js"
import { throw_alert } from "../common/error.js"

function vec2_add(a, b) {
	return { x: a.x + b.x, y: a.y + b.y }
}

const DIRECTION = {
	'up': 0,
	'right': 1,
	'down': 2,
	'left': 3,
}

const NUM_TO_DIR = {
	[0]: 'up',
	[1]: 'right',
	[2]: 'down',
	[3]: 'left',
}

const DIR_VECTORS = {
	[0]: { x: 0, y: 1 },
	[1]: { x: 1, y: 0 },
	[2]: { x: 0, y: -1 },
	[3]: { x: -1, y: 0 },
}

class KaraBackend {
	in_world = false
	pos = { x: 0, y: 0 }
	dir = DIRECTION.up

	direction_class() {
		return NUM_TO_DIR[this.dir]
	}

	check_in_world() {
		if (!this.in_world) {
			throw_alert('Kara is not in the world')
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
			throw_alert(`Kara cannot be placed at (${x}, ${y})`)
		}
	}

	move() {
		this.check_in_world()

		const vec = DIR_VECTORS[this.dir]
		const next_cell = b_world.cell_on_world_torus(vec2_add(this.pos, vec))

		if (b_world.is_tree(next_cell.x, next_cell.y)) {
			throw_alert('Kara cannot move into a tree')
		}

		if (b_world.is_mushroom(next_cell.x, next_cell.y)) {
			const after_cell = b_world.cell_on_world_torus(vec2_add(next_cell, vec))

			if (b_world.is_mushroom(after_cell.x, after_cell.y)) {
				throw_alert('Kara cannot push multiple mushrooms')
			}

			if (b_world.is_tree(after_cell.x, after_cell.y)) {
				throw_alert('Kara cannot push a mushroom into a tree')
			}

			b_world.relocate_mushroom(next_cell.x, next_cell.y, after_cell.x, after_cell.y)
		}

		this.pos = next_cell
	}

	turn_left() {
		this.check_in_world()

		this.dir -= 1
		if (this.dir < 0) {
			this.dir = 3
		}
	}

	turn_right() {
		this.check_in_world()

		this.dir += 1
		if (this.dir > 3) {
			this.dir = 0
		}
	}

	put_leaf() {
		this.check_in_world()

		b_world.add_leaf(this.pos.x, this.pos.y, true)
	}

	take_leaf() {
		this.check_in_world()

		b_world.remove_leaf(this.pos.x, this.pos.y, true)
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
			throw_alert(`Invalid direction: ${dir}`)
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
		b_kara.move()

		document.querySelector('.cell.kara').classList.remove('kara', 'up', 'right', 'down', 'left')
		const new_cell = document.querySelector(`.cell[data-x="${b_kara.pos.x}"][data-y="${b_kara.pos.y}"]`)
		new_cell.classList.add('kara')
		new_cell.classList.add(NUM_TO_DIR[b_kara.dir])
	}

	turn_left() {
		b_kara.turn_left()
		const kara_cell = document.querySelector('.cell.kara')
		kara_cell.classList.remove('up', 'right', 'down', 'left')
		kara_cell.classList.add(NUM_TO_DIR[b_kara.dir])
	}

	turn_right() {
		b_kara.turn_right()
		const kara_cell = document.querySelector('.cell.kara')
		kara_cell.classList.remove('up', 'right', 'down', 'left')
		kara_cell.classList.add(NUM_TO_DIR[b_kara.dir])
	}

	put_leaf() {
		b_kara.put_leaf()
		const cell = document.querySelector(`.cell[data-x="${b_kara.pos.x}"][data-y="${b_kara.pos.y}"]`)
		cell.classList.add('leaf')
	}

	take_leaf() {
		b_kara.take_leaf()
		const cell = document.querySelector(`.cell[data-x="${b_kara.pos.x}"][data-y="${b_kara.pos.y}"]`)
		cell.classList.remove('leaf')
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
