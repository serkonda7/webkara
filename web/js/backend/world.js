class WorldBackend {
	size = {
		width: 9,
		height: 9,
	}
}

class World {
	clear() {
		throw new Error('clear() not implemented')
	}

	set_size(width, height) {
		if (width < 1 || height < 1) {
			throw new Error('World size must be at least 1x1')
		}

		b_world.size.width = width
		b_world.size.height = height
	}

	get_size() {
		return b_world.size
	}

	is_empty(x, y) {
		throw new Error('is_empty() not implemented')
	}

	set_leaf(x, y, put) {
		throw new Error('set_leaf() not implemented')
	}

	is_leaf(x, y) {
		throw new Error('is_leaf() not implemented')
	}

	set_tree(x, y, put) {
		throw new Error('set_tree() not implemented')
	}

	is_tree(x, y) {
		throw new Error('is_tree() not implemented')
	}

	set_mushroom(x, y, put) {
		throw new Error('set_mushroom() not implemented')
	}

	is_mushroom(x, y) {
		throw new Error('is_mushroom() not implemented')
	}
}

const b_world = new WorldBackend()
const world = new World()

export { b_world, world }
