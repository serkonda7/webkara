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

	cellOnWorldTorus = (cell: Vector2): Vector2 => {
		if (cell.x < 0) {
			cell.x = this.#size.x - 1
		} else if (cell.x >= this.#size.x){
			cell.x = 0
		}
		if (cell.y < 0) {
			cell.y = this.#size.y - 1
		} else if (cell.y >= this.#size.y){
			cell.y = 0
		}
		return cell
	}
}

const b_world = new WorldBackend()

export { b_world }
