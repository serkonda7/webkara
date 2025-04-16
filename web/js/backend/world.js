class WorldBackend {
	clear() {
		throw new Error('clear() not implemented')
	}

	set_size(width, height) {
		throw new Error('set_size() not implemented')
	}

	get_size() {
		throw new Error('get_size() not implemented')
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

const _world = new WorldBackend()

export { _world }
