import * as f_world from '../frontend/f_world.js'

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

	add_leaf(x, y, safe = false) {
		if (safe) {
			this.check_pos_in_bounds(x, y)
			this.check_leaf_placable(x, y)
		}

		this.leafs.push({ x, y })
	}

	add_tree(x, y, safe = false) {
		if (safe) {
			this.check_pos_in_bounds(x, y)
			this.check_tree_placable(x, y)
		}

		this.trees.push({ x, y })
	}

	add_mushroom(x, y, safe = false) {
		if (safe) {
			this.check_pos_in_bounds(x, y)
			this.check_mushroom_placable(x, y)
		}

		this.mushrooms.push({ x, y })
	}

	remove_leaf(x, y, safe = false) {
		const idx = this.index_of_leaf(x, y)

		if (safe) {
			this.check_pos_in_bounds(x, y)
			if (idx === -1) {
				throw new Error(`No leaf at (${x}, ${y})`)
			}
		}

		this.leafs.splice(idx, 1)
	}

	remove_tree(x, y, safe = false) {
		const idx = this.index_of_tree(x, y)

		if (safe) {
			this.check_pos_in_bounds(x, y)
			if (idx === -1) {
				throw new Error(`No tree at (${x}, ${y})`)
			}
		}

		this.trees.splice(idx, 1)
	}

	remove_mushroom(x, y, safe = false) {
		const idx = this.index_of_mushroom(x, y)

		if (safe) {
			this.check_pos_in_bounds(x, y)
			if (idx === -1) {
				throw new Error(`No mushroom at (${x}, ${y})`)
			}
		}

		this.mushrooms.splice(idx, 1)
	}

	is_leaf_placeable(x, y) {
		if (this.is_leaf(x, y) || this.is_tree(x, y)) {
			return false
		}

		return true
	}

	is_tree_placeable(x, y) {
		return this.is_empty(x, y)
	}

	is_mushroom_placeable(x, y) {
		if (this.is_mushroom(x, y) || this.is_tree(x, y)) {
			return false
		}

		return true
	}

	check_leaf_placable(x, y) {
		if (!this.is_leaf_placeable(x, y)) {
			throw new Error(`Leaf cannot be placed at (${x}, ${y})`)
		}
	}

	check_tree_placable(x, y) {
		if (!this.is_tree_placeable(x, y)) {
			throw new Error(`Tree cannot be placed at (${x}, ${y})`)
		}
	}

	check_mushroom_placable(x, y) {
		if (!this.is_mushroom_placeable(x, y)) {
			throw new Error(`Mushroom cannot be placed at (${x}, ${y})`)
		}
	}

	index_of_leaf(x, y) {
		for (let i = 0; i < this.leafs.length; i++) {
			const leaf = this.leafs[i]
			if (leaf.x === x && leaf.y === y) {
				return i
			}
		}
		return -1
	}

	index_of_tree(x, y) {
		for (let i = 0; i < this.trees.length; i++) {
			const tree = this.trees[i]
			if (tree.x === x && tree.y === y) {
				return i
			}
		}
		return -1
	}

	index_of_mushroom(x, y) {
		for (let i = 0; i < this.mushrooms.length; i++) {
			const shroom = this.mushrooms[i]
			if (shroom.x === x && shroom.y === y) {
				return i
			}
		}
		return -1
	}

	is_empty(x, y, check_bounds = false) {
		if (check_bounds) {
			this.check_pos_in_bounds(x, y)
		}

		if (this.is_leaf(x, y) || this.is_tree(x, y) || this.is_mushroom(x, y)) {
			return false
		}

		return true
	}

	is_leaf(x, y, check_bounds = false) {
		if (check_bounds) {
			this.check_pos_in_bounds(x, y)
		}

		return this.index_of_leaf(x, y) !== -1
	}

	is_tree(x, y, check_bounds = false) {
		if (check_bounds) {
			this.check_pos_in_bounds(x, y)
		}

		return this.index_of_tree(x, y) !== -1
	}

	is_mushroom(x, y, check_bounds = false) {
		if (check_bounds) {
			this.check_pos_in_bounds(x, y)
		}

		return this.index_of_mushroom(x, y) !== -1
	}

	clear_cell(x, y) {
		this.remove_leaf(x, y)
		this.remove_tree(x, y)
		this.remove_mushroom(x, y)
	}

	clear() {
		this.leafs = []
		this.trees = []
		this.mushrooms = []
	}

	set_size(width, height) {
		if (width < 1 || height < 1) {
			throw new Error('World size must be at least 1x1')
		}

		this.size.width = width
		this.size.height = height

		// Remove objects that are out of bounds
		this.leafs = this.leafs.filter(leaf => leaf.x < width && leaf.y < height)
		this.trees = this.trees.filter(tree => tree.x < width && tree.y < height)
		this.mushrooms = this.mushrooms.filter(mushroom => mushroom.x < width && mushroom.y < height)
	}
}

class World {
	clear() {
		b_world.clear()
		f_world.draw_empty_grid()
	}

	set_size(width, height) {
		b_world.set_size(width, height)
		f_world.draw_empty_grid()
		f_world.draw_world_objects()
	}

	get_size() {
		return b_world.size
	}

	is_empty(x, y) {
		if (b_world.is_leaf(x, y, true) || b_world.is_tree(x, y) || b_world.is_mushroom(x, y)) {
			return false
		}

		return true
	}

	set_leaf(x, y, put) {
		throw new Error('set_leaf() not implemented')
	}

	is_leaf(x, y) {
		return b_world.is_leaf(x, y, true)
	}

	set_tree(x, y, put) {
		throw new Error('set_tree() not implemented')
	}

	is_tree(x, y) {
		return b_world.is_tree(x, y, true)
	}

	set_mushroom(x, y, put) {
		throw new Error('set_mushroom() not implemented')
	}

	is_mushroom(x, y) {
		return b_world.is_mushroom(x, y, true)
	}
}

const b_world = new WorldBackend()
const world = new World()

export { b_world, world }
