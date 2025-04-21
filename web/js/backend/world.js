class WorldBackend {
	size = {
		width: 9,
		height: 9,
	}
	leafs = []
	trees = []
	mushrooms = []

	check_pos_in_bounds(x, y) {
		if (x < 0 || x >= this.size.width || y < 0 || y >= this.size.height) {
			throw new Error(`Position out of bounds: (${x}, ${y})`)
		}
	}

	index_of_leaf(x, y) {
		return this.leafs.findIndex((leaf) => {
			leaf.x === x && leaf.y === y
		})
	}

	index_of_tree(x, y) {
		return this.trees.findIndex((tree) => {
			tree.x === x && tree.y === y
		})
	}

	index_of_mushroom(x, y) {
		return this.mushrooms.findIndex((mushroom) => {
			mushroom.x === x && mushroom.y === y
		})
	}

	// like `is_leaf` without bounds check
	is_leaf_unsafe(x, y) {
		return b_world.index_of_leaf(x, y) !== -1
	}

	// like `is_tree` without bounds check
	is_tree_unsafe(x, y) {
		return b_world.index_of_tree(x, y) !== -1
	}

	// like `is_mushroom` without bounds check
	is_mushroom_unsafe(x, y) {
		return b_world.index_of_mushroom(x, y) !== -1
	}
}

class World {
	clear() {
		b_world.leafs = []
		b_world.trees = []
		b_world.mushrooms = []
		// TODO remove kara
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
		b_world.check_pos_in_bounds(x, y)

		if (b_world.is_leaf_unsafe(x, y) || b_world.is_tree_unsafe(x, y) || b_world.is_mushroom_unsafe(x, y)) {
			return false
		}

		return true
	}

	set_leaf(x, y, put) {
		throw new Error('set_leaf() not implemented')
	}

	is_leaf(x, y) {
		b_world.check_pos_in_bounds(x, y)
		return b_world.is_leaf_unsafe(x, y)
	}

	set_tree(x, y, put) {
		throw new Error('set_tree() not implemented')
	}

	is_tree(x, y) {
		b_world.check_pos_in_bounds(x, y)
		return b_world.is_tree_unsafe(x, y)
	}

	set_mushroom(x, y, put) {
		throw new Error('set_mushroom() not implemented')
	}

	is_mushroom(x, y) {
		b_world.check_pos_in_bounds(x, y)
		return b_world.is_mushroom_unsafe(x, y)
	}
}

const b_world = new WorldBackend()
const world = new World()

export { b_world, world }
