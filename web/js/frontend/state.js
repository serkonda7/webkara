import { b_world } from "../backend/world.js"

const KEY_WORLD_SIZE = 'world_size'

function save_world() {
	const size_s = JSON.stringify(b_world.size)
	localStorage.setItem(KEY_WORLD_SIZE, size_s)
}

function load_world() {
	const size_s = localStorage.getItem(KEY_WORLD_SIZE)
	if (size_s !== null) {
		b_world.size = JSON.parse(size_s)
	}
}

export { save_world, load_world }
