const world = {
	size: {
		x: 0,
		y: 0,
	},

	leafs: [],
	trees: [],
	mushrooms: [],

	wrap_to_axis(val, size) {
		if (val < 0) {
			return size - 1
		}
		if (val >= size) {
			return 0
		}
		return val
	},

	wrap_to_world(cell) {
		cell.x = this.wrap_to_axis(cell.x, this.size.x)
		cell.y = this.wrap_to_axis(cell.y, this.size.y)
		return cell
	}
}

export { world }
