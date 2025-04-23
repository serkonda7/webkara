import { world } from "../backend/world.js"

const KEY_WORLD_SIZE = 'world_size'

function save_world() {
	const size_s = JSON.stringify(world.get_size())
	localStorage.setItem(KEY_WORLD_SIZE, size_s)
}

function load_world() {
	const size_s = localStorage.getItem(KEY_WORLD_SIZE)
	if (size_s !== null) {
		const size = JSON.parse(size_s)
		world.set_size(size.width, size.height)
	}
}

export { save_world, load_world }
