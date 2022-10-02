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

	push_leaf(x: number, y: number, safe = false): void {
		if (safe && this.is_leaf(x, y)) {
			throw `(${x}, ${y}) already has a leaf`
		}
		this.leafs.push({ x: x, y: y })
	}
	push_tree(x: number, y: number, safe = false): void {
		if (safe && this.is_tree(x, y)) {
			throw `(${x}, ${y}) already has a tree`
		}
		this.trees.push({ x: x, y: y })
	}
	push_mushroom(x: number, y: number, safe = false): void {
		if (safe && this.is_mushroom(x, y)) {
			throw `(${x}, ${y}) already has a mushroom`
		}
		this.mushrooms.push({ x: x, y: y })
	}

	remove_leaf(x: number, y: number, safe = false): void {
		const idx = this.find_leaf_index(x, y)
		if (safe && idx < 0) {
			throw `(${x}, ${y}) has no leaf`
		}
		this.leafs.splice(idx, 1)
	}
	remove_tree(x: number, y: number, safe = false): void {
		const idx = this.find_tree_index(x, y)
		if (safe && idx < 0) {
			throw `(${x}, ${y}) has no tree`
		}
		this.trees.splice(idx, 1)
	}
	remove_mushroom(x: number, y: number, safe = false): void {
		const idx = this.find_mushroom_index(x, y)
		if (safe && idx < 0) {
			throw `(${x}, ${y}) has no mushroom`
		}
		this.mushrooms.splice(idx, 1)
	}

	relocate_mushroom(x: number, y: number, new_pos: Vector2): void {
		const idx = this.find_mushroom_index(x, y)
		this.mushrooms[idx] = new_pos
	}

	clear_world(): void {
		this.leafs = []
		this.trees = []
		this.mushrooms = []
	}

	#find_index(arr: Array<Vector2>, x: number, y: number): number {
		return arr.findIndex((el) => {
			return el.x === x && el.y === y
		})
	}
	find_leaf_index (x: number, y: number): number {
		return this.#find_index(this.leafs, x, y)
	}
	find_tree_index (x: number, y: number): number {
		return this.#find_index(this.trees, x, y)
	}
	find_mushroom_index (x: number, y: number): number {
		return this.#find_index(this.mushrooms, x, y)
	}

	is_empty(x: number, y: number): boolean{
		if ( this.is_leaf(x, y) || this.is_tree(x, y) || this.is_mushroom(x, y)){
			return false
		}
		return true
	}
	is_leaf(x: number, y: number): boolean{
		return this.find_leaf_index(x, y) >= 0

	}
	is_tree(x: number, y: number): boolean{
		return this.find_tree_index(x, y) >= 0
	}
	is_mushroom(x: number, y: number): boolean{
		return this.find_mushroom_index(x, y) >= 0
	}

	#val_on_axis(val: number, axis_size: number): number {
		if (val < 0) {
			return axis_size - 1
		}
		if (val >= axis_size) {
			return 0
		}
		return val
	}
	cell_on_world_torus(cell: Vector2): Vector2 {
		cell.x = this.#val_on_axis(cell.x, this.#size.x)
		cell.y = this.#val_on_axis(cell.y, this.#size.y)
		return cell
	}
}

const b_world = new WorldBackend()

export { b_world }
