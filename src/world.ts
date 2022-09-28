import { setKaraActive } from './kara.js'
import { draw } from './main.js'
import { Vector2 } from './vector.js'

const world_size: Vector2 = {
	x: 7,
	y: 7,
}

let leaf_positions: Array<Vector2> = []
let tree_positions: Array<Vector2> = []
let shroom_positions: Array<Vector2> = []

const findIndex = (arr: Array<Vector2>, x, y): number => {
	return arr.findIndex((el) => {
		return el.x === x && el.y === y
	})
}

const findLeafIndex = (x, y): number => {
	return findIndex(leaf_positions, x, y)
}

const findTreeIndex = (x, y): number => {
	return findIndex(tree_positions, x, y)
}

const findMushroomIndex = (x, y): number => {
	return findIndex(shroom_positions, x, y)
}

const world = {
	clearAll:function(): void{
		leaf_positions = []
		tree_positions = []
		shroom_positions = []
		setKaraActive(false)
		draw()
	},
	setLeaf:function(x, y, putLeaf: boolean): void{
		if (putLeaf){
			leaf_positions.push({ x:x, y:y })
		} else {
			const idx = findLeafIndex(x, y)
			leaf_positions.splice(idx, 1)
		}
		draw()
	},
	setTree:function(x, y, putTree: boolean): void{
		if (putTree){
			tree_positions.push({ x:x, y:y })
		} else {
			const idx = findTreeIndex(x, y)
			tree_positions.splice(idx, 1)
		}
		draw()
	},
	setMushroom:function(x, y, putMushroom: boolean): void{
		if (putMushroom){
			shroom_positions.push({ x:x, y:y })
		} else {
			const idx = findMushroomIndex(x, y)
			shroom_positions.splice(idx, 1)
		}
		draw()
	},
	isEmpty:function(x, y): boolean{
		if ( this.isLeaf(x, y) || this.isTree(x, y) || this.isMushroom(x, y)){
			return false
		}
		return true
	},
	isLeaf:function(x, y): boolean{
		return findLeafIndex(x, y) >= 0

	},
	isTree:function(x, y): boolean{
		return findTreeIndex(x, y) >= 0
	},
	isMushroom:function(x, y): boolean{
		return findMushroomIndex(x, y) >= 0
	},
	getSize:function(): Vector2{
		return {
			x: world_size.x,
			y: world_size.y,
		}
	},
}

const mapOverflowToWorld = (cell: Vector2): Vector2 => {
	if (cell.x < 0) {
		cell.x = world_size.x - 1
	} else if (cell.x >= world_size.x){
		cell.x = 0
	}
	if (cell.y < 0) {
		cell.y = world_size.y - 1
	} else if (cell.y >= world_size.y){
		cell.y = 0
	}
	return cell
}

export {
	world,
	mapOverflowToWorld,
	findLeafIndex, findTreeIndex, findMushroomIndex,
	leaf_positions, tree_positions, shroom_positions,
}
