import { Vector2, vec2_add } from './vector.js'
import b_world from './world.js'

enum Orientation {
	UP,
	RIGHT,
	DOWN,
	LEFT,
}

class KaraBackend{
	#in_world = false
	#pos: Vector2 = {
		x: 1,
		y: 1,
	}
	#orientation = Orientation.RIGHT
	#orientation_vector = {
		[Orientation.UP]: { x: 0, y:1 },
		[Orientation.RIGHT]: { x: 1, y:0 },
		[Orientation.DOWN]: { x: 0, y:-1 },
		[Orientation.LEFT]: { x: -1, y:0 },
	}

	#check_in_world(): void {
		if (!this.#in_world){
			throw 'kara is not in world'
		}
	}

	set_in_world(v: boolean): void {
		this.#in_world = v
	}

	is_in_world(): boolean {
		return this.#in_world
	}

	#turn(n: number): Orientation {
		return ((this.#orientation + n % 4) + 4) % 4
	}

	#front_cell(): Vector2 {
		const c = vec2_add(this.#pos, this.#orientation_vector[this.#orientation])
		return b_world.cell_on_world_torus(c)
	}

	move(): void{
		this.#check_in_world()
		if (this.tree_front()) {
			throw 'kara cannot move: tree front'
		}
		const front_cell = this.#front_cell()
		if (this.mushroom_front()){
			let next_cell = vec2_add(front_cell, this.#orientation_vector[this.#orientation])
			next_cell = b_world.cell_on_world_torus(next_cell)
			if (b_world.is_mushroom(next_cell.x, next_cell.y)){
				throw 'kara cannot push multiple mushrooms'
			}
			if (b_world.is_tree(next_cell.x, next_cell.y)){
				throw 'kara tried pushing a mushroom into a tree'
			}
			b_world.relocate_mushroom(front_cell.x, front_cell.y, next_cell)
		}
		this.#pos = front_cell
	}
	turn_right(): void{
		this.#check_in_world()
		this.#orientation = this.#turn(1)
	}
	turn_left(): void{
		this.#check_in_world()
		this.#orientation = this.#turn(-1)
	}
	put_leaf(): void{
		this.#check_in_world()
		b_world.push_leaf(this.#pos.x, this.#pos.y, true)
	}
	take_leaf(): void{
		this.#check_in_world()
		b_world.remove_leaf(this.#pos.x, this.#pos.y, true)
	}

	on_leaf(): boolean {
		this.#check_in_world()
		return b_world.is_leaf(this.#pos.x, this.#pos.y)
	}
	tree_front(): boolean{
		this.#check_in_world()
		const cell = this.#front_cell()
		return b_world.is_tree(cell.x, cell.y)
	}
	tree_right(): boolean{
		this.#check_in_world()
		let cell = vec2_add(this.#pos, this.#orientation_vector[this.#turn(1)])
		cell = b_world.cell_on_world_torus(cell)
		return b_world.is_tree(cell.x, cell.y)
	}
	tree_left(): boolean{
		this.#check_in_world()
		let cell = vec2_add(this.#pos, this.#orientation_vector[this.#turn(-1)])
		cell = b_world.cell_on_world_torus(cell)
		return b_world.is_tree(cell.x, cell.y)
	}
	mushroom_front(): boolean{
		this.#check_in_world()
		const cell = this.#front_cell()
		return b_world.is_mushroom(cell.x, cell.y)
	}

	set_position(x: number, y: number): void {
		this.#in_world = true
		this.#pos.x = x
		this.#pos.y = y
	}
	get_position(): Vector2 {
		this.#check_in_world()
		return this.#pos
	}

	set_orientation(o: Orientation): void {
		this.#check_in_world()
		this.#orientation = o
	}
	get_orientation(): Orientation {
		this.#check_in_world()
		return this.#orientation
	}
}

const b_kara = new KaraBackend()
export { b_kara, Orientation }
