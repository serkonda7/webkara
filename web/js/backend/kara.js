class KaraBackend {
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

	set_position(x, y) {
		throw new Error('set_position() not implemented')
	}

	get_position() {
		throw new Error('get_position() not implemented')
	}

	set_rotation(dir) {
		throw new Error('set_rotation() not implemented')
	}

	get_rotation() {
		throw new Error('get_rotation() not implemented')
	}
}

const _kara = new KaraBackend()

export { _kara }
