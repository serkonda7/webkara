import { Vector2 } from './vector.js'

class WorldBackend {
	#size: Vector2 = {
		x: 7,
		y: 7,
	}

	get_size(): Vector2 {
	}

	leafs: Array<Vector2> = []
	trees: Array<Vector2> = []
	mushrooms: Array<Vector2> = []
}

const b_world = new WorldBackend()

export { b_world }
