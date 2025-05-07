import { b_world, world } from "../backend/world.js"

const KEY_WORLD_SIZE = 'world_size'

function save_world() {
	const size_s = JSON.stringify(b_world.size)
	localStorage.setItem(KEY_WORLD_SIZE, size_s)

	const leafs_s = JSON.stringify(b_world.leafs)
	localStorage.setItem('leafs', leafs_s)

	const trees_s = JSON.stringify(b_world.trees)
	localStorage.setItem('trees', trees_s)

	const mushrooms_s = JSON.stringify(b_world.mushrooms)
	localStorage.setItem('mushrooms', mushrooms_s)
}

function load_world() {
	const size_s = localStorage.getItem(KEY_WORLD_SIZE)
	if (size_s !== null) {
		const size = JSON.parse(size_s)
		world.set_size(size.width, size.height)
	}

	const leafs_s = localStorage.getItem('leafs')
	if (leafs_s !== null) {
		const leafs = JSON.parse(leafs_s)
		b_world.leafs = leafs
	}

	const trees_s = localStorage.getItem('trees')
	if (trees_s !== null) {
		const trees = JSON.parse(trees_s)
		b_world.trees = trees
	}

	const mushrooms_s = localStorage.getItem('mushrooms')
	if (mushrooms_s !== null) {
		const mushrooms = JSON.parse(mushrooms_s)
		b_world.mushrooms = mushrooms
	}
}

export { save_world, load_world }
