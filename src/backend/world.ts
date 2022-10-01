import { Vector2 } from './vector.js'

class WorldBackend {
	#size: Vector2 = {
		x: 7,
		y: 7,
	}

	get_size(): Vector2 {
		return this.#size
	}

	leafs: Array<Vector2> = []
	trees: Array<Vector2> = []
	mushrooms: Array<Vector2> = []

	#valOnAxis = (val: number, axis_size: number): number => {
		if (val < 0) {
			return axis_size - 1
		}
		if (val >= axis_size) {
			return 0
		}
		return val
	}

	cellOnWorldTorus = (cell: Vector2): Vector2 => {
		cell.x = this.#valOnAxis(cell.x, this.#size.x)
		cell.y = this.#valOnAxis(cell.y, this.#size.y)
		return cell
	}
}

const b_world = new WorldBackend()

export { b_world }
